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
  Loader,
  Center,
} from "@mantine/core";
import moment from "moment";
import UserService from "../../services/user.service";
import { ServiceStatusInfoTrackService } from "../Fragments/TrackServiceFragments/ServiceStatusInfoTrackService";
import { ServiceStatusTimeline } from "../Fragments/ServiceStatusFragments/ServiceStatusTimeline";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export default function ServiceStatus() {
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

  const serviceId = window.location.pathname.split("/")[3];
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
    .filter((note) => !note.private && note.approved)
    .map((note) => {
      return (
        <Grid.Col span={12} key={note.information}>
          <Paper shadow="sm" p="sm" withBorder>
            <Badge>{note.createdAt.split("T")[0]}</Badge>
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
              <ServiceStatusTimeline
                data={info.pathway}
                serviceId={serviceId}
                setInfo={setInfo}
              />
              <Grid gutter="md">
                <Grid.Col>
                  <ServiceStatusInfoTrackService data={serviceInfoData} />
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
