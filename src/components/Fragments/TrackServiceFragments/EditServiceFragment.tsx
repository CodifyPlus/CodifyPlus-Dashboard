import {
  TextInput,
  Paper,
  Container,
  Group,
  Button,
  Checkbox,
  CheckboxProps,
  Select,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { IconMail } from "@tabler/icons-react";
import UserService from "../../../services/user.service";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export default function EditServiceFragment({
  assignedTo,
  name,
  cost,
  duration,
  setInfo,
  serviceId,
  closeModal,
}) {
  const [moderators, setModerators] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  useEffect(() => {
    UserService.getAllModerators().then(
      (response) => {
        setModerators(response.data);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm({
    initialValues: {
      assignedTo: assignedTo,
      name: name,
      cost: cost,
      sendEmailToAssignee: false,
      duration: duration,
    },
  });

  const handleSubmit = (formValue: any) => {
    const objToPost = {
      ...formValue,
      serviceId: serviceId,
    };
    UserService.editServiceDetails(objToPost).then(
      (response) => {
        setInfo(response.data);
        closeModal();
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
      <IconMail className={className} />
    );

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size={420} my={40}>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
          <TextInput
            label="Name"
            mt="md"
            placeholder="GST Registration"
            required
            {...form.getInputProps("name")}
          />
          <TextInput
            label="Cost"
            mt="md"
            placeholder="4999"
            required
            {...form.getInputProps("cost")}
          />
          <TextInput
            label="Duration"
            mt="md"
            placeholder="2 Weeks"
            required
            {...form.getInputProps("duration")}
          />
          <Select
            label="Assign To"
            placeholder="johndoe"
            mt="md"
            searchable
            nothingFound="No User Found"
            maxDropdownHeight={280}
            {...form.getInputProps("assignedTo")}
            required
            data={moderators}
          />

          <Group position="apart" mt="lg">
            <Checkbox
              icon={CheckboxIcon}
              label="Notify Assignee via Email?"
              description="It would send an email to moderator with their assigned service details!"
              {...form.getInputProps("sendEmailToAssignee")}
            />
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Edit Service
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
