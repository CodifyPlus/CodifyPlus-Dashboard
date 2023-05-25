import { Container, Grid, Title } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { UserInfoCard } from "../Fragments/ProfileFragments/UserInfoCard";

function Profile() {
  const { user: currentUser } = useSelector((state: any) => {
    return state.auth;
  });

  return (
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
  );
}

export default Profile;
