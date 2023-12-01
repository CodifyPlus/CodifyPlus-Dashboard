import { useEffect, useState } from "react";
import {
  AppShell,
  Navbar,
  Footer,
  MediaQuery,
  useMantineTheme,
  Group,
  ActionIcon,
} from "@mantine/core";
import { Sidebar } from "../Fragments/DashboardFragments/Sidebar";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import {
  IconHome,
  IconMessage,
  IconProgressCheck,
  IconSettings,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import {
  NotificationBell,
  PopoverNotificationCenter,
  useSocket,
} from "@novu/notification-center";
import { notifications } from "@mantine/notifications";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { socket } = useSocket();
  const navigate = useNavigate();
  const { user: currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (socket) {
      socket.on("notification_received", (data) => {
        notifications.show({
          onClick: () => navigate("/dashboard/notifications"),
          message: data.message.content,
          autoClose: 5000,
          color: "green",
        });
      });
    }

    return () => {
      if (socket) {
        socket.off("notification_received");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div style={{ marginTop: "-120px" }}></div>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!opened}
            width={{ sm: 200, lg: 330 }}
          >
            <Sidebar drawerSetOpened={setOpened} />
          </Navbar>
        }
        footer={
          <Footer style={{ zIndex: 1000 }} height={60} p="md">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Group position="center" grow>
                {/* <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                /> */}
                <ActionIcon
                  onClick={() => setOpened(false)}
                  component={Link}
                  to="/dashboard/home"
                >
                  <IconHome />
                </ActionIcon>
                <ActionIcon
                  onClick={() => setOpened(false)}
                  component={Link}
                  to="/dashboard/allservices"
                >
                  <IconProgressCheck />
                </ActionIcon>
                <ActionIcon
                  onClick={() => setOpened(false)}
                  component={Link}
                  to="/dashboard/chat"
                >
                  <IconMessage />
                </ActionIcon>
                <ActionIcon>
                  <PopoverNotificationCenter colorScheme="dark">
                    {({ unseenCount }) => (
                      <NotificationBell unseenCount={unseenCount} />
                    )}
                  </PopoverNotificationCenter>
                </ActionIcon>
                <ActionIcon onClick={() => setOpened((o) => !o)}>
                  <IconSettings />
                </ActionIcon>
              </Group>
            </MediaQuery>

            <div style={{ marginLeft: "auto" }}></div>
          </Footer>
        }
      >
        <Outlet />
      </AppShell>
    </>
  );
}
