import {
  ActionIcon,
  Button,
  Center,
  CopyButton,
  Input,
  Tooltip,
} from "@mantine/core";
import {
  IconAt,
  IconCheck,
  IconCopy,
  IconPassword,
  IconUser,
} from "@tabler/icons-react";
import React from "react";
import { Link } from "react-router-dom";

interface newUserDataProps {
  data: {
    email: string;
    password: string;
    username: string;
  };
}

function UserDetailsModal({ data }: newUserDataProps) {
  return (
    <>
      <Input
        icon={<IconAt />}
        variant="filled"
        placeholder="Your email"
        disabled
        value={data.email}
        rightSection={
          <CopyButton value={data.email} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        }
        mb={5}
      />
      <Input
        icon={<IconUser />}
        variant="filled"
        placeholder="Your email"
        disabled
        value={data.username}
        rightSection={
          <CopyButton value={data.username} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        }
        mb={5}
      />
      <Input
        icon={<IconPassword />}
        variant="filled"
        placeholder="Your email"
        disabled
        value={data.password}
        rightSection={
          <CopyButton value={data.password} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? (
                    <IconCheck size="1rem" />
                  ) : (
                    <IconCopy size="1rem" />
                  )}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        }
        mb={5}
      />
      <Center>
        <Button
          component={Link}
          mt={5}
          to={`/dashboard/adduser/`}
          variant="outline"
          color="yellow"
          onClick={() => window.location.reload()}
        >
          Add Another User
        </Button>
      </Center>
    </>
  );
}

export default UserDetailsModal;
