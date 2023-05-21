import React from "react";
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
const PRIMARY_COL_HEIGHT = rem(300);

const timelineData = [
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    completedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: true,
    description: "GST Service Initiated",
    title: "Service Initiated"
  },
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    completedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: false,
    description: "Documents Were Sent to the Gov. Agency",
    title: "Documents Sent"
  },
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    completedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: false,
    description: "Papers were submitted to Gov.",
    title: "Papers Submitted"
  },
  {
    startedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    completedAt: moment().utcOffset('+5:30').format('DD/MM/YYYY'),
    notification: true,
    description: "Service has been completed.",
    title: "Service Completed"
  }
];

function ServiceStatus() {
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
