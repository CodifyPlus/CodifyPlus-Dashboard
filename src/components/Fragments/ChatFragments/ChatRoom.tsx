import { ActionIcon, Group, Paper, ScrollArea, Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import ChatBox from "./ChatBox";
import ChatMessage from "./ChatMessage";
import { IconChevronDown } from "@tabler/icons-react";
import UserService from "../../../services/user.service";

const ChatRoom = ({ chatBoxId }) => {
  const [chatBox, setChatBox] = useState<any>({
    messages: [],
  });

  useEffect(() => {
    // Function to fetch chat box messages
    const fetchChatBoxMessages = async () => {
      try {
        if (chatBoxId !== null) {
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
  }, [chatBoxId]);

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
  return (
    <>
      <Stack sx={{ height: "70vh" }} p={0}>
        <ScrollArea p="xs" scrollbarSize={1} sx={{ height: "84vh" }}>
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
    </>
  );
};
export default ChatRoom;
