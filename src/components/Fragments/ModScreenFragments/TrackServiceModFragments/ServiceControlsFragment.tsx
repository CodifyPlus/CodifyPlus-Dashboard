import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  rem,
} from "@mantine/core";
import {
  IconNote,
  IconMapPinBolt,
} from "@tabler/icons-react";

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
    openModalAddTrack: any;
    setInfo: any;
    serviceId: any;
  };
}



export function ServiceControlsFragmentMod({ data }: serviceControlFragment) {
  const mockdata = [
    {
      title: "Add Note",
      icon: IconNote,
      color: "teal",
      openModal: data.openModalAddNote,
    },
    { title: "Add Track Point", icon: IconMapPinBolt, color: "pink" },
  ];

  function handleClick(title: any){
    if(title === "Add Note"){
      data.openModalAddNote();
    }
    else if(title === "Add Track Point"){
      data.openModalAddTrack();
    }
  }

  const { classes, theme } = useStyles();

  const items = mockdata.map((item) => (
    <UnstyledButton onClick={() => handleClick(item.title)} key={item.title} className={classes.item}>
      <item.icon color={theme.colors[item.color][6]} size="2rem" />
      <Text size="xs" mt={7}>
        {item.title}
      </Text>
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>Controls</Text>
      </Group>
      <SimpleGrid cols={2} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}
