import {
  createStyles,
  TextInput,
  UnstyledButton,
  Badge,
  rem,
  Grid,
  Paper,
  MediaQuery,
} from "@mantine/core";
import { IconSearch, IconMessage2Bolt } from "@tabler/icons-react";
import ChatRoom from "../Fragments/ChatFragments/ChatRoom";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { useSelector } from "react-redux";

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
  const [isSelected, setIsSelected] = useState<any>(false);
  const { user: currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    const fetchChatBoxes = async () => {
      try {
        let response;

        if (currentUser.role !== "ADMIN") {
          response = await UserService.getSubscribedChatBoxes();
        } else {
          response = await UserService.adminGetSubscribedChatBoxes();
        }

        // Fetch chatBoxes from localStorage
        const storedChatBoxes = JSON.parse(
          localStorage.getItem("chatBoxes") || "[]"
        );

        const updatedChatBoxes = response.data.chatBoxes.map((chatBox) => {
          const storedChatBox = storedChatBoxes.find(
            (storedChatBox) => storedChatBox._id === chatBox._id
          );
          return {
            ...chatBox,
            unreadMessages:
              chatBox.noOfMessages -
              (storedChatBox ? storedChatBox.noOfMessages : 0),
          };
        });
        setChatBoxes(updatedChatBoxes);
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    };

    fetchChatBoxes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const links = chatBoxes.map((chatBox) => {
    return {
      icon: IconMessage2Bolt,
      label: chatBox.serviceName,
      id: chatBox._id,
      assignedFor: chatBox.assignedFor,
      notifications: chatBox.unreadMessages,
    };
  });

  const mainLinks = links.map((link) => {
    const assignedForText =
      currentUser.role !== "USER" ? ` - ${link.assignedFor}` : "";
    return (
      <UnstyledButton
        onClick={() => {
          setSelectedChatBoxId(link.id);
          setIsSelected(true);
        }}
        key={link.label}
        className={classes.mainLink}
      >
        <div className={classes.mainLinkInner}>
          <link.icon size={20} className={classes.mainLinkIcon} stroke={1.5} />
          <span>{`${link.label}${assignedForText}`}</span>
        </div>
        {link.notifications > 0 && (
          <Badge size="sm" variant="filled" className={classes.mainLinkBadge}>
            {link.notifications}
          </Badge>
        )}
      </UnstyledButton>
    );
  });

  return (
    <>
      <Grid>
        <Grid.Col xs={4}>
          {
            <>
              {isSelected ? (
                <MediaQuery smallerThan="md" styles={{ display: "none" }}>
                  <Paper p="md" shadow="sm" withBorder>
                    <TextInput
                      placeholder="Search"
                      size="xs"
                      icon={<IconSearch size="0.8rem" stroke={1.5} />}
                      rightSectionWidth={70}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      mb="sm"
                    />
                    <div className={classes.mainLinks}>{mainLinks}</div>
                  </Paper>
                </MediaQuery>
              ) : (
                <>
                  <Paper p="md" shadow="sm" withBorder>
                    <TextInput
                      placeholder="Search"
                      size="xs"
                      icon={<IconSearch size="0.8rem" stroke={1.5} />}
                      rightSectionWidth={70}
                      styles={{ rightSection: { pointerEvents: "none" } }}
                      mb="sm"
                    />
                    <div className={classes.mainLinks}>{mainLinks}</div>
                  </Paper>
                </>
              )}
            </>
          }
        </Grid.Col>
        <Grid.Col xs={8}>
          {
            <ChatRoom
              isSelected={isSelected}
              setIsSelected={setIsSelected}
              chatBoxId={selectedChatBoxId}
            />
          }
        </Grid.Col>
      </Grid>
    </>
  );
}
