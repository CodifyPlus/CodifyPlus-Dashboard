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
} from "@mantine/core";
import moment from "moment";
import UserService from "../../../services/user.service";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { AddNoteFragmentMod } from "../../Fragments/ModScreenFragments/TrackServiceModFragments/AddNoteFragment";
import { AddTrackPointFragmentMod } from "../../Fragments/ModScreenFragments/TrackServiceModFragments/AddTrackPointFragment";
import { ServiceStatusTimelineTrackMod } from "../../Fragments/ModScreenFragments/TrackServiceModFragments/ServiceStatusTimelineTrack";
import { ServiceStatusInfoTrackServiceMod } from "../../Fragments/ModScreenFragments/TrackServiceModFragments/ServiceStatusInfoTrackService";
import { ServiceControlsFragmentMod } from "../../Fragments/ModScreenFragments/TrackServiceModFragments/ServiceControlsFragment";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export function TrackServiceMod() {
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

  const serviceId = window.location.pathname.split("/")[4];
  const [isLoading, setIsLoading] = useState(true);

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

  const Notes = info.notes
  .filter((note) => !note.private)
  .map((note) => {
    return (
      <Grid.Col span={12}>
        <Paper shadow="sm" p="sm" withBorder>
          <Badge>{note.createdAt.split("T")[0]}</Badge>
          <Badge ml={10}>
            Approved: {note.approved === undefined
              ? "Yes"
              : note.approved === true
              ? "Yes"
              : "No"}
          </Badge>
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
            <AddNoteFragmentMod
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
            <AddTrackPointFragmentMod
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
              <ServiceStatusTimelineTrackMod
                data={info.pathway}
                serviceId={serviceId}
                setInfo={setInfo}
              />
              <Grid gutter="md">
                <Grid.Col>
                  <ServiceStatusInfoTrackServiceMod data={serviceInfoData} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <ServiceControlsFragmentMod
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
