import {
  createStyles,
  Title,
  Text,
  Button,
  Container,
  Group,
  rem,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    paddingBottom: rem(80),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(220),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}));

export function Offline() {
  const { classes } = useStyles();
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const emoticons = ["😉", "😊", "😄", "😅", "😓", "😥", "😣"];

  const [currentEmoticon, setCurrentEmoticon] = useState(emoticons[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextIndex =
        (emoticons.indexOf(currentEmoticon) + 1) % emoticons.length;
      setCurrentEmoticon(emoticons[nextIndex]);
    }, 500);

    return () => clearInterval(intervalId);
  }, [currentEmoticon, emoticons]);

  const handleRetryClick = () => {
    // Check for internet connection
    const isNetworkAvailable = navigator.onLine;
    if (isNetworkAvailable) {
      navigate("/dashboard/home");
    }
  };

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{currentEmoticon}</div>
      <Title className={classes.title}>Are you currently offline?</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Unfortunately, we couldn't connect to our servers due to an error which
        usually occurs when network connection is lost.
      </Text>
      <Group position="center">
        <Button onClick={handleRetryClick} variant="subtle" size="md">
          Retry
        </Button>
      </Group>
    </Container>
  );
}
