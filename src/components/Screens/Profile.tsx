import { Container, Grid, Title, Loader, Center } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UserInfoCard } from "../Fragments/ProfileFragments/UserInfoCard";

function Profile() {
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading status
  const { user: currentUser } = useSelector((state: any) => {
    return state.auth;
  });

  useEffect(() => {
    setIsLoading(false); // Simulating the end of data loading
  }, []);

  return (
    <>
      {isLoading ? ( // Conditional rendering based on the loading status
      <Center>
        <Loader />
      </Center>
      ) : (
        <>
          <Title
            align="center"
            mb={30}
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Profile
          </Title>
          <Container my="md">
            <Grid>
              <Grid.Col xs={12}>
                <UserInfoCard
                  avatar="https://api.dicebear.com/6.x/miniavs/svg"
                  email={currentUser.email}
                  name={currentUser.username}
                />
              </Grid.Col>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
}

export default Profile;
