import { Container, Button } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import UserService from "../../../../services/user.service";
import { notifications } from "@mantine/notifications";
import RichTextComponent from "../../../../common/RichTextComponent";

interface noteProps {
  data: {
    serviceId: string;
    closeModal: any;
    setInfo: any;
  };
}

export function AddNoteFragmentMod({ data }: noteProps) {
  const [successful, setSuccessful] = useState(false);
  const [noteContent, setNoteContent] = useState("");

  const form = useForm({
    initialValues: {
      sendEmail: false,
      information: "",
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    const objToPost = {
      sendEmail: formValue.sendEmail,
      information: noteContent,
      serviceId: data.serviceId,
    };
    UserService.addNoteMod(objToPost).then(
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

  return (
    <Container size={420}>
      {!successful && (
        <form onSubmit={form.onSubmit(handleRegister)} autoComplete="off">
          <RichTextComponent setNoteContent={setNoteContent} />

          {/* <Group position="apart" mt="lg">
              <Checkbox
                icon={CheckboxIcon}
                label="Notify User via Email?"
                description="It would send an email to user with details to new note"
                {...form.getInputProps("sendEmail")}
                indeterminate
              />
            </Group> */}
          <Button fullWidth mt="xl" type="submit">
            Add Note
          </Button>
        </form>
      )}
    </Container>
  );
}
