import { Grid, Container, Text, Paper, Loader, Center } from "@mantine/core";
import { ServiceStats } from "../Fragments/DashboardHomeFragments/ServiceStats";
import { ServicesList } from "../Fragments/DashboardHomeFragments/ServicesList";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { handleLogout } from "../../common/HandleLogout";

export default function DashboardHome() {
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const [Stats, setStats] = useState({
    completedServices: [
      {
        name: "",
        icon: "",
        status: "",
        serviceId: "",
        username: "",
      },
    ],
    onHoldServices: [
      {
        name: "",
        icon: "",
        status: "",
        serviceId: "",
        username: "",
      },
    ],
    processServices: [
      {
        name: "",
        icon: "",
        status: "",
        serviceId: "",
        username: "",
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading status

  useEffect(() => {
    setIsLoading(true);

    const userRole = currentUser.role;

    let apiCall;

    if (userRole === "MODERATOR") {
      apiCall = UserService.getModStats;
    } else if (userRole === "ADMIN") {
      apiCall = UserService.getAdminStats;
    } else {
      apiCall = UserService.getUserStats;
    }

    apiCall()
      .then((response) => {
        // Process the response data
        let completedServicesData: any = [];
        let underProcessServicesData: any = [];
        let onHoldServicesData: any = [];

        for (var i = 0; i < response.data.completedServices.length; i++) {
          completedServicesData.push({
            name: response.data.completedServices[i].name,
            icon: "C",
            status: "Completed",
            serviceId: response.data.completedServices[i].serviceId.toString(),
            username: response.data.completedServices[i].username,
          });
        }

        for (var j = 0; j < response.data.processServices.length; j++) {
          underProcessServicesData.push({
            name: response.data.processServices[j].name,
            icon: "P",
            status: "Under Process",
            serviceId: response.data.processServices[j].serviceId.toString(),
            username: response.data.processServices[j].username,
          });
        }

        for (var k = 0; k < response.data.onHoldServices.length; k++) {
          onHoldServicesData.push({
            name: response.data.onHoldServices[k].name,
            icon: "P",
            status: "On Hold",
            serviceId: response.data.onHoldServices[k].serviceId.toString(),
            username: response.data.onHoldServices[k].username,
          });
        }

        setStats({
          ...response.data,
          completedServices: completedServicesData,
          processServices: underProcessServicesData,
          onHoldServices: onHoldServicesData,
        });
        setIsLoading(false); // Set loading status to false after the data is fetched
      })
      .catch((error) => {
        const _Stats =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setStats(_Stats);

        if (error) {
          handleLogout(navigate);
        }

        setIsLoading(false); // Set loading status to false in case of an error
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    {
      title: "Services Completed",
      value:
        Stats?.completedServices[0]?.name === ""
          ? 0
          : Stats.completedServices.length,
      diff: 100,
    },
    {
      title: "Services Under Process",
      value:
        Stats?.processServices[0]?.name === ""
          ? 0
          : Stats.processServices.length,
      diff: 100,
    },
    {
      title: "Services On Hold",
      value:
        Stats?.onHoldServices[0]?.name === "" ? 0 : Stats.onHoldServices.length,
      diff: 100,
    },
  ];

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Container size="auto" my="md">
      {isLoading ? ( // Conditional rendering based on the loading status
        <Center>
          <Loader variant="bars" />
        </Center>
      ) : (
        <Grid grow>
          <Grid.Col span={12}>
            <ServiceStats data={data} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper shadow="md" p={20} withBorder>
              <Text size={18} mb={10} ml={10}>
                Services Under Process:
              </Text>
              <ServicesList data={Stats.processServices} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper shadow="md" p={20} withBorder>
              <Text size={18} mb={10} ml={10}>
                Services On Hold:
              </Text>
              <ServicesList data={Stats.onHoldServices} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper shadow="md" p={20} withBorder>
              <Text size={18} mb={10} ml={10}>
                Services Completed:
              </Text>
              <ServicesList data={Stats.completedServices} />
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
}
