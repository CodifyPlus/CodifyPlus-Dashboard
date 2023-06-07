import {
  Container,
  Group,
  Button,
  Checkbox,
  CheckboxProps,
  Textarea,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { IconMail, IconNote } from "@tabler/icons-react";
import UserService from "../../../services/user.service";

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
      title: "",
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
    UserService.sendNotification(objToPost).then(
      (response) => {
        data.closeModal();
        setSuccessful(true);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
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
          <TextInput
            label="Title"
            placeholder="Verification failed!"
            required
            {...form.getInputProps("title")}
          />
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
