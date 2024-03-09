import { Container, Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { addTemplate } from "../../../services/AdminService";

export function AddTemplateModal({
  close_addTemplateModal,
  setStateUpdate,
  stateUpdate,
}) {
  const [successful, setSuccessful] = useState(false);

  const form = useForm({
    initialValues: {
      templateName: "",
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    const objToPost = {
      templateName: formValue.templateName,
    };
    addTemplate(objToPost).then(
      (response) => {
        setStateUpdate(!stateUpdate);
        close_addTemplateModal();
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
            label="Template Name"
            placeholder="MSME Registration..."
            required
            {...form.getInputProps("templateName")}
          />
          <Button fullWidth mt="xl" type="submit">
            Add Template
          </Button>
        </form>
      )}
    </Container>
  );
}
