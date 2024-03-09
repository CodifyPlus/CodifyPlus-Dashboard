import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Checkbox,
  CheckboxProps,
  Modal,
  Select,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { IconMail } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import ServiceDetalsModal from "../../Fragments/AddServiceFragments/ServiceDetailsModal";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import {
  addNewService,
  getAllModerators,
  getAllUsernames,
  getTemplateNames,
} from "../../../services/AdminService";

export default function AddService() {
  const [usernames, setUsernames] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const [templates, setTemplates] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const [names, setNames] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const [moderators, setModerators] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  useEffect(() => {
    getAllUsernames().then(
      (response) => {
        setUsernames(response.data);
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
    getTemplateNames().then(
      (response) => {
        setTemplates(response.data);
        setNames(response.data);
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
    getAllModerators().then(
      (response) => {
        setModerators(response.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [successful, setSuccessful] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [newServiceId, setNewServiceId] = useState("");

  const form = useForm({
    initialValues: {
      assignedTo: "",
      name: "",
      templateName: "",
      cost: "",
      sendEmailToUser: false,
      sendEmailToAssignee: false,
      assignedFor: "",
      duration: "",
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    addNewService(formValue).then(
      (response) => {
        setSuccessful(true);
        setNewServiceId(response.data);
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
    open();
  };

  const CheckboxIcon: CheckboxProps["icon"] = ({ indeterminate, className }) =>
    indeterminate ? (
      <IconMail className={className} />
    ) : (
      <IconMail className={className} />
    );

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size={420} my={40}>
      {
        <>
          <Modal
            opened={opened}
            onClose={close}
            title="Service has been added successfully!"
            centered
          >
            <ServiceDetalsModal data={{ _id: newServiceId }} />
          </Modal>
          <Title
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Add New Service
          </Title>
        </>
      }

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {!successful && (
          <form onSubmit={form.onSubmit(handleRegister)} autoComplete="off">
            <Select
              label="Assign For"
              placeholder="johndoe"
              searchable
              nothingFound="No User Found"
              maxDropdownHeight={280}
              {...form.getInputProps("assignedFor")}
              required
              data={usernames}
            />
            <Select
              label="Name"
              required
              mt="md"
              placeholder="GST Registration"
              searchable
              nothingFound="No template Found"
              maxDropdownHeight={280}
              {...form.getInputProps("name")}
              data={names}
              creatable
              getCreateLabel={(query) => `${query}`}
              onCreate={(query) => {
                const item = { value: query, label: query };
                setNames((current) => [...current, item]);
                return item;
              }}
            />
            <Select
              label="Import Template From"
              mt="md"
              placeholder="GST Registration"
              searchable
              nothingFound="No template Found"
              maxDropdownHeight={280}
              {...form.getInputProps("templateName")}
              data={templates}
            />
            <TextInput
              label="Cost"
              mt="md"
              placeholder="4999"
              required
              {...form.getInputProps("cost")}
            />
            <TextInput
              label="Duration"
              mt="md"
              placeholder="2 Weeks"
              required
              {...form.getInputProps("duration")}
            />
            <Select
              label="Assign To"
              placeholder="johndoe"
              mt="md"
              searchable
              nothingFound="No User Found"
              maxDropdownHeight={280}
              {...form.getInputProps("assignedTo")}
              required
              data={moderators}
            />

            <Group position="apart" mt="lg">
              <Checkbox
                icon={CheckboxIcon}
                label="Notify User via Email?"
                description="It would send an email to user with their service details!"
                {...form.getInputProps("sendEmailToUser")}
              />
              <Checkbox
                icon={CheckboxIcon}
                label="Notify Assignee via Email?"
                description="It would send an email to assignee with their assigned service details!"
                {...form.getInputProps("sendEmailToAssignee")}
              />
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Add Service
            </Button>
          </form>
        )}
        {successful && (
          <>
            <Text>Service Added Successfully!</Text>
          </>
        )}
      </Paper>
    </Container>
  );
}
