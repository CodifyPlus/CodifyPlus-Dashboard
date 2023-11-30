import { Text, Center, Stack, Paper } from "@mantine/core";
import { IconMessage2 } from "@tabler/icons-react";
import React from "react";

function ChatUnselected() {
  return (
    <Center>
      <Stack sx={{ position: "absolute", top: "40%" }}>
        <Paper maw="500px" m="md" shadow="xs" p="md">
          <Center>
            <IconMessage2 size="50px" />
          </Center>
          <Center>
            <Text size="lg">Please select a chat to get started.</Text>
          </Center>
          <Text ta="center" c="dimmed" size="xs">
            <Center>
              Please note that all chats are being monitored to maintain a safe
              and inclusive environment.
            </Center>
          </Text>
        </Paper>
      </Stack>
    </Center>
  );
}

export default ChatUnselected;
