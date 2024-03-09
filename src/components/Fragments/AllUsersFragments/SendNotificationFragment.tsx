import {
  Container,
  Group,
  Button,
  Checkbox,
  CheckboxProps,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { IconMail, IconNote } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { sendNotification } from "../../../services/AdminService";

interface notificationProps {
  data: {
    username: string;
    closeModal: any;
  };
}

export function SendNotificationFragment({ data }: notificationProps) {
  const [successful, setSuccessful] = useState(false);

  const form = useForm({
    initialValues: {
      sendEmail: false,
      content: "",
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    const objToPost = {
      sendEmail: formValue.sendEmail,
      content: formValue.content,
      username: data.username,
      title: formValue.title,
    };
    sendNotification(objToPost).then(
      (response) => {
        data.closeModal();
        setSuccessful(true);
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
  };

  const CheckboxIcon: CheckboxProps["icon"] = ({ indeterminate, className }) =>
    indeterminate ? (
      <IconMail className={className} />
    ) : (
      <IconNote className={className} />
    );

  return (
    <Container size={420}>
      {!successful && (
        <form onSubmit={form.onSubmit(handleRegister)} autoComplete="off">
          <Textarea
            label="Content"
            placeholder="Documents verification has been failed due..."
            required
            {...form.getInputProps("content")}
          />
          <Group position="apart" mt="lg">
            <Checkbox
              icon={CheckboxIcon}
              label="Notify User via Email?"
              description="It would send an email to user with details to new notification"
              {...form.getInputProps("sendEmail")}
              indeterminate
            />
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Send Notification
          </Button>
        </form>
      )}
    </Container>
  );
}
