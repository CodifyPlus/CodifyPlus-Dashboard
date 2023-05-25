import { useState } from "react";
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
import { Link, Navigate, Outlet } from "react-router-dom";
import { IconHome, IconNotification, IconProgressCheck, IconSettings, IconUser } from "@tabler/icons-react";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const { user: currentUser } = useSelector((state: any) => state.auth);

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
          <Footer height={60} p="md">
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
            <Group position="center" grow>
                {/* <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                /> */}
                <ActionIcon onClick={() => setOpened(false)} component={Link} to="/dashboard/home" ><IconHome/></ActionIcon>
                <ActionIcon onClick={() => setOpened(false)} component={Link} to="/dashboard/allservices"><IconProgressCheck/></ActionIcon>
                <ActionIcon onClick={() => setOpened(false)} component={Link} to="/dashboard/profile" ><IconUser/></ActionIcon>
                <ActionIcon onClick={() => setOpened(false)} component={Link} to="/dashboard/notifications"><IconNotification/></ActionIcon>
                <ActionIcon onClick={() => setOpened((o) => !o)}><IconSettings/></ActionIcon>

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
