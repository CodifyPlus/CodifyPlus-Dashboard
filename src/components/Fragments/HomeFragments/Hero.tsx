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
  } from '@mantine/core';
  import { IconCheck } from '@tabler/icons-react';
  
  const useStyles = createStyles((theme) => ({
    inner: {
      display: 'flex',
      justifyContent: 'space-between',
      
      paddingBottom: `calc(${theme.spacing.xl} * 4)`,
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
                Get <span className={classes.highlight}>dedicated</span> business solutions
              </Title>
              <Text color="dimmed" mt="md">
              Are you looking for someone to build your eCommerce website? Or your new startup's website or app?
              Or, maybe someone to handle your IT infrastructure? You are at the right place.
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
                  <b>Web Development</b> - Whether you need front-end design, back-end development, or a full-stack solution.
                </List.Item>
                <List.Item>
                  <b>App Development</b> - High-quality, user-friendly mobile apps that elevate your business and engage your audience. From concept to launch.
                </List.Item>
                <List.Item>
                  <b>Company Registration</b> - Whether you need help with company formation, trademark registration, or intellectual property protection, legal drafting, etc.
                </List.Item>
                <List.Item>
                  <b>...A lot more</b>
                </List.Item>
              </List>
  
              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control}>
                  View All Services
                </Button>
                <Button variant="default" radius="xl" size="md" className={classes.control}>
                  Get Quotation
                </Button>
              </Group>
            </div>
            <Image src={'https://ui.mantine.dev/_next/static/media/image.9a65bd94.svg'} className={classes.image} />
          </div>
        </Container>
      </div>
    );
  }
