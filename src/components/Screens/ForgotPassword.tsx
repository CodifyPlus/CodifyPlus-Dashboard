import {
  TextInput,
  Paper,
  Title,
  Text,
  Container,
  Button,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";
import UserService from "../../services/user.service";
import { useForm } from "@mantine/form";

export default function ForgotPassword() {
  const [loadingOverlayIsVisible, setLoadingOverlayIsVisible] = useState(false);

  const form = useForm({
    initialValues: {
      email: "",
    },
  });

  const handleSendLink = async (formValue: any) => {
    setLoadingOverlayIsVisible(true);
    //@ts-ignore
    UserService.forgotPassword(formValue).then(
      (response) => {
        setLoadingOverlayIsVisible(false);
        notifications.show({
          title: "Success",
          message: "Email sent successfully! Please check your inbox.",
          color: "green",
        });
      },
      (error) => {
        setLoadingOverlayIsVisible(false);
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        }
      }
    );
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Forgot Password?
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Don't worry! Just 2 minutes away from awesomeness :{")"}
      </Text>

      <Box maw={400} pos="relative">
        <LoadingOverlay
          loaderProps={{ variant: "bars" }}
          visible={loadingOverlayIsVisible}
          overlayBlur={1}
        />
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <form onSubmit={form.onSubmit(handleSendLink)}>
            <TextInput
              label="Email"
              placeholder="johndoe@gmail.com"
              required
              {...form.getInputProps("email")}
            />
            <Button fullWidth mt="xl" type="submit">
              Send Magic Link
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
