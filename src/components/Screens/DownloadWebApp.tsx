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

export default function DownloadWebApp() {
  const { classes } = useStyles();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const emoticons = ["😊", "😄", "😁"];
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [currentEmoticon, setCurrentEmoticon] = useState(emoticons[0]);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }

        setDeferredPrompt(null);
      });
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    const intervalId = setInterval(() => {
      const nextIndex =
        (emoticons.indexOf(currentEmoticon) + 1) % emoticons.length;
      setCurrentEmoticon(emoticons[nextIndex]);
    }, 500);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      clearInterval(intervalId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEmoticon, emoticons]);

  return (
    <Container className={classes.root}>
      <div className={classes.label}>{currentEmoticon}</div>
      <Title className={classes.title}>Thanks for downloading our app!</Title>
      <Text
        color="dimmed"
        size="lg"
        align="center"
        className={classes.description}
      >
        Please click on the Install Button below to Install our App. If this
        doesn't work, please try using a Chrome based browser.
      </Text>
      <Group position="center">
        <Button onClick={handleInstallClick} variant="subtle" size="md">
          Install
        </Button>
      </Group>
    </Container>
  );
}
