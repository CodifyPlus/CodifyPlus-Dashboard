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
} from "@mantine/core";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import {
  IconEye,
  IconMapPin,
  IconNotebook,
  IconPencil,
  IconSearch,
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

  const [filterData, setFilterData] = useState([
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

  const [search, setSearch] = useState("a");

  const [isLoading, setIsLoading] = useState(true);

  const [stateUpdate, setStateUpdate] = useState(false);

  const handleDelete = (serviceId: string) => {
    UserService.deleteService({ serviceId }).then(
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

  const handleSearchChange = (event: any) => {
    setSearch(event.currentTarget.value);
  };

  useEffect(() => {
    const filteredServices = services.filter(
      (service: any) =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.status.toLowerCase().includes(search.toLowerCase()) ||
        service.cost.includes(search.toLowerCase()) ||
        service.assignedTo.username
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.assignedTo.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.assignedFor.username
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        service.assignedFor.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );
    setFilterData(filteredServices);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    UserService.getAllServices().then(
      (response) => {
        const allServices = response.data;
        setServices(allServices);
        setSearch("");
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
  }, [stateUpdate]);

  const rows = filterData.map((item) => (
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
          <Loader />
        </Center>
      ) : (
        <ScrollArea>
          <TextInput
            placeholder="Search by any field"
            mb="md"
            icon={<IconSearch size="0.9rem" stroke={1.5} />}
            value={search}
            onChange={handleSearchChange}
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
      )}
    </>
  );
}
