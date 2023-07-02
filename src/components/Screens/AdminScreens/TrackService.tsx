import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  SimpleGrid,
  Title,
  Text,
  Paper,
  Badge,
  createStyles,
  Card,
  Modal,
  Loader,
  Center,
  ActionIcon,
  Group,
} from "@mantine/core";
import moment from "moment";
import UserService from "../../../services/user.service";
import { ServiceStatusInfoTrackService } from "../../Fragments/TrackServiceFragments/ServiceStatusInfoTrackService";
import { ServiceControlsFragment } from "../../Fragments/TrackServiceFragments/ServiceControlsFragment";
import { useDisclosure } from "@mantine/hooks";
import { AddNoteFragment } from "../../Fragments/TrackServiceFragments/AddNoteFragment";
import { AddTrackPointFragment } from "../../Fragments/TrackServiceFragments/AddTrackPointFragment";
import { ServiceStatusTimelineTrack } from "../../Fragments/TrackServiceFragments/ServiceStatusTimelineTrack";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { IconCheck } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export function TrackService() {
  const [opened_addNote, { open: open_addNote, close: close_addNote }] =
    useDisclosure(false);

  const [opened_addTrack, { open: open_addTrack, close: close_addTrack }] =
    useDisclosure(false);

  const { classes } = useStyles();

  const [info, setInfo] = useState({
    cost: "",
    status: "",
    name: "",
    duration: "",
    notes: [
      {
        information: "",
        private: false,
        createdAt: "",
        approved: false,
        _id: "",
      },
    ],
    assignedTo: {
      userId: "",
      username: "",
      email: "",
    },
    assignedFor: {
      userId: "",
      username: "",
      email: "",
    },
    pathway: [
      {
        startedAt: moment().utcOffset("+5:30").format("DD/MM/YYYY"),
        description: "",
        title: "",
        status: true,
        _id: "",
        approved: false,
      },
    ],
  });

  const serviceId = window.location.pathname.split("/")[3];
  const [isLoading, setIsLoading] = useState(true);

  const handleApprove = (id: string) => {
    const objToPost = {
      noteId: id,
      serviceId: serviceId,
    };
    UserService.approveNote(objToPost).then(
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

  useEffect(() => {
    UserService.getServiceInfo(serviceId).then(
      (response) => {
        setInfo(response.data);
        setIsLoading(false);
      },
      (error) => {
        const _Stats =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setInfo(_Stats);

        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const serviceInfoData = {
    cost: info.cost,
    status: info.status,
    name: info.name,
    duration: info.duration,
    assignedTo: info.assignedTo,
    assignedFor: info.assignedFor,
  };

  const Notes = info.notes.map((note) => {
    return (
      <Grid.Col span={12}>
        <Paper shadow="sm" p="sm" withBorder>
          <Group spacing="xs">
            <Badge>{note.createdAt.split("T")[0]}</Badge>

            <Badge>
              Approved:{" "}
              {note.approved === undefined
                ? "Yes"
                : note.approved === true
                ? "Yes"
                : "No"}
            </Badge>
            <ActionIcon
            style={{ marginLeft: "auto" }}
            mt={8}
            size={"xs"}
            variant="outline"
            color="yellow"
            title="Approve Note"
            onClick={() => {
              handleApprove(note._id);
            }}
          >
            <IconCheck size="0.7rem" />
          </ActionIcon>
          </Group>
          <Text mt={5}>{note.information}</Text>
        </Paper>
      </Grid.Col>
    );
  });

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoading ? ( // Conditional rendering based on the loading status
        <Center>
          <Loader />
        </Center>
      ) : (
        <>
          <Modal
            opened={opened_addNote}
            onClose={close_addNote}
            title="Add Note"
            centered
          >
            <AddNoteFragment
              data={{ serviceId, closeModal: close_addNote, setInfo }}
            />
          </Modal>
          <Modal
            opened={opened_addTrack}
            onClose={close_addTrack}
            title=""
            fullScreen
            centered
          >
            <AddTrackPointFragment
              data={{ serviceId, closeModal: close_addTrack, setInfo }}
            />
          </Modal>
          <Title
            mb={30}
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Track Service
          </Title>
          <Container>
            <SimpleGrid
              cols={2}
              spacing="md"
              mb="md"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <ServiceStatusTimelineTrack
                data={info.pathway}
                serviceId={serviceId}
                setInfo={setInfo}
              />
              <Grid gutter="md">
                <Grid.Col>
                  <ServiceStatusInfoTrackService data={serviceInfoData} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <ServiceControlsFragment
                    data={{
                      openModalAddNote: open_addNote,
                      openModalAddTrack: open_addTrack,
                      setInfo,
                      serviceId: serviceId,
                    }}
                  />
                </Grid.Col>
              </Grid>
            </SimpleGrid>
            <Card withBorder radius="md" className={classes.card}>
              <Grid gutter="md" className={classes.card}>
                <Grid.Col span={12}>
                  <Text>Notes</Text>
                </Grid.Col>
                {Notes.length === 0 ? <>No Notes Found!</> : Notes}
              </Grid>
            </Card>
          </Container>
        </>
      )}
    </>
  );
}
