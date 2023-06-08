import {
  Container,
  Title,
  Loader,
  Center,
  Paper,
  TextInput,
  Button,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserInfoCard } from "../Fragments/ProfileFragments/UserInfoCard";
import { useForm } from "@mantine/form";
import UserService from "../../services/user.service";
import { notifications } from "@mantine/notifications";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useSelector((state: any) => {
    return state.auth;
  });

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  const form = useForm({
    initialValues: {
      fullname: formData.fullname,
      email: formData.email,
      phone: formData.phone,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const handleSubmit = (formValue: any) => {
    UserService.updateProfile(formValue).then(
      (response) => {
        setFormData({
          fullname: response.data.fullname,
          email: response.data.email,
          phone: response.data.phone,
        });
        notifications.show({
          message: `Details updated! 😎`,
          autoClose: 5000,
        });
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
  };

  useEffect(() => {
    UserService.getUserStats().then(
      (response) => {
        const { fullname, email, phone } = response.data;
        setFormData({ fullname, email, phone });
        form.setFieldValue("fullname", fullname);
        form.setFieldValue("email", email);
        form.setFieldValue("phone", phone);
        setIsLoading(false);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Title
            align="center"
            mb={30}
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Profile
          </Title>
          <Container size={420} my={40}>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
              <UserInfoCard
                avatar="https://api.dicebear.com/6.x/miniavs/svg"
                email={currentUser.email}
                name={currentUser.username}
              />
              <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
                <TextInput
                  label="Full Name"
                  mt={"md"}
                  placeholder="Please enter your full name"
                  {...form.getInputProps("fullname")}
                />
                <TextInput
                  label="Email"
                  mt="md"
                  placeholder="Please enter an email address"
                  required
                  disabled
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Phone Number"
                  mt="md"
                  placeholder="Please enter your phone number"
                  {...form.getInputProps("phone")}
                />
                <Button fullWidth mt="xl" type="submit">
                  Save Info
                </Button>
              </form>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
}

export default Profile;
