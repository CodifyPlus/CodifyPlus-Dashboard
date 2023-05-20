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
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { useForm } from "@mantine/form";
import { Navigate } from "react-router-dom";

export function Register() {
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });
  
  if (successful) {
    return <Navigate to="/login" />;
  }

  if (isLoggedIn) {
    return <Navigate to="/dashboard/home" />;
  }
  const handleRegister = (formValue: any) => {
    const { username, email, password } = formValue;

    setSuccessful(false);

    // @ts-ignore
    dispatch(register({ username, email, password }))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
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
            <Anchor size="sm" component="button">
              Login
            </Anchor>
          </Text>
        </>
      )}

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
    </Container>
  );
}
