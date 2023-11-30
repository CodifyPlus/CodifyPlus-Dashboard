import {
  ActionIcon,
  Center,
  Group,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import { IconArrowLeft, IconChevronDown } from "@tabler/icons-react";
import UserService from "../../../services/user.service";
import ChatUnselected from "./ChatUnselected";
import { useSelector } from "react-redux";

const ChatRoom = ({ chatBoxId, setIsSelected, isSelected }) => {
  const [chatBox, setChatBox] = useState<any>({
    messages: [],
  });
  const { user: currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    // Function to fetch chat box messages
    const fetchChatBoxMessages = async () => {
      try {
        if (chatBoxId !== null && isSelected === true) {
          const response = await UserService.getChatBox(chatBoxId);
          setChatBox(response.data);
        }
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    };

    // Initial fetch
    fetchChatBoxMessages();

    // Polling every 5 seconds
    const intervalId = setInterval(() => {
      fetchChatBoxMessages();
    }, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatBoxId, isSelected]);

  const dummy = useRef<HTMLDivElement>(null);
  const [id, setId] = useState("");

  function goBot() {
    dummy.current?.scrollIntoView({ behavior: "smooth" });
    setHidden(true);
    setId("");
  }

  const [hidden, setHidden] = useState(true);
  const { ref, inView } = useInView({
    /* Optional options */
    delay: 600,
    threshold: 1,
  });

  if (chatBoxId === null || isSelected === false) {
    return <ChatUnselected />;
  }

  const assignedForText =
    currentUser.role !== "USER" ? ` - ${chatBox.assignedFor}` : "";

  return (
    <>
      <Paper p={4} mb={10}>
        <Group>
          <ActionIcon
          ml={10}
            onClick={() => setIsSelected(false)}
            variant="transparent"
          >
            <IconArrowLeft size="3rem" />
          </ActionIcon>
          <Center>
            <Text size="md">{chatBox.serviceName + assignedForText}</Text>
          </Center>
        </Group>
      </Paper>
      <Paper p="md" shadow="sm" withBorder>
        <Stack sx={{ height: "58vh" }} p={0}>
          <ScrollArea p="xs" scrollbarSize={5} sx={{ height: "84vh" }}>
            <Stack>
              <Group hidden={inView} position="center" pt="xs">
                <Paper
                  shadow="md"
                  radius="xl"
                  withBorder
                  p={0}
                  sx={{ position: "absolute", top: "95%" }}
                >
                  {hidden && inView ? (
                    <></>
                  ) : (
                    <ActionIcon color="violet" radius="xl" onClick={goBot}>
                      <IconChevronDown />
                    </ActionIcon>
                  )}
                </Paper>
              </Group>

              {chatBox.messages.map((msg, id) => {
                return <ChatMessage key={id} message={msg} />;
              })}
            </Stack>
            <div ref={ref}></div>
            <div ref={dummy}></div>
          </ScrollArea>
        </Stack>
        <ChatBox
          fn={goBot}
          id={id}
          chatBoxId={chatBoxId}
          setChatBox={setChatBox}
        />
      </Paper>
    </>
  );
};
export default ChatRoom;
