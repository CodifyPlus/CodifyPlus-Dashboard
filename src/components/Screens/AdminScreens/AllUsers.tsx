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
  Pagination,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import moment from "moment";
import { notifications } from "@mantine/notifications";
import {
  IconMessages,
  IconProgressCheck,
  IconSearch,
  IconSettingsBolt,
  IconSettingsSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { SendNotificationFragment } from "../../Fragments/AllUsersFragments/SendNotificationFragment";
import { useDebouncedValue, useDisclosure } from "@mantine/hooks";
import {
  changeUserRole,
  deleteUser,
  getAllUsers,
} from "../../../services/AdminService";

const rolesData = ["USER", "MODERATOR", "ADMIN"];

export default function AllUsers() {
  const changeRole = (userId: string, newRole: string) => {
    changeUserRole({ userId, newRole }).then(
      (response) => {},
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

  const [users, setUsers] = useState([
    {
      username: "",
      email: "",
      processServices: [],
      onHoldServices: [],
      _id: "",
      role: "",
      createdAt: "",
    },
  ]);

  const [stateUpdate, setStateUpdate] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 1000, { leading: true });
  const [notificationUsername, setNotificationUsername] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  const [
    opened_sendNotification,
    { open: open_sendNotification, close: close_sendNotification },
  ] = useDisclosure(false);

  const handleSearchChange = (event: any) => {
    setSearch(event.currentTarget.value);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = (userId: string) => {
    deleteUser({ userId }).then(
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
    getAllUsers({
      page: currentPage,
      limit: 10,
      search: debouncedSearch,
      advancedSearch: advancedSearch,
    }).then(
      (response) => {
        setUsers(response.data.users);
        setTotalUsers(response.data.total);
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
  }, [currentPage, stateUpdate, debouncedSearch]);

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
      <td>{item.onHoldServices.length}</td>
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
              onClick={() => {
                setNotificationUsername(item.username);
                open_sendNotification();
              }}
              icon={<IconMessages size="1rem" stroke={1.5} />}
            >
              Send Notification
            </Menu.Item>
            <Menu.Item
              component={Link}
              to={`/dashboard/all-user-services/${item._id}`}
              icon={<IconProgressCheck size="1rem" stroke={1.5} />}
            >
              All Services
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
          <Loader variant="bars" />
        </Center>
      ) : (
        <>
          <ScrollArea>
            <TextInput
              placeholder={
                !advancedSearch
                  ? "Search by any field"
                  : "Use syntax <field>:<operator{eq, contains}>:<value> & <field>:<operator{eq, contains}>:<value> & etc."
              }
              mb="md"
              icon={<IconSearch size="0.9rem" stroke={1.5} />}
              value={search}
              onChange={handleSearchChange}
              rightSection={
                <ActionIcon
                  color="yellow"
                  title={!advancedSearch ? "Basic Search" : "Advanced Search"}
                  onClick={() => {
                    setAdvancedSearch(!advancedSearch);
                  }}
                >
                  {!advancedSearch ? (
                    <IconSearch size={20} />
                  ) : (
                    <IconSettingsSearch size={20} />
                  )}
                </ActionIcon>
              }
            />
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
                  <th>Services Under Process</th>
                  <th>Services On Hold</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
          <Center>
            <Pagination
              value={currentPage}
              onChange={handlePageChange}
              pt={40}
              total={Math.ceil(totalUsers / 10)}
              color="yellow"
              withEdges
            />
          </Center>
        </>
      )}
    </>
  );
}
