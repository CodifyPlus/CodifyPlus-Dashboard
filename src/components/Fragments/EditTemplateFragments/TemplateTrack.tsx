import { Timeline, Text } from "@mantine/core";
import { Icon3dCubeSphere } from "@tabler/icons-react";

interface dataProps {
  data: {
    title: string;
    description: string;
    _id: string;
  }[];
}

export function TemplateTrack({ data }: dataProps) {
  const items = data.map((item, index) => {
    return (
      <Timeline.Item
        bullet={<Icon3dCubeSphere size={12} />}
        title={`${item.title}`}
        pt={2}
      >
        <Text color="dimmed" size="sm">
          {item.description}
        </Text>
      </Timeline.Item>
    );
  });

  return (
    <>
      <Timeline active={-1} bulletSize={24} lineWidth={4}>
        {items}
      </Timeline>
    </>
  );
}
