import { useEffect, useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Paper,
  Transition,
  rem,
  Menu,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import DarkModeButton from "../DarkModeButton/DarkModeButton";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { IconChevronDown } from "@tabler/icons-react";
import { useSelector } from "react-redux";

const HEADER_HEIGHT = rem(60);
const PUSH_DOWN = rem(120);

const useStyles = createStyles((theme) => ({
  root: {
    position: "fixed",
    zIndex: 10,
    top: 0,
  },

  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  linkLabel: {
    marginRight: rem(5),
  },
  linkDrop: {
    lineHeight: 1,

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      //padding: theme.spacing.md,
    },
  },
}));

interface HeaderResponsiveProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export function Navbar({ links }: HeaderResponsiveProps) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const { user: currentUser } = useSelector((state: any) => state.auth);

  useEffect(() => {
    setActive(window.location.pathname);
    //window.location.reload();
  }, []);

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item
        className={classes.linkDrop}
        component={Link}
        to={item.link}
        onClick={(event) => {
          setActive(item.link);
          close();
        }}
        key={item.link}
      >
        {item.label}
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link
              to={link.link}
              className={classes.link}
              onClick={(event) => {
                setActive(link.link);
              }}
            >
              <span className={classes.linkLabel}>{link.label}</span>
              <IconChevronDown size="0.9rem" stroke={1.5} />
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
        onClick={(event) => {
          setActive(link.link);
          close();
        }}
      >
        {link.label}
      </Link>
    );
  });

  const otherLinks = currentUser ? (
    <a
        key={"dashboard"}
        href="dashboard/home"
        className={cx(classes.link, {
          [classes.linkActive]: active === "/dashboard/home",
        })}
        onClick={(event) => {
          setActive("/dashboard/home");
          close();
        }}
      >
        {"Dashboard"}
      </a>
  ) : (
    <>
      <Link
        key={"login"}
        to="login"
        className={cx(classes.link, {
          [classes.linkActive]: active === "/login",
        })}
        onClick={(event) => {
          setActive("/login");
          close();
        }}
      >
        {"Login"}
      </Link>
      <Link
        key={"signup"}
        to="register"
        className={cx(classes.link, {
          [classes.linkActive]: active === "/register",
        })}
        onClick={(event) => {
          setActive("/register");
          close();
        }}
      >
        {"Signup"}
      </Link>
    </>
  );
  return (
    <>
      <Header height={HEADER_HEIGHT} mb={40} className={classes.root}>
        <Container className={classes.header}>
          <Link
            to="/"
            onClick={() => {
              setActive("/");
              close();
            }}
          >
            <Logo />
          </Link>
          <Group spacing={5} className={classes.links}>
            {items}{otherLinks}
          </Group>
          <DarkModeButton />

          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Transition
            transition="pop-top-right"
            duration={200}
            mounted={opened}
          >
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}{otherLinks}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
      <div style={{ marginTop: PUSH_DOWN }}></div>
    </>
  );
}
