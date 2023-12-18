import {
  Container,
  Title,
  Loader,
  Center,
  Paper,
  TextInput,
  Button,
  SimpleGrid,
  Grid,
  Text,
  Group,
  Switch,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserInfoCard } from "../Fragments/ProfileFragments/UserInfoCard";
import { useForm } from "@mantine/form";
import UserService from "../../services/user.service";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import OneSignal from "react-onesignal";
import { ProfileThemeChangeToggle } from "../Fragments/DarkModeButton/ProfileThemeChangeToggle";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const { user: currentUser } = useSelector((state: any) => {
    return state.auth;
  });
  const theme = useMantineTheme();
  const [allowOneSignal, setAllowOneSignal] = useState(false);

  const enablePushNotifications = async () => {
    let permission = await OneSignal.Notifications.permission;
    if (!permission) {
      OneSignal.Slidedown.promptPush();
    }
    permission = await OneSignal.Notifications.permission;
    setAllowOneSignal(permission);
  };

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
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
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
          <Loader variant="bars" />
        </Center>
      ) : (
        <>
          <Title
            align="center"
            mb={30}
            mt={20}
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Profile
          </Title>
          <Container>
            <SimpleGrid
              cols={2}
              spacing="md"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <Paper withBorder shadow="md" p={30} mt={10} radius="md">
                <UserInfoCard
                  avatar={`https://api.dicebear.com/7.x/miniavs/svg?seed=${currentUser.username.toUpperCase()}`}
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
              <Grid gutter="md">
                <Grid.Col>
                  <Paper withBorder shadow="md" p={30} mt={10} radius="md">
                    <Group position="center">
                      <ProfileThemeChangeToggle />
                    </Group>
                  </Paper>
                  <Paper withBorder shadow="md" p={30} mt={10} radius="md">
                    <Group position="center">
                      <Switch
                        checked={allowOneSignal}
                        onChange={(event) => {
                          setAllowOneSignal(event.currentTarget.checked);
                          if (event.currentTarget.checked) {
                            enablePushNotifications();
                          }
                        }}
                        color="teal"
                        size="md"
                        label="Allow Push Notifications"
                        thumbIcon={
                          allowOneSignal ? (
                            <IconCheck
                              size="0.8rem"
                              color={theme.colors.teal[theme.fn.primaryShade()]}
                              stroke={3}
                            />
                          ) : (
                            <IconX
                              size="0.8rem"
                              color={theme.colors.red[theme.fn.primaryShade()]}
                              stroke={3}
                            />
                          )
                        }
                      />
                    </Group>
                    <Center>
                      <Text mt={10} maw={300} ta="center" c="dimmed" size="xs">
                        These notifications would help you stay in touch with
                        the experts while your services are being processed
                      </Text>
                    </Center>
                  </Paper>
                </Grid.Col>
              </Grid>
            </SimpleGrid>
          </Container>
        </>
      )}
    </>
  );
}

export default Profile;
