import { Group, Paper, Text, ThemeIcon, SimpleGrid } from "@mantine/core";
import { IconActivity } from "@tabler/icons-react";

interface StatsGridIconsProps {
  data: { title: string; value: number; diff: number }[];
}

export function ServiceStats({ data }: StatsGridIconsProps) {
  const stats = data.map((stat) => {

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} shadow="md">
        <Group position="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
              {stat.title}
            </Text>
            <Text fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color: stat.diff > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <IconActivity size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        {/* <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
            {stat.diff}%
          </Text>{' '}
          {stat.diff > 50 ? 'increase' : 'decrease'} completed s
        </Text> */}
      </Paper>
    );
  });

  return (
    <div>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}
