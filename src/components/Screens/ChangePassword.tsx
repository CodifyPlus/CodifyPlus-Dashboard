import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import UserService from "../../services/user.service";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export function ChangePassword() {
  const [successful, setSuccessful] = useState(false);
  const form = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const handleChange = (formValue: any) => {
    setSuccessful(false);
    UserService.changePassword(formValue).then(
      (response) => {
        setSuccessful(true);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        } else {
          notifications.show({
            title: `Please try again!`,
            message: `Your old password is not correct, please try again!`,
            autoClose: 3000,
            color: "red",
          });
        }
      }
    );
  };

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size={420} my={40}>
      {
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Change Password
          </Title>
        </>
      }

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        {!successful && (
          <form onSubmit={form.onSubmit(handleChange)} autoComplete="off">
            <PasswordInput
              label="Old Password"
              placeholder="Enter old password"
              required
              {...form.getInputProps("oldPassword")}
              autoComplete="new-password"
            />
            <PasswordInput
              label="New Password"
              placeholder="Enter new password"
              required
              mt="md"
              {...form.getInputProps("newPassword")}
              autoComplete="new-password"
            />
            <PasswordInput
              label="Confirm New Password"
              placeholder="Re-Enter the password"
              required
              mt="md"
              {...form.getInputProps("confirmNewPassword")}
              autoComplete="new-password"
            />
            <Button fullWidth mt="xl" type="submit">
              Change Password
            </Button>
          </form>
        )}
        {successful && (
          <>
            <Text>Password changed successfully!</Text>
          </>
        )}
      </Paper>
    </Container>
  );
}
