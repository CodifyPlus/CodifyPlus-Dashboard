import { TextInput, Container, Button, Textarea } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { addTemplateTrack } from "../../../services/AdminService";

interface noteProps {
  data: {
    templateId: string;
    closeModal: any;
    setInfo: any;
  };
}

export function AddTemplatePoint({ data }: noteProps) {
  const [successful, setSuccessful] = useState(false);

  const form = useForm({
    initialValues: {
      description: "",
      title: "",
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    const objToPost = {
      description: formValue.description,
      title: formValue.title,
      templateId: data.templateId,
    };
    addTemplateTrack(objToPost).then(
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
          <TextInput
            label="Title"
            placeholder="Documents Supplied!"
            required
            {...form.getInputProps("title")}
          />

          <Textarea
            label="Description"
            placeholder="Documents Submitted..."
            required
            mt="md"
            {...form.getInputProps("description")}
          />
          <Button fullWidth mt="xl" type="submit">
            Add Template Point
          </Button>
        </form>
      )}
    </Container>
  );
}
