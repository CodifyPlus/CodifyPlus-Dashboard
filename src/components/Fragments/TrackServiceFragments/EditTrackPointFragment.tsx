import { TextInput, Container, Button, Textarea } from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import UserService from "../../../services/user.service";
import { DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";

export function EditTrackPointFragment({
  setInfo,
  serviceId,
  closeModal,
  title,
  description,
  pathwayId,
}) {
  const [successful, setSuccessful] = useState(false);

  const form = useForm({
    initialValues: {
      description: description,
      title: title,
      startedAt: undefined,
    },
  });

  const handleEdit = (formValue: any) => {
    setSuccessful(false);
    const objToPost = {
      description: formValue.description,
      title: formValue.title,
      startedAt: formValue.startedAt,
      serviceId: serviceId,
      pathwayId: pathwayId,
    };
    UserService.editTrack(objToPost).then(
      (response) => {
        setInfo(response.data);
        closeModal();
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
        <form onSubmit={form.onSubmit(handleEdit)} autoComplete="off">
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

          <DateTimePicker
            label="Started At"
            placeholder="Pick date and time"
            maw={400}
            mx="auto"
            mt="md"
            {...form.getInputProps("startedAt")}
          />
          <Button fullWidth mt="xl" type="submit">
            Edit Track Point
          </Button>
        </form>
      )}
    </Container>
  );
}
