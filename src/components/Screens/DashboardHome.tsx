import { Grid, Container, Text, Paper, Loader, Center } from "@mantine/core";
import { ServiceStats } from "../Fragments/DashboardHomeFragments/ServiceStats";
import { ServicesList } from "../Fragments/DashboardHomeFragments/ServicesList";
import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import EventBus from "../../common/EventBus";
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
    pendingServices: [],
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
            username: response.data.processServices[i].username,
          });
        }

        setStats({
          ...response.data,
          completedServices: completedServicesData,
          processServices: underProcessServicesData,
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

        if (error.response && error.response.status === 401) {
          //@ts-ignore
          EventBus.dispatch("logout");
          handleLogout(navigate);
        }

        setIsLoading(false); // Set loading status to false in case of an error
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = [
    {
      title: "Completed Services",
      value:
        Stats?.completedServices[0]?.name === ""
          ? 0
          : Stats.completedServices.length,
      diff: 100,
    },
    {
      title: "Under Process Services",
      value:
        Stats?.processServices[0]?.name === ""
          ? 0
          : Stats.processServices.length,
      diff: 100,
    },
    {
      title: "Pending Services",
      value: Stats?.pendingServices?.length,
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
          <Loader />
        </Center>
      ) : (
        <Grid grow>
          <Grid.Col span={12}>
            <ServiceStats data={data} />
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper shadow="md" p={20} withBorder>
              <Text size={18} mb={10} ml={10}>
                Under Process Services:
              </Text>
              <ServicesList data={Stats.processServices} />
            </Paper>
          </Grid.Col>
          <Grid.Col span={12}>
            <Paper shadow="md" p={20} withBorder>
              <Text size={18} mb={10} ml={10}>
                Completed Services:
              </Text>
              <ServicesList data={Stats.completedServices} />
            </Paper>
          </Grid.Col>
        </Grid>
      )}
    </Container>
  );
}
