import React, { useEffect, useState } from "react";
import { ServiceStatusHeading } from "../Fragments/ServiceStatusFragments/ServiceStatusHeading";
import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { ServiceStatusTimeline } from "../Fragments/ServiceStatusFragments/ServiceStatusTimeline";
import moment from 'moment';
import ServiceStatusInfo from "../Fragments/ServiceStatusFragments/ServiceStatusInfo";
import UserService from "../../services/user.service";
const PRIMARY_COL_HEIGHT = rem(300);

const timelineData = [
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: true,
    description: "GST Service Initiated",
    title: "Service Initiated",
    status: true
  },
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: false,
    description: "Documents Were Sent to the Gov. Agency",
    title: "Documents Sent",
    status: true,
  },
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: false,
    description: "Papers were submitted to Gov.",
    title: "Papers Submitted",
    status: false,
  },
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: true,
    description: "Service has been completed.",
    title: "Service Completed",
    status: false,
  }
];

const serviceInfoData = {
  cost: "2000",
  status: "Under Process",
  name: "GST Registration",
  duration: "2 Months",
  assignedTo: {
    username: "coinshell",
    email: "coinshell@gmail.com"
  },
  assignedFor: {
    username: "ipshita",
    email: "ipshita@gmail.com"
  },
};

function ServiceStatus() {

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
    pathway: [{
      startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
      notification: true,
      description: "",
      title: "",
      status: true,
  }]
  });

  const serviceId = window.location.pathname.split("/")[3];
  //console.log(serviceId);

  useEffect(() => {
    UserService.getServiceInfo(serviceId).then(
      (response) => {
        //setStats(response.data);
        //console.log("Stats", Stats);
        console.log("Response", response.data);
        
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
  
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  return (
    <>
      <ServiceStatusHeading />
      <Container>
        <SimpleGrid
          cols={2}
          spacing="md"
          breakpoints={[{ maxWidth: "sm", cols: 1 }]}
        >
          <ServiceStatusTimeline data={timelineData} />
          <Grid gutter="md">
            <Grid.Col>
              <ServiceStatusInfo data={serviceInfoData} />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Skeleton
                height={SECONDARY_COL_HEIGHT}
                radius="md"
                animate={false}
              />
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default ServiceStatus;
