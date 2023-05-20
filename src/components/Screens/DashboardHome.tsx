import { Grid, Skeleton, Container } from "@mantine/core";
import { ServiceStats } from "../Fragments/DashboardHomeFragments/ServiceStats";
import { ServicesList } from "../Fragments/DashboardHomeFragments/ServicesList";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";

const child = <Skeleton height={140} radius="md" animate={false} />;

export default function DashboardHome() {

  const [content, setContent] = useState({
    completedServices: [],
    pendingServices: [],
    processServices: [],
  });

  useEffect(() => {
    UserService.getUserStats().then(
      (response) => {
        setContent(response.data);
        console.log("Content", content);
        console.log("Response", response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  const data = [
    {
      title: "Completed Services",
      value: content.completedServices.length,
      diff: 100,
    },
    {
      title: "Under Process Services",
      value: content.processServices.length,
      diff: 100,
    },
    {
      title: "Pending Services",
      value: content.pendingServices.length,
      diff: 100,
    },
  ];

  return (
    <Container my="md">
      <Grid>
        <Grid.Col xs={12}>
          <ServiceStats
            data={data}
          />
        </Grid.Col>
        <Grid.Col xs={6}><ServicesList data={[
    {
      "position": 6,
      "mass": 12.011,
      "symbol": "C",
      "name": "Carbon"
    },
    {
      "position": 7,
      "mass": 14.007,
      "symbol": "N",
      "name": "Nitrogen"
    },
    {
      "position": 39,
      "mass": 88.906,
      "symbol": "Y",
      "name": "Yttrium"
    },
    {
      "position": 56,
      "mass": 137.33,
      "symbol": "Ba",
      "name": "Barium"
    },
    {
      "position": 58,
      "mass": 140.12,
      "symbol": "Ce",
      "name": "Cerium"
    }
  ]} /></Grid.Col>
        <Grid.Col xs={6}><ServicesList data={[
    {
      "position": 6,
      "mass": 12.011,
      "symbol": "Ca",
      "name": "Carbon"
    },
    {
      "position": 7,
      "mass": 14.007,
      "symbol": "Na",
      "name": "Nitrogen"
    },
    {
      "position": 39,
      "mass": 88.906,
      "symbol": "Ya",
      "name": "Yttrium"
    },
    {
      "position": 56,
      "mass": 137.33,
      "symbol": "Baa",
      "name": "Barium"
    },
    {
      "position": 58,
      "mass": 140.12,
      "symbol": "Cea",
      "name": "Cerium"
    }
  ]} /></Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={4}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
        <Grid.Col xs={6}>{child}</Grid.Col>
      </Grid>
    </Container>
  );
}
