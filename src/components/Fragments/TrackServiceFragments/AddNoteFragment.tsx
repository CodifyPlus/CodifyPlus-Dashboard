import {
  Container,
  Group,
  Button,
  Checkbox,
  CheckboxProps,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { IconMail, IconNote } from "@tabler/icons-react";
import UserService from "../../../services/user.service";
import { notifications } from "@mantine/notifications";
import RichTextComponent from "../../../common/RichTextComponent";

interface noteProps {
  data: {
    serviceId: string;
    closeModal: any;
    setInfo: any;
  };
}

export function AddNoteFragment({ data }: noteProps) {
  const [successful, setSuccessful] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const form = useForm({
    initialValues: {
      private: false,
      sendEmail: false,
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    const objToPost = {
      private: formValue.private,
      sendEmail: formValue.sendEmail,
      information: noteContent,
      serviceId: data.serviceId,
    };
    UserService.addNote(objToPost).then(
      (response) => {
        data.setInfo(response.data);
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
          <RichTextComponent setNoteContent={setNoteContent} />
          <Group position="apart" mt="lg">
            <Checkbox
              icon={CheckboxIcon}
              label="Keep it private"
              description="It would not show the note on user dashboard"
              {...form.getInputProps("private")}
            />
            <Checkbox
              icon={CheckboxIcon}
              label="Notify User via Email?"
              description="It would send an email to user with details to new note"
              {...form.getInputProps("sendEmail")}
              indeterminate
            />
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Add Note
          </Button>
        </form>
      )}
    </Container>
  );
}
