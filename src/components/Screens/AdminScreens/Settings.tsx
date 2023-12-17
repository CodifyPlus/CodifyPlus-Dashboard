import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  rem,
  Container,
  Grid,
  Center,
} from "@mantine/core";
import {
  IconFileExport,
  IconMessage2Pin,
  IconPackageExport,
} from "@tabler/icons-react";
import UserService from "../../../services/user.service";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease, transform 100ms ease",

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.05)",
    },
  },
}));

const handleExportUsers = () => {
  UserService.exportUsers().then(
    (response) => {
      // Trigger a download by creating an invisible link and clicking it
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "users.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        //@ts-ignore
        EventBus.dispatch("logout");
      }
    }
  );
};

const handleExportServices = () => {
  UserService.exportServices().then(
    (response) => {
      // Trigger a download by creating an invisible link and clicking it
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "services.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        //@ts-ignore
        EventBus.dispatch("logout");
      }
    }
  );
};

const handleExportChats = () => {
  UserService.exportChats().then(
    (response) => {
      // Trigger a download by creating an invisible link and clicking it
      const blob = new Blob([response.data], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "chats.csv";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        //@ts-ignore
        EventBus.dispatch("logout");
      }
    }
  );
};

export default function Settings() {
  const mockdata = [
    { title: "Export Users", icon: IconPackageExport, color: "violet" },
    { title: "Export Services", icon: IconFileExport, color: "orange" },
    { title: "Export Chats", icon: IconMessage2Pin, color: "green" },
  ];

  const { classes, theme } = useStyles();

  function handleClick(title: any) {
    if (title === "Export Users") {
      handleExportUsers();
    } else if (title === "Export Services") {
      handleExportServices();
    } else if (title === "Export Chats") {
      handleExportChats();
    }
  }

  const items = mockdata.map((item) => (
    <UnstyledButton
      onClick={() => handleClick(item.title)}
      key={item.title}
      className={classes.item}
    >
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Container size="auto" my="md">
      <Grid>
        <Grid.Col xs={12}>
          <Card withBorder radius="md" className={classes.card}>
            <Center>
              <Text size={20} className={classes.title}>
                Settings
              </Text>
            </Center>
            <SimpleGrid cols={3} mt="md">
              {items}
            </SimpleGrid>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
