import {
  Avatar,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  Menu,
  Button,
  Loader,
  Center,
  Modal,
} from "@mantine/core";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import moment from "moment";
import { notifications } from "@mantine/notifications";
import {
  IconMessages,
  IconProgressCheck,
  IconServer,
  IconSettingsBolt,
  IconTrash,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SendNotificationFragment } from "../../Fragments/AllUsersFragments/SendNotificationFragment";
import { useDisclosure } from "@mantine/hooks";

const rolesData = ["USER", "MODERATOR", "ADMIN"];

export function AllUsers() {
  const changeRole = (userId: string, newRole: string) => {
    UserService.changeUserRole({ userId, newRole }).then(
      (response) => {},
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
  };

  const [users, setUsers] = useState([
    {
      username: "",
      email: "",
      processServices: [],
      _id: "",
      role: "",
      createdAt: "",
    },
  ]);

  const [stateUpdate, setStateUpdate] = useState(false);
  const [notificationUsername, setNotificationUsername] = useState("");

  const [
    opened_sendNotification,
    { open: open_sendNotification, close: close_sendNotification },
  ] = useDisclosure(false);

  const handleDelete = (userId: string) => {
    UserService.deleteUser({ userId }).then(
      (response) => {
        setStateUpdate(!stateUpdate);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
        setIsLoading(false);
      },
      (error) => {
        const _Stats =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setUsers(_Stats);

        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateUpdate]);

  const rows = users.map((item) => (
    <tr key={item.username}>
      <td>
        <Group spacing="sm">
          <Avatar
            size={40}
            src={`https://api.dicebear.com/6.x/initials/svg?seed=${item.username}`}
            radius={40}
          />
          <div>
            <Text fz="sm" fw={500}>
              {item.username}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.email}
            </Text>
          </div>
        </Group>
      </td>

      <td>
        <Select
          onChange={(value) => {
            changeRole(item._id, value!);
            notifications.show({
              title: `Role updated!`,
              message: `User Role successfully updated to ${value}! 😎`,
              autoClose: 5000,
            });
          }}
          data={rolesData}
          defaultValue={item.role}
          variant="unstyled"
        />
      </td>
      <td>{moment(item.createdAt).utcOffset("+5:30").format("DD-MM-YYYY")}</td>
      <td>{item.processServices.length}</td>
      <td>
        <Menu
          transitionProps={{ transition: "pop" }}
          withArrow
          position="bottom-end"
          withinPortal
        >
          <Menu.Target>
            <Button
              variant="outline"
              color="yellow"
              compact
              leftIcon={<IconSettingsBolt size="1rem" stroke={1.5} />}
            >
              Actions
            </Button>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={() => {
                setNotificationUsername(item.username);
                open_sendNotification();
              }}
              icon={<IconMessages size="1rem" stroke={1.5} />}
            >
              Send Notification
            </Menu.Item>
            <Menu.Item icon={<IconServer size="1rem" stroke={1.5} />}>
              Add Service
            </Menu.Item>
            <Menu.Item icon={<IconProgressCheck size="1rem" stroke={1.5} />}>
              Pending Services
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handleDelete(item._id);
              }}
              icon={<IconTrash size="1rem" stroke={1.5} />}
              color="red"
            >
              Delete User
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
          <Loader />
        </Center>
      ) : (
        <ScrollArea>
          <Modal
            opened={opened_sendNotification}
            onClose={close_sendNotification}
            title={`Send Notification to ${notificationUsername}`}
            centered
          >
            <SendNotificationFragment
              data={{
                username: notificationUsername,
                closeModal: close_sendNotification,
              }}
            />
          </Modal>
          <Table miw={800} verticalSpacing="sm">
            <thead>
              <tr>
                <th>User</th>
                <th>Role</th>
                <th>Created At</th>
                <th>Process Services</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      )}
    </>
  );
}
