import { Center, Container, Grid, Image, Title, createStyles, rem, useMantineTheme } from "@mantine/core";
import BackedByMicrosoft from "./BackedByLogos/MicrosoftForStartups.webp";
import CodifyPlusLight from "../../../assets/CodifyPlusLogoDarkMode.png";
import CodifyPlusDark from "../../../assets/CodifyPlusLogoLightMode.png";
import StartupIndia from "./BackedByLogos/StartupIndia.webp";
import MakeInIndia from "./BackedByLogos/MakeInIndia.webp";

const useStyles = createStyles((theme) => ({
    title: {
      lineHeight: 1,
      textAlign: 'center',
      marginTop: theme.spacing.xl,
    },
    highlight: {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        padding: rem(5),
        paddingTop: 0,
        borderRadius: theme.radius.sm,
        display: 'inline-block',
        color: theme.colorScheme === 'dark' ? theme.white : 'inherit',
      },
  }));

export function BackedBy() {
  const { classes } = useStyles();
  const { colorScheme } = useMantineTheme();
  return (
    <Container>
      <Title mb={40} className={classes.title} order={2}>
        We are backed by world's leading{" "}
        <span className={classes.highlight}>communities</span>
      </Title>
      <Grid justify="center" grow>
        <Grid.Col span={3}>
          <Center>
            <Image width={100} height={40} src={BackedByMicrosoft}></Image>
          </Center>
        </Grid.Col>
        <Grid.Col span={3}>
          <Center>
            <Image width={150} height={30} src={colorScheme === 'dark' ? CodifyPlusLight : CodifyPlusDark}></Image>
          </Center>
        </Grid.Col>
        <Grid.Col span={3}>
          <Center>
            <Image width={150} height={40} src={StartupIndia}></Image>
          </Center>
        </Grid.Col>
        <Grid.Col span={3}>
          <Center>
            <Image width={100} height={40} src={MakeInIndia}></Image>
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
