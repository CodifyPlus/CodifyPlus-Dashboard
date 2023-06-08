import {
  ActionIcon,
  Badge,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
import { IconX } from "@tabler/icons-react";

function NotificationsPage() {
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const [notifications, setNotifications] = useState([
    {
      title: "",
      content: "",
      createdAt: "",
      _id: "",
    },
  ]);

  const handleDelete = (notificationId: string, username: string) => {
    UserService.deleteNotification({
      username: username,
      notificationId: notificationId,
    })
      .then((response) => {
        // Process the response data
        setNotifications(response.data.reverse());
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      });
  };

  const [isLoading, setIsLoading] = useState(true); // New state variable for loading status

  useEffect(() => {
    setIsLoading(true); // Set loading status to true before making the API call

    UserService.getAllNotifications(currentUser.username)
      .then((response) => {
        // Process the response data
        setNotifications(response.data.reverse());
        setIsLoading(false); // Set loading status to false after the data is fetched
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
        setIsLoading(false); // Set loading status to false in case of an error
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const Notifications = notifications.map((notification) => {
    return (
      <Grid.Col span={12}>
        <Paper shadow="sm" p="sm" withBorder>
          <Group>
          <Badge>{notification.createdAt.split("T")[0]}</Badge>
          <ActionIcon
            style={{ marginLeft: "auto" }}
            mt={8}
            size={"xs"}
            variant="outline"
            color="yellow"
            title="Delete Notification"
            onClick={() => {
              handleDelete(notification._id, currentUser.username);
            }}
          >
            <IconX size="0.7rem" />
          </ActionIcon>
          </Group>
          <Text fw={700} mt={5}>
            {notification.title}
          </Text>
          <Text c={"dimmed"} mt={5}>
            {notification.content}
          </Text>
        </Paper>
      </Grid.Col>
    );
  });

  return (
    <Container my="md">
      <Title
        align="center"
        sx={(theme) => ({
          fontWeight: 900,
        })}
      >
        Notifications
      </Title>
      {isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Grid mt={30}>
            <Grid.Col xs={12}>
              {Notifications.length === 0 ? (
                <Center>No Notifications Recieved Yet!</Center>
              ) : (
                Notifications
              )}
            </Grid.Col>
          </Grid>
        </>
      )}
    </Container>
  );
}

export { NotificationsPage };
