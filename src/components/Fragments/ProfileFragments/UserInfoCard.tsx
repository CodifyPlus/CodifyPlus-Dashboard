import { Avatar, Text, Paper, Group } from '@mantine/core';

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
      <Group>
          <Avatar src={avatar} radius="xl" />
  
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              {name}
            </Text>
  
            <Text color="dimmed" size="xs">
              {email}
            </Text>
          </div>
  
        </Group>

      {/* <Button variant="default" fullWidth mt="md">
        Send message
      </Button> */}
    </Paper>
  );
}