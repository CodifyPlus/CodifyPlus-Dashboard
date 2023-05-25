import { Avatar, Text, Paper } from '@mantine/core';

interface UserInfoActionProps {
  avatar: string;
  name: string;
  email: string;
}

export function UserInfoCard({ avatar, name, email }: UserInfoActionProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text ta="center" c="dimmed" fz="sm">
        {email}
      </Text>

      {/* <Button variant="default" fullWidth mt="md">
        Send message
      </Button> */}
    </Paper>
  );
}