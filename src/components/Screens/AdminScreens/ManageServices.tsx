import { Table, Group, Text, ScrollArea, Menu, Button, Loader, Center } from "@mantine/core";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import {
  IconEye,
  IconMapPin,
  IconNotebook,
  IconPencil,
  IconSettingsBolt,
  IconTrash,
} from "@tabler/icons-react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function ManageServices() {
  const [services, setServices] = useState([
    {
      cost: "",
      name: "",
      status: "",
      _id: "",
      assignedTo: {
        userId: "",
        username: "",
        email: "",
      },
      assignedFor: {
        userId: "",
        username: "",
        email: "",
      },
    },
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    UserService.getAllServices().then(
      (response) => {
        setServices(response.data);
        setIsLoading(false);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rows = services.map((item) => (
    <tr key={item._id}>
      <td>{item.name}</td>
      <td>{item.status}</td>
      <td>{`₹${item.cost}`}</td>
      <td>
        <Group spacing="sm">
          <div>
            <Text fz="sm" fw={500}>
              {item.assignedTo.username}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.assignedTo.email}
            </Text>
          </div>
        </Group>
      </td>
      <td>
        <Group spacing="sm">
          <div>
            <Text fz="sm" fw={500}>
              {item.assignedFor.username}
            </Text>
            <Text fz="xs" c="dimmed">
              {item.assignedFor.email}
            </Text>
          </div>
        </Group>
      </td>
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
            <Menu.Item icon={<IconEye size="1rem" stroke={1.5} />}>
              View
            </Menu.Item>
            <Menu.Item icon={<IconPencil size="1rem" stroke={1.5} />}>
              Edit
            </Menu.Item>
            <Menu.Item
              component={Link}
              to={`/dashboard/track/${item._id}`}
              icon={<IconMapPin size="1rem" stroke={1.5} />}
            >
              Track
            </Menu.Item>
            <Menu.Item icon={<IconNotebook size="1rem" stroke={1.5} />}>
              Send Note
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size="1rem" stroke={1.5} />}
              color="red"
            >
              Delete Service
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
          <Table miw={800} verticalSpacing="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Assigned To</th>
                <th>Assigned For</th>
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
