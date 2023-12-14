import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { useForm } from "@mantine/form";
import { Link, Navigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export function Register() {
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector((state: any) => {
    return state.auth;
  });
  const { message } = useSelector((state: any) => {
    return state.message;
  });
  const [loadingOverlayIsVisible, setLoadingOverlayIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (message && message.length > 0) {
      notifications.clean();
      notifications.show({
        message: message,
        autoClose: 3000,
      });
    }
  }, [message]);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) =>
        /^[a-zA-Z0-9]+$/.test(value)
          ? null
          : "The username must be unique and should not contain spaces or symbols!",
      // eslint-disable-next-line no-useless-escape
      password: (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
          value
        )
          ? null
          : "The password must contain atleast one uppercase, lowercase, symbol, and a number, and length must be more than 8 characters",
    },
  });

  if (successful) {
    return <Navigate to="/login" />;
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard/home" />;
  }
  const handleRegister = async (formValue: any) => {
    setLoadingOverlayIsVisible(true);
    const { username, email, password } = formValue;

    setSuccessful(false);

    // @ts-ignore
    await dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
        setLoadingOverlayIsVisible(false);
      })
      .catch(() => {
        setLoadingOverlayIsVisible(false);
        setSuccessful(false);
        if (message) {
          notifications.clean();
          notifications.show({
            message: message,
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <Container size={420} my={40}>
      {!successful && (
        <>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
            })}
          >
            Welcome to CodifyPlus CRM!
          </Title>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Already have an account?{" "}
            <Anchor size="sm" component={Link} to="/login">
              Login
            </Anchor>
          </Text>
        </>
      )}

      <Box maw={400} pos="relative">
        <LoadingOverlay
          loaderProps={{ variant: "bars" }}
          visible={loadingOverlayIsVisible}
          overlayBlur={1}
        />
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {!successful && (
            <form onSubmit={form.onSubmit(handleRegister)}>
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
              />
              <Group position="apart" mt="lg">
                <Anchor component="button" size="sm">
                  Forgot password?
                </Anchor>
              </Group>
              <Button fullWidth mt="xl" type="submit">
                Sign up
              </Button>
            </form>
          )}
          {successful && (
            <>
              <Text>Thanks for registering!</Text>
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
