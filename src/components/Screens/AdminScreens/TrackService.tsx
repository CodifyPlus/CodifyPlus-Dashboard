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
} from "@mantine/core";
import { ServiceStatusTimeline } from "../../Fragments/ServiceStatusFragments/ServiceStatusTimeline";
import moment from "moment";
import UserService from "../../../services/user.service";
import { ServiceStatusInfoTrackService } from "../../Fragments/TrackServiceFragments/ServiceStatusInfoTrackService";
import { ServiceControlsFragment } from "../../Fragments/TrackServiceFragments/ServiceControlsFragment";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export function TrackService() {

  const { classes } = useStyles();

  const [info, setInfo] = useState({
    cost: "",
    status: "",
    name: "",
    duration: "",
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
        notification: true,
        description: "",
        title: "",
        status: true,
        index: 0,
      },
    ],
  });

  const serviceId = window.location.pathname.split("/")[3];
  //console.log(serviceId);

  useEffect(() => {
    UserService.getServiceInfo(serviceId).then(
      (response) => {
        //setStats(response.data);
        //console.log("Stats", Stats);
        console.log("Response", response.data);
        setInfo(response.data);
        //console.log("Stats", Stats);
        //console.log("Response", response.data);
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

  return (
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
          <ServiceStatusTimeline data={info.pathway} />
          <Grid gutter="md">
            <Grid.Col>
              <ServiceStatusInfoTrackService data={serviceInfoData} />
            </Grid.Col>
            <Grid.Col span={12}>
              <ServiceControlsFragment />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
        <Card withBorder radius="md" className={classes.card}>
          <Grid gutter="md" className={classes.card}>
            <Grid.Col span={12}>
              <Text>Notes</Text>
            </Grid.Col>
            <Grid.Col span={12}>
              <Paper shadow="sm" p="sm" withBorder>
                <Badge>12 days left</Badge>
                <Text mt={5}>
                  h for the keywords to learn more about each warning. To
                  ignore, add // eslint-disable-next-line to the line before.
                  WARNING in [eslint] src\components\Screens Line 65:10:{" "}
                </Text>
              </Paper>
            </Grid.Col>
          </Grid>
        </Card>
      </Container>
    </>
  );
}
