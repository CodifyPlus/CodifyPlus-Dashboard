import { Container, Grid, Text, createStyles } from "@mantine/core";
import TotalRevenueByServiceGraph from "../../Fragments/AnalyticsFragments/TotalRevenueByServiceGraph";
import { useViewportSize } from "@mantine/hooks";
import ServicesSoldData from "../../Fragments/AnalyticsFragments/ServicesSoldData";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },
}));

export default function Analytics() {
  const { height } = useViewportSize();
  const { classes } = useStyles();
  return (
    <Container size="auto" my="md">
      <Grid>
        <Grid.Col style={{ height: `${height / 2}px` }} xs={6}>
          <Text mb={20} align="center" size={20} className={classes.title}>
            Revenue by Service
          </Text>
          <TotalRevenueByServiceGraph />
        </Grid.Col>
        <Grid.Col style={{ height: `${height / 2}px` }} xs={6}>
          <Text mb={20} align="center" size={20} className={classes.title}>
            Services Sold
          </Text>
          <ServicesSoldData />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
