import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
    Center,
  } from '@mantine/core';
  import { IconCheck } from '@tabler/icons-react';
  import CodifyPlusLaptop from "./CodifyPlus Mockup BGT.png";
  
  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      
      paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    },
  
    content: {
      maxWidth: rem(480),
      marginRight: `calc(${theme.spacing.xl} * 3)`,
  
      [theme.fn.smallerThan('md')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      fontSize: rem(44),
      lineHeight: 1.2,
      fontWeight: 900,
  
      [theme.fn.smallerThan('xs')]: {
        fontSize: rem(28),
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        flex: 1,
      },
    },
  
    image: {
      flex: 1,
  
      [theme.fn.smallerThan('md')]: {
        display: 'none',
      },
    },
  
    highlight: {
      position: 'relative',
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      borderRadius: theme.radius.sm,
      padding: `${rem(1)} ${rem(12)}`,
    },
  }));
  
  export function Hero() {
    const { classes } = useStyles();
    return (
      <div>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                An <span className={classes.highlight}>All-in-one</span> Dashboard
              </Title>
              <Text color="dimmed" mt="md">
              CodifyPlus Dashboard offers the integrated experience to manage your clients on-the-fly. Anytime, any device, anywhere, in a matter of few clicks.
              </Text>
  
              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <IconCheck size={rem(12)} stroke={1.5} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Track Services</b> - Track your services on the go using our web or mobile app.
                </List.Item>
                <List.Item>
                  <b>Raise Tickets</b> - Raise any ticket or query via the dashboard and get them resolved quickly.
                </List.Item>
                <List.Item>
                  <b>...A lot more</b>
                </List.Item>
              </List>
  
              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control}>
                  Go to Dashboard
                </Button>
                <Button variant="default" radius="xl" size="md" className={classes.control}>
                  Download Mobile App
                </Button>
              </Group>
            </div>
            <Center maw={450}>

            <Image alt='codifyplus-mobiles' src={CodifyPlusLaptop} className={classes.image} />
            </Center>
          </div>
        </Container>
      </div>
    );
  }
