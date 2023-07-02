import { Timeline, Text } from "@mantine/core";
import {
  Icon3dCubeSphere,
} from "@tabler/icons-react";
interface dataProps {
  data: {
    title: string;
    startedAt: any;
    description: string;
    status: boolean;
    _id: string;
    approved: boolean;
  }[],
  serviceId: string;
  setInfo: any
}

export function ServiceStatusTimeline({ data, serviceId, setInfo }: dataProps) {

  let completedServices = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].status === true) {
      completedServices++;
    }
  }
  const items = data
  .filter(item => item.approved !== false) // Filter out items with 'approved' set to false
  .map((item, index) => {
    return (
      <Timeline.Item
        bullet={<Icon3dCubeSphere size={12} />}
        title={`${item.title}`}
        pt={2}
      >
        <Text color="dimmed" size="sm">
          {item.description}
        </Text>
        <Text size="xs" mt={4}>
          {item.startedAt === null ? <></> : `${item.startedAt.split("T")[0]}`}
          <br></br>
        </Text>
      </Timeline.Item>
    );
  });

  return (
    <Timeline active={completedServices - 1} bulletSize={24} lineWidth={4}>
      {items}
    </Timeline>
  );
}
