import {
  PasswordInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import UserService from "../../services/user.service";
import { useParams } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export default function ResetPassword() {
  const { token } = useParams();
  const [loadingOverlayIsVisible, setLoadingOverlayIsVisible] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const form = useForm({
    initialValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    validate: {
      // eslint-disable-next-line no-useless-escape
      newPassword: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          value
        )
          ? null
          : "The password must contain atleast one uppercase, lowercase, symbol, and a number, and length must be more than 8 characters",
      confirmNewPassword: (value) =>
        value === form.values.newPassword ? null : "The passwords must match!",
    },
  });

  const handleChange = (formValue: any) => {
    setLoadingOverlayIsVisible(true);
    setSuccessful(false);
    UserService.resetPassword({ ...formValue, token }).then(
      (response) => {
        setLoadingOverlayIsVisible(false);
        setSuccessful(true);
      },
      (error) => {
        if (error) {
          setLoadingOverlayIsVisible(false);
          notifications.show({
            title: `Please try again!`,
            message: error.message,
            autoClose: 3000,
            color: "red",
          });
        }
      }
    );
  };

  return (
    <Container size={420} my={30}>
      <Title
        align="center"
        sx={(theme) => ({
          fontWeight: 900,
        })}
      >
        Change Password
      </Title>
      <Box maw={400} pos="relative">
        <LoadingOverlay
          loaderProps={{ variant: "bars" }}
          visible={loadingOverlayIsVisible}
          overlayBlur={1}
        />
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {!successful && (
            <form onSubmit={form.onSubmit(handleChange)} autoComplete="off">
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
      </Box>
    </Container>
  );
}
