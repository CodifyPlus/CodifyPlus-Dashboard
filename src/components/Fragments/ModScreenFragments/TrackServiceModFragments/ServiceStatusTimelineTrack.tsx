import { Timeline, Text, ActionIcon } from "@mantine/core";
import {
  Icon3dCubeSphere,
  IconMapPinCheck,
} from "@tabler/icons-react";
import UserService from "../../../../services/user.service";

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

export function ServiceStatusTimelineTrackMod({ data, serviceId, setInfo }: dataProps) {

    const handleRegister = (id: string) => {
        const objToPost = {
            pathwayId: id,
            serviceId: serviceId,
        }
        UserService.editTrackStatusMod(objToPost).then(
          (response) => {
            setInfo(response.data);
            
          },
          (error) => {
            if (error.response && error.response.status === 401) {
              //@ts-ignore
              EventBus.dispatch("logout");
            }
          }
        );
      };
    

  let completedServices = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].status === true) {
      completedServices++;
    }
  }
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
        <Text size="xs" mt={4}>
          {item.startedAt === null ? <></> : `${item.startedAt.split("T")[0]}`}
          <br></br>
        </Text>
        <Text size="xs" mt={4}>
          Approved:{" "}
          {item.approved === undefined
            ? `Yes`
            : item.approved === true
            ? "Yes"
            : "No"}
          <br></br>
        </Text>
        <ActionIcon
          mt={8}
          variant="outline"
          color="yellow"
          title="Mark as completed"
          onClick={() => {handleRegister(item._id)}}
        >
          <IconMapPinCheck size="1.1rem" />
        </ActionIcon>
      </Timeline.Item>
    );
  });

  return (
    <Timeline active={completedServices - 1} bulletSize={24} lineWidth={4}>
      {items}
    </Timeline>
  );
}
