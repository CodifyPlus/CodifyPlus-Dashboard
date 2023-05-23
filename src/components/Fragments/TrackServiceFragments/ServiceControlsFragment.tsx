import {
    createStyles,
    Card,
    Text,
    SimpleGrid,
    UnstyledButton,
    Group,
    rem,
  } from '@mantine/core';
  import {
    IconNote,
    IconPencilPlus,
    IconMapPinBolt,
    IconHeartPlus,
  } from '@tabler/icons-react';
  
  const mockdata = [
    { title: 'Add Note', icon: IconNote, color: 'teal' },
    { title: 'Edit Details', icon: IconPencilPlus, color: 'cyan' },
    { title: 'Add Track Point', icon: IconMapPinBolt, color: 'pink' },
    { title: 'Coming Soon!', icon: IconHeartPlus, color: 'red' },
  ];
  
  const useStyles = createStyles((theme) => ({
    card: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontWeight: 700,
    },
  
    item: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      borderRadius: theme.radius.md,
      height: rem(90),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      transition: 'box-shadow 150ms ease, transform 100ms ease',
  
      '&:hover': {
        boxShadow: theme.shadows.md,
        transform: 'scale(1.05)',
      },
    },
  }));
  
  export function ServiceControlsFragment() {
    const { classes, theme } = useStyles();
  
    const items = mockdata.map((item) => (
      <UnstyledButton key={item.title} className={classes.item}>
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