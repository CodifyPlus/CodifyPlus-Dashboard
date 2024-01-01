import {
  Table,
  ScrollArea,
  Menu,
  Button,
  Loader,
  Center,
  Modal,
} from "@mantine/core";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import { notifications } from "@mantine/notifications";
import { IconMessages, IconSettingsBolt, IconTrash } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { AddTemplateModal } from "../../Fragments/ServiceTemplatesFragments/AddTemplateModal";

export default function ServiceTemplates() {
  const [templates, setTemplates] = useState([
    {
      templateName: "",
      pathway: [],
      _id: "",
    },
  ]);

  const [stateUpdate, setStateUpdate] = useState(false);

  const [
    opened_addTemplateModal,
    { open: open_addTemplateModal, close: close_addTemplateModal },
  ] = useDisclosure(false);

  const handleDelete = (templateId: string) => {
    UserService.deleteTemplate({ templateId }).then(
      (response) => {
        setStateUpdate(!stateUpdate);
      },
      (error) => {
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        }
      }
    );
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserService.getAllTemplates().then(
      (response) => {
        setTemplates(response.data);
        setIsLoading(false);
      },
      (error) => {
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateUpdate]);

  const rows = templates.map((item) => (
    <tr key={item.templateName}>
      <td>{item.templateName}</td>
      <td>{item.pathway.length}</td>
      <td>
        <Menu
          transitionProps={{ transition: "pop" }}
          withArrow
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <Button
              variant="light"
              color="yellow"
              compact
              leftIcon={<IconSettingsBolt size="1rem" stroke={1.5} />}
            >
              Actions
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              to={`/dashboard/template/${item._id}`}
              icon={<IconMessages size="1rem" stroke={1.5} />}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handleDelete(item._id);
              }}
              icon={<IconTrash size="1rem" stroke={1.5} />}
              color="red"
            >
              Delete Template
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoading ? ( // Conditional rendering based on the loading status
        <Center>
          <Loader variant="bars" />
        </Center>
      ) : (
        <>
          <Center>
            <Button
              onClick={open_addTemplateModal}
              mt={10}
              mb={30}
              variant="light"
              color="yellow"
            >
              Add New Template
            </Button>
          </Center>
          <ScrollArea>
            <Modal
              opened={opened_addTemplateModal}
              onClose={close_addTemplateModal}
              title={`Add New Template`}
              centered
            >
              <AddTemplateModal
                setStateUpdate={setStateUpdate}
                stateUpdate={stateUpdate}
                close_addTemplateModal={close_addTemplateModal}
              />
            </Modal>
            <Table miw={800} verticalSpacing="sm">
              <thead>
                <tr>
                  <th>Template Name</th>
                  <th>Pathway Length</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </>
      )}
    </>
  );
}
