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
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { IconMail } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import UserDetailsModal from "../../Fragments/AddUserFragments/UserDetailsModal";
import UserService from "../../../services/user.service";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export function AddUser() {
  const [successful, setSuccessful] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
      sendEmail: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleRegister = (formValue: any) => {
    setFormData(formValue);
    setSuccessful(false);
    UserService.addNewUser(formValue).then(
      (response) => {
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

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size={420} my={40}>
      {
        <>
          <Modal opened={opened} onClose={close} title="User Details" centered>
            <UserDetailsModal
              data={{
                email: formData.email,
                password: formData.password,
                username: formData.username,
              }}
            />
          </Modal>
          <Title
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Add New User
          </Title>
        </>
      }

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {!successful && (
          <form onSubmit={form.onSubmit(handleRegister)} autoComplete="off">
            <TextInput
              label="Username"
              placeholder="johndoe"
              required
              {...form.getInputProps("username")}
            />
            <TextInput
              label="Email"
              mt="md"
              placeholder="you@mantine.dev"
              required
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              {...form.getInputProps("password")}
              autoComplete="new-password"
            />

            <Group position="apart" mt="lg">
              <Checkbox
                icon={CheckboxIcon}
                label="Notify User via Email?"
                description="It would send an email to user with their username and password"
                {...form.getInputProps("sendEmail")}
              />
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Add User
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
