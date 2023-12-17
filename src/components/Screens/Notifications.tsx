import { Center, Container, Grid, useMantineColorScheme } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { NotificationCenter } from "@novu/notification-center";

function NotificationsPage() {
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const { colorScheme } = useMantineColorScheme();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container my="md">
      <>
        <Grid>
          <Grid.Col xs={12}>
            <Center>
              <NotificationCenter colorScheme={colorScheme}></NotificationCenter>
            </Center>
          </Grid.Col>
        </Grid>
      </>
    </Container>
  );
}

export default NotificationsPage;
