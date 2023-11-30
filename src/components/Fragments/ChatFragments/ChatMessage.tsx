import {
  Alert,
  Avatar,
  Collapse,
  Group,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ChatMessage = (props: any) => {
  const { content, senderName, timestamp } = props.message;

  const { user: currentUser } = useSelector((state: any) => state.auth);
  let label =
    senderName === currentUser.username
      ? "You"
      : currentUser.role === "USER"
      ? "StartupKro Team"
      : senderName;
  const message = senderName === currentUser.username ? "right" : "left";
  let color;
  const [msgDate, setMsgDate] = useState("");
  dayjs.extend(calendar);

  useEffect(() => {
    if (timestamp != null) {
      conditions();
    } else {
      setMsgDate("Just now");
    }
    // eslint-disable-next-line
  }, []);
  function conditions() {
    dayjs.locale("en");
    const messageTime = dayjs(timestamp);

    if (dayjs().diff(messageTime, "h") > 48) {
      setMsgDate(messageTime.format("MMMM D, YYYY h:mm A"));
    } else {
      setMsgDate(
        messageTime.calendar(null, {
          sameDay: "[Today] h:mm A",
          lastDay: "[Yesterday] h:mm A",
          lastWeek: "dddd h:mm A",
          sameElse: "MMMM D, YYYY h:mm A",
        })
      );
    }
  }

  if (senderName === "bot") {
    color = "teal";
  } else {
    if (message === "right") {
      color = "yellow";
    }
    if (message === "left") {
      color = "indigo";
    }
  }

  const [opened, setOpen] = useState(false);

  return (
    <>
      <Group position={message} align="flex-end" noWrap>
        <Stack p={0} spacing={2} sx={{ maxWidth: "80%" }} align="flex-end">
          <Group position={message} align="flex-end" spacing="xs">
            <Tooltip label={label} position="right">
              <Avatar
                src={
                  label === "StartupKro Team"
                    ? "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhkMwzKE2pXJH7csIVcROTCuU0sDgts8mWIkPI4oSl5XaZ9exQJSYiJflgVa2a0uDW1vIqMkxND4xwvjRvtaUiqCCslMhP2JkwqiLZd_kX5VdwOXsl_93tmSVTKn0VCh761MOYMWpQTFvmdFZbBXFI4ILebPaGKu4795kMnmwwcrztO-Zif1n8OBffZQLuk/s1600/WhatsApp%20Image%202023-03-18%20at%208.11.02%20PM.jpeg"
                    : `https://api.dicebear.com/7.x/miniavs/svg?seed=${label}`
                }
                radius="xl"
                hidden={message === "right" ? true : false}
              />
            </Tooltip>

            <Stack p={0} spacing={0} m={0}>
              <Group position={message} spacing={3} align="center" noWrap>
                <Alert
                  sx={{}}
                  color={color}
                  radius="lg"
                  py={8}
                  variant={"light"}
                  onClick={() => {
                    setOpen((o) => !o);
                  }}
                >
                  {content}
                </Alert>
              </Group>
            </Stack>
          </Group>
          <Collapse in={opened} px="xs">
            {
              <Text size="xs" align={message} color="dimmed">
                {msgDate}
              </Text>
            }
          </Collapse>
        </Stack>
      </Group>
    </>
  );
};

export default ChatMessage;
