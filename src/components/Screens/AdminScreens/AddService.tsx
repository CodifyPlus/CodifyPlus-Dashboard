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
import UserService from "../../../services/user.service";
import ServiceDetalsModal from "../../Fragments/AddServiceFragments/ServiceDetailsModal";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AddService() {
  const [usernames, setUsernames] = useState([
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
    UserService.getAllUsernames().then(
      (response) => {
        setUsernames(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
    UserService.getAllModerators().then(
      (response) => {
        setModerators(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
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
      cost: "",
      sendEmailToUser: false,
      sendEmailToAssignee: false,
      assignedFor: "",
      duration: "",
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    UserService.addNewService(formValue).then(
      (response) => {
        setSuccessful(true);
        setNewServiceId(response.data);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
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
            <TextInput
              label="Name"
              mt="md"
              placeholder="GST Registration"
              required
              {...form.getInputProps("name")}
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
