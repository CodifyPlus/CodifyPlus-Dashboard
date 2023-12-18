import { Timeline, Text, ActionIcon, Group, Modal } from "@mantine/core";
import {
  Icon3dCubeSphere,
  IconCheck,
  IconMapPinCheck,
  IconPencil,
} from "@tabler/icons-react";
import UserService from "../../../services/user.service";
import { EditTrackPointFragment } from "./EditTrackPointFragment";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { notifications } from "@mantine/notifications";

interface dataProps {
  data: {
    title: string;
    startedAt: any;
    description: string;
    status: boolean;
    _id: string;
    approved: boolean;
  }[];
  serviceId: string;
  setInfo: any;
  timelineDatesIsVisible: boolean;
}

export function ServiceStatusTimelineTrack({
  data,
  serviceId,
  setInfo,
  timelineDatesIsVisible,
}: dataProps) {
  const [
    opened_editTrackPoint,
    { open: open_editTrackPoint, close: close_editTrackPoint },
  ] = useDisclosure(false);
  const [pointInfo, setPointInfo] = useState<any>({
    title: "",
    description: "",
    startedAt: "",
  });

  const handleRegister = (id: string) => {
    const objToPost = {
      pathwayId: id,
      serviceId: serviceId,
    };
    UserService.editTrackStatus(objToPost).then(
      (response) => {
        setInfo(response.data);
      },
      (error) => {
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        }
      }
    );
  };

  const handleApprove = (id: string) => {
    const objToPost = {
      pathwayId: id,
      serviceId: serviceId,
    };
    UserService.approveTrack(objToPost).then(
      (response) => {
        setInfo(response.data);
      },
      (error) => {
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
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
        {item.startedAt === null ||
        item.startedAt === undefined ||
        !timelineDatesIsVisible ? (
          <></>
        ) : (
          <Text size="xs" mt={4}>
            {item.startedAt.split("T")[0]}
            <br></br>
          </Text>
        )}
        <Text size="xs" mt={4}>
          Approved:{" "}
          {item.approved === undefined
            ? `Yes`
            : item.approved === true
            ? "Yes"
            : "No"}
          <br></br>
        </Text>
        <Group>
          <ActionIcon
            mt={8}
            variant="light"
            color="yellow"
            title="Mark as completed"
            onClick={() => {
              handleRegister(item._id);
            }}
          >
            <IconMapPinCheck size="1.1rem" />
          </ActionIcon>
          <ActionIcon
            mt={8}
            variant="light"
            color="yellow"
            title="Approve Track Point"
            onClick={() => {
              handleApprove(item._id);
            }}
          >
            <IconCheck size="1.1rem" />
          </ActionIcon>
          <ActionIcon
            mt={8}
            variant="light"
            color="yellow"
            title="Edit Track Point"
            onClick={() => {
              open_editTrackPoint();
              setPointInfo(item);
            }}
          >
            <IconPencil size="1.1rem" />
          </ActionIcon>
        </Group>
      </Timeline.Item>
    );
  });

  return (
    <>
      <Modal
        opened={opened_editTrackPoint}
        fullScreen
        onClose={close_editTrackPoint}
        title=""
        centered
      >
        <EditTrackPointFragment
          title={pointInfo.title}
          description={pointInfo.description}
          setInfo={setInfo}
          serviceId={serviceId}
          pathwayId={pointInfo._id}
          closeModal={close_editTrackPoint}
        />
      </Modal>
      <Timeline active={completedServices - 1} bulletSize={24} lineWidth={4}>
        {items}
      </Timeline>
    </>
  );
}
