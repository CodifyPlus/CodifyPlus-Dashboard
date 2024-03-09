import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  SimpleGrid,
  Title,
  Modal,
  Loader,
  Center,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { AddTemplatePoint } from "../../Fragments/EditTemplateFragments/AddTemplatePoint";
import { TemplateTrack } from "../../Fragments/EditTemplateFragments/TemplateTrack";
import { TemplateControls } from "../../Fragments/EditTemplateFragments/TemplateControls";
import { getTemplateInfo } from "../../../services/AdminService";

export default function EditTemplate() {
  const [opened_addTrack, { open: open_addTrack, close: close_addTrack }] =
    useDisclosure(false);

  const [info, setInfo] = useState({
    templateName: "",
    pathway: [
      {
        startedAt: undefined,
        description: "",
        title: "",
        status: true,
        _id: "",
        approved: false,
      },
    ],
  });

  const templateId = window.location.pathname.split("/")[3];
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTemplateInfo(templateId).then(
      (response) => {
        setInfo(response.data);
        setIsLoading(false);
      },
      (error) => {
        if (error) {
          notifications.show({
            title: "Error",
            message: error.message,
            color: "red",
          });
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoading ? (
        <Center>
          <Loader variant="bars" />
        </Center>
      ) : (
        <>
          <Modal
            opened={opened_addTrack}
            onClose={close_addTrack}
            title=""
            fullScreen
            centered
          >
            <AddTemplatePoint
              data={{ templateId, closeModal: close_addTrack, setInfo }}
            />
          </Modal>
          <Title
            mb={30}
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Edit Template - {info.templateName}
          </Title>
          <Container>
            <SimpleGrid
              cols={2}
              spacing="md"
              mb="md"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              <TemplateTrack data={info.pathway} />
              <Grid gutter="md">
                <Grid.Col>
                  <TemplateControls
                    data={{
                      openModalAddTrack: open_addTrack,
                    }}
                  />
                </Grid.Col>
              </Grid>
            </SimpleGrid>
          </Container>
        </>
      )}
    </>
  );
}
