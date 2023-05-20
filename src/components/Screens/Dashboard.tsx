import { useState } from "react";
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { Sidebar } from "../Fragments/DashboardFragments/Sidebar";
import Logo from "../Fragments/Navbar/Logo";
import DarkModeButton from "../Fragments/DarkModeButton/DarkModeButton";
const PUSH_DOWN = rem(-120);

export default function Dashboard() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
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
            <Sidebar />
          </Navbar>
        }
        footer={
          <Footer height={60} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Logo />
              <div style={{ marginLeft: "auto" }}>
                <DarkModeButton />
              </div>
            </div>
          </Footer>
        }
      >
        <Text>Resize app to see responsive navbar in action</Text>
      </AppShell>
    </>
  );
}
