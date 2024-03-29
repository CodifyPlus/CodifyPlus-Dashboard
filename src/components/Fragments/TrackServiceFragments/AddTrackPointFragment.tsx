import {
  TextInput,
  Container,
  Group,
  Button,
  Checkbox,
  CheckboxProps,
  Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { useForm } from "@mantine/form";
import { IconMail, IconStatusChange } from "@tabler/icons-react";
import { DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { addTrack } from "../../../services/AdminService";

interface noteProps {
  data: {
    serviceId: string;
    closeModal: any;
    setInfo: any;
  };
}

export function AddTrackPointFragment({ data }: noteProps) {
  const [successful, setSuccessful] = useState(false);

  const form = useForm({
    initialValues: {
      sendEmail: false,
      description: "",
      title: "",
      status: false,
      startedAt: undefined,
    },
  });

  const handleRegister = (formValue: any) => {
    setSuccessful(false);
    const objToPost = {
      sendEmail: formValue.sendEmail,
      description: formValue.description,
      title: formValue.title,
      status: formValue.status,
      startedAt: formValue.startedAt,
      serviceId: data.serviceId,
    };
    addTrack(objToPost).then(
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
      <IconStatusChange className={className} />
    );

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

          <DateTimePicker
            label="Started At"
            placeholder="Pick date and time"
            maw={400}
            mx="auto"
            mt="md"
            {...form.getInputProps("startedAt")}
          />

          <Group position="apart" mt="lg">
            <Checkbox
              icon={CheckboxIcon}
              label="Mark as completed?"
              description="It would mark the status of this track point as completed"
              {...form.getInputProps("status")}
            />
            <Checkbox
              icon={CheckboxIcon}
              label="Notify User via Email?"
              description="It would send an email to user with details to new track point"
              {...form.getInputProps("sendEmail")}
              indeterminate
            />
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Add Track Point
          </Button>
        </form>
      )}
    </Container>
  );
}
