import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { useForm } from "@mantine/form";

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const handleLogin = (formValue: any) => {
    const { username, password } = formValue;

    //@ts-ignore
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/dashboard/home");
        window.location.reload();
      })
      .catch((error: any) => {
        notifications.show({
          title: `Login Failed!`,
          message: `Your username or password is incorrect. Please try again!`,
          autoClose: 3000,
          color: "red",
        });
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor size="sm" component="button">
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleLogin)}>
          <TextInput
            label="Username"
            placeholder="johndoe123"
            required
            {...form.getInputProps("username")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            {...form.getInputProps("password")}
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
