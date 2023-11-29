import {
  createStyles,
  TextInput,
  UnstyledButton,
  Badge,
  rem,
  Grid,
} from "@mantine/core";
import { IconSearch, IconMessage2Bolt } from "@tabler/icons-react";
import ChatRoom from "../Fragments/ChatFragments/ChatRoom";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";

const useStyles = createStyles((theme) => ({
  navbar: {
    paddingTop: 0,
  },

  section: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    marginBottom: theme.spacing.md,

    "&:not(:last-of-type)": {
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
    },
  },

  searchCode: {
    fontWeight: 700,
    fontSize: rem(10),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2]
    }`,
  },

  mainLinks: {
    paddingLeft: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingRight: `calc(${theme.spacing.md} - ${theme.spacing.xs})`,
    paddingBottom: theme.spacing.md,
  },

  mainLink: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    fontSize: theme.fontSizes.xs,
    padding: `${rem(8)} ${theme.spacing.xs}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  mainLinkInner: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },

  mainLinkIcon: {
    marginRight: theme.spacing.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },

  mainLinkBadge: {
    padding: 0,
    width: rem(20),
    height: rem(20),
    pointerEvents: "none",
  },

  collections: {
    paddingLeft: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingRight: `calc(${theme.spacing.md} - ${rem(6)})`,
    paddingBottom: theme.spacing.md,
  },

  collectionsHeader: {
    paddingLeft: `calc(${theme.spacing.md} + ${rem(2)})`,
    paddingRight: theme.spacing.md,
    marginBottom: rem(5),
  },

  collectionLink: {
    display: "block",
    padding: `${rem(8)} ${theme.spacing.xs}`,
    textDecoration: "none",
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.xs,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    lineHeight: 1,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
}));

export function ChatPage() {
  const { classes } = useStyles();
  const [chatBoxes, setChatBoxes] = useState<any>([]);
  const [selectedChatBoxId, setSelectedChatBoxId] = useState<any>(null);

  useEffect(() => {
    UserService.getSubscribedChatBoxes().then(
      (response) => {
        setChatBoxes(response.data.chatBoxes);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const links = chatBoxes.map((chatBox) => ({
    icon: IconMessage2Bolt,
    label: chatBox.serviceName,
    id: chatBox._id,
    // notifications: 3
  }));

  const mainLinks = links.map((link) => (
    <UnstyledButton
      onClick={() => setSelectedChatBoxId(link.id)}
      key={link.label}
      className={classes.mainLink}
    >
      <div className={classes.mainLinkInner}>
        <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
        <span>{link.label}</span>
      </div>
      {link.notifications && (
        <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
          {link.notifications}
        </Badge>
      )}
    </UnstyledButton>
  ));

  return (
    <>
      <Grid>
        <Grid.Col px={20} xs={4}>
          {
            <>
              <TextInput
                placeholder="Search"
                size="xs"
                icon={<IconSearch size="0.8rem" stroke={1.5} />}
                rightSectionWidth={70}
                styles={{ rightSection: { pointerEvents: "none" } }}
                mb="sm"
              />
              <div className={classes.mainLinks}>{mainLinks}</div>
            </>
          }
        </Grid.Col>
        <Grid.Col px={20} xs={8}>
          {<ChatRoom chatBoxId={selectedChatBoxId} />}
        </Grid.Col>
      </Grid>
    </>
  );
}
