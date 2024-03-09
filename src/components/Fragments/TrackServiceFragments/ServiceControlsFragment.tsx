import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  rem,
  LoadingOverlay,
} from "@mantine/core";
import {
  IconNote,
  IconPencilPlus,
  IconMapPinBolt,
  IconCheck,
  IconCalendarX,
  IconClockStop,
} from "@tabler/icons-react";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { markAsCompleted, markOnHold, toggleTimelineDatesVisibility } from "../../../services/AdminService";

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

interface serviceControlFragment {
  data: {
    openModalAddNote: any;
    openModalEditService: any;
    openModalAddTrack: any;
    setInfo: any;
    serviceId: any;
  };
}

export function ServiceControlsFragment({ data }: serviceControlFragment) {
  const [loadingOverlayIsVisible, setLoadingOverlayIsVisible] = useState(false);

  const mockdata = [
    {
      title: "Add Note",
      icon: IconNote,
      color: "teal",
      openModal: data.openModalAddNote,
    },
    {
      title: "Edit Details",
      icon: IconPencilPlus,
      color: "cyan",
      openModal: data.openModalEditService,
    },
    { title: "Toggle Dates", icon: IconCalendarX, color: "orange" },
    { title: "Mark On Hold", icon: IconClockStop, color: "yellow" },
    { title: "Add Track Point", icon: IconMapPinBolt, color: "pink" },
    { title: "Mark as Completed", icon: IconCheck, color: "red" },
  ];

  const handleComplete = (serviceId: any) => {
    setLoadingOverlayIsVisible(true);
    const objToPost = {
      serviceId: data.serviceId,
    };
    markAsCompleted(objToPost).then(
      (response) => {
        data.setInfo(response.data);
        setLoadingOverlayIsVisible(false);
      },
      (error) => {
        setLoadingOverlayIsVisible(false);
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

  const handleOnHold = (serviceId: any) => {
    setLoadingOverlayIsVisible(true);
    const objToPost = {
      serviceId: data.serviceId,
    };
    markOnHold(objToPost).then(
      (response) => {
        data.setInfo(response.data);
        setLoadingOverlayIsVisible(false);
      },
      (error) => {
        setLoadingOverlayIsVisible(false);
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

  const handleTimelineDatesVisibility = (serviceId: any) => {
    const objToPost = {
      serviceId: data.serviceId,
    };
    toggleTimelineDatesVisibility(objToPost).then(
      (response) => {
        data.setInfo(response.data);
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

  function handleClick(title: any) {
    if (title === "Add Note") {
      data.openModalAddNote();
    } else if (title === "Add Track Point") {
      data.openModalAddTrack();
    } else if (title === "Mark as Completed") {
      handleComplete(data.serviceId);
    } else if (title === "Toggle Dates") {
      handleTimelineDatesVisibility(data.serviceId);
    } else if (title === "Edit Details") {
      data.openModalEditService();
    } else if (title === "Mark On Hold") {
      handleOnHold(data.serviceId);
    }
  }

  const { classes, theme } = useStyles();

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
    <Card mt="md" withBorder radius="md" className={classes.card}>
      <LoadingOverlay
        loaderProps={{ variant: "bars" }}
        visible={loadingOverlayIsVisible}
        overlayBlur={1}
      />
      <Group position="apart">
        <Text size="lg" className={classes.title}>
          Controls
        </Text>
      </Group>
      <SimpleGrid cols={2} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
