import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  Menu,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import moment from "moment";
import { notifications } from "@mantine/notifications";
import {
  IconDots,
  IconMessages,
  IconNote,
  IconPencil,
  IconReportAnalytics,
  IconSettingsBolt,
  IconTrash,
} from "@tabler/icons-react";

const rolesData = ["USER", "MODERATOR", "ADMIN"];

export function AllUsers() {
  const changeRole = (userId: string, newRole: string) => {
    UserService.changeUserRole({ userId, newRole }).then(
      (response) => {
        //console.log("Response", response.data);
      },
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

  useEffect(() => {
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
        //console.log("Stats", Stats);
        //console.log("Response", response.data);

        //console.log("Stats", Stats);
        //console.log("Response", response.data);
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
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            //console.log("I am selected!", value, item._id);
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
            <ActionIcon>
              <IconSettingsBolt size="1rem" stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconMessages size="1rem" stroke={1.5} />}>
              Send message
            </Menu.Item>
            <Menu.Item icon={<IconNote size="1rem" stroke={1.5} />}>
              Add note
            </Menu.Item>
            <Menu.Item icon={<IconReportAnalytics size="1rem" stroke={1.5} />}>
              Analytics
            </Menu.Item>
            <Menu.Item
              icon={<IconTrash size="1rem" stroke={1.5} />}
              color="red"
            >
              Terminate contract
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea>
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
    </>
  );
}
