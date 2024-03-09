import {
  Table,
  Group,
  Text,
  ScrollArea,
  Menu,
  Button,
  Loader,
  Center,
  TextInput,
  Pagination,
  ActionIcon,
} from "@mantine/core";
import { useEffect, useState } from "react";
import {
  IconEye,
  IconMapPin,
  IconSearch,
  IconSettingsBolt,
  IconSettingsSearch,
  IconTrash,
} from "@tabler/icons-react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { notifications } from "@mantine/notifications";
import { useDebouncedValue } from "@mantine/hooks";
import { deleteService, getAllServices } from "../../../services/AdminService";

export default function ManageServices() {
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

  const [search, setSearch] = useState("");
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [debouncedSearch] = useDebouncedValue(search, 1000, { leading: true });
  const [isLoading, setIsLoading] = useState(true);
  const [stateUpdate, setStateUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalServices, setTotalServices] = useState(0);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = (serviceId: string) => {
    deleteService({ serviceId }).then(
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

  const handleSearchChange = (event: any) => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    getAllServices({
      page: currentPage,
      limit: 10,
      search: debouncedSearch,
      advancedSearch: advancedSearch,
    }).then(
      (response) => {
        const allServices = response.data.services;
        const totalServices = response.data.total;
        setTotalServices(totalServices);
        // Reverse the array to show the latest services first
        setServices(allServices.reverse());
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
              to={`/dashboard/servicestatus/${item._id}`}
              icon={<IconEye size="1rem" stroke={1.5} />}
            >
              View
            </Menu.Item>
            <Menu.Item
              component={Link}
              to={`/dashboard/track/${item._id}`}
              icon={<IconMapPin size="1rem" stroke={1.5} />}
            >
              Track
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                handleDelete(item._id);
              }}
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
          <Center>
            <Pagination
              value={currentPage}
              onChange={handlePageChange}
              pt={40}
              total={Math.ceil(totalServices / 10)}
              color="yellow"
              withEdges
            />
          </Center>
        </>
      )}
    </>
  );
}
