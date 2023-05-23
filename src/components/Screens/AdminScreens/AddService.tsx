import {
  TextInput,
  PasswordInput,
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
import UserDetailsModal from "../../Fragments/AddUserFragments/UserDetailsModal";
import UserService from "../../../services/user.service";

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
        //console.log("Stats", Stats);
        //console.log("Response", response.data);

        //console.log("Stats", Stats);
        //console.log("Response", response.data);
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
        //console.log("Stats", Stats);
        //console.log("Response", response.data);

        //console.log("Stats", Stats);
        //console.log("Response", response.data);
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
  const [formData, setFormData] = useState({
    assignedTo: "",
    name: "",
    cost: "",
    sendEmailToUser: false,
    sendEmailToAssignee: false,
    assignedFor: "",
    duration: "",
  });
  const [opened, { open, close }] = useDisclosure(false);

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
    console.log(formValue);
    setFormData(formValue);
    setSuccessful(false);
    UserService.addNewUser().then(
      (response) => {
        console.log("Response", response.data);
        setSuccessful(true);
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

  return (
    <Container size={420} my={40}>
      {
        <>
          {/* <Modal opened={opened} onClose={close} title="User Details" centered>
            <UserDetailsModal
              data={{
                email: formData.email,
                password: formData.password,
                username: formData.username,
              }}
            />
          </Modal> */}
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
            <Text>User Added Successfully!</Text>
          </>
        )}
      </Paper>
    </Container>
  );
}
