import { Grid, Skeleton, Container, Text, Paper } from "@mantine/core";
import { ServiceStats } from "../Fragments/DashboardHomeFragments/ServiceStats";
import { ServicesList } from "../Fragments/DashboardHomeFragments/ServicesList";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

const child = <Skeleton height={140} radius="md" animate={false} />;

export default function DashboardHome() {
  const [Stats, setStats] = useState({
    completedServices: [
      {
        name: "",
        icon: "",
        status: "",
        serviceId: "",
      },
    ],
    pendingServices: [],
    processServices: [
      {
        name: "",
        icon: "",
        status: "",
        serviceId: "",
      },
    ],
  });

  useEffect(() => {
    UserService.getUserStats().then(
      (response) => {
        //setStats(response.data);
        //console.log("Stats", Stats);
        //console.log("Response", response.data);
        let completedServicesData = [];
        let underProcessServicesData = [];
        for (var i = 0; i < response.data.completedServices.length; i++) {
          completedServicesData.push({
            name: response.data.completedServices[i].name,
            icon: "C",
            status: "Completed",
            serviceId: response.data.completedServices[i].serviceId.toString(),
          });
        }

        for (var j = 0; j < (response.data.processServices.length); j++) {
          underProcessServicesData.push({
            name: response.data.processServices[j].name,
            icon: "P",
            status: "Under Process",
            serviceId: response.data.completedServices[j].serviceId.toString(),
          });
        }
        setStats({
          ...response.data,
          completedServices: completedServicesData,
          processServices: underProcessServicesData,
        });
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

        setStats(_Stats);

        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    {
      title: "Completed Services",
      value: Stats.completedServices[0].name === "" ? 0 : Stats.completedServices.length,
      diff: 100,
    },
    {
      title: "Under Process Services",
      value: Stats.processServices[0].name === "" ? 0 : Stats.processServices.length,
      diff: 100,
    },
    {
      title: "Pending Services",
      value: Stats.pendingServices.length,
      diff: 100,
    },
  ];

  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={12}>
          <ServiceStats data={data} />
        </Grid.Col>
        <Grid.Col xs={12}>
          <Paper shadow="md" p={20} withBorder>
            <Text mb={10} ml={10}>
              Under Process Services:
            </Text>
            <ServicesList data={Stats.processServices} />
          </Paper>
        </Grid.Col>
        <Grid.Col xs={12}>
          <Paper shadow="md" p={20} withBorder>
            <Text mb={10} ml={10}>
              Completed Services:
            </Text>
            <ServicesList data={Stats.completedServices} />
          </Paper>
        </Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}
