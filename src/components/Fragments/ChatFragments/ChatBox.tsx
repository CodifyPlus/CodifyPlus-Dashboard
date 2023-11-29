import { ActionIcon, Group, Stack, TextInput } from "@mantine/core";
import { getHotkeyHandler } from "@mantine/hooks";
import { IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import UserService from "../../../services/user.service";
import { notifications } from "@mantine/notifications";

const ChatBox = (props: any) => {
  const [value, setValue] = useState("");
  const [canSendMessage, setCanSendMessage] = useState(true);
  const [timeoutId, setTimeoutId] = useState<any>(undefined);

  const sendMessage = async () => {
    if (!canSendMessage) {
      notifications.show({
        message: "You can only send one message every 5 seconds",
        autoClose: 5000,
      });
      return;
    }

    setCanSendMessage(false);

    UserService.sendMessage({
      chatBoxId: props.chatBoxId,
      content: value,
    }).then(
      (response) => {
        setValue("");
        props.setChatBox(response.data);

        // Allow sending messages again after 5 seconds
        const id = setTimeout(() => {
          setCanSendMessage(true);
        }, 5000);
        setTimeoutId(id);
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
        setCanSendMessage(true);
      }
    );
  };

  useEffect(() => {
    // Clean up the timer on component unmount
    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <>
      <Stack sx={{ height: "8vh" }} justify="center" p={0}>
        <Group position="right" p="xs">
          <TextInput
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            sx={{ flexGrow: 1 }}
            placeholder="Say something nice . . . "
            onKeyDown={
              !/\S/.test(value)
                ? undefined
                : value.length < 2
                ? undefined
                : getHotkeyHandler([["Enter", sendMessage]])
            }
          />
          <ActionIcon
            onClick={() => sendMessage()}
            variant="hover"
            size="lg"
            disabled={
              !/\S/.test(value) ? true : value.length < 2 ? true : false
            }
          >
            <IconSend />
          </ActionIcon>
        </Group>
      </Stack>
    </>
  );
};

export default ChatBox;
