import { useEffect, useState } from "react";
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  ScrollArea,
  Text,
} from "@mantine/core";
import {
  IconBellRinging,
  IconSwitchHorizontal,
  IconLogout,
  IconHome,
  IconUsers,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { UserInfoSidebar } from "./UserInfoSidebar";
import { Link, Navigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
  adminLinks: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
    paddingBottom: theme.spacing.md,
    //marginBottom: `calc(${theme.spacing.md} * 1.5)`,
  },
}));

const data = [
  { link: "/dashboard/home", label: "Home", icon: IconHome },
  {
    link: "/dashboard/notifications",
    label: "Notifications",
    icon: IconBellRinging,
  },
];

const adminRoutes = [
  { link: "/dashboard/allusers", label: "Manage Users", icon: IconUsers },
];

export function Sidebar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Home");
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  useEffect(() => {
    setActive(window.location.pathname);
    if(currentUser){
      setShowAdminLinks(currentUser.roles.includes("ROLE_ADMIN"));
    }
    //window.location.reload();
  }, []);
  const { user: currentUser } = useSelector((state: any) => state.auth);
  const handleLogout = (event: any) => {
    localStorage.removeItem("user");
  };

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  const adminLinks = adminRoutes.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <Navbar height={600} width={{ sm: 330 }} p="md">
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        <Group className={classes.header} position="apart">
          <UserInfoSidebar
            {...{
              image: "https://api.dicebear.com/6.x/miniavs/svg",
              name: currentUser.username,
              email: currentUser.email,
            }}
          />
        </Group>
        {links}

        {showAdminLinks === true ? <>
          <Text className={classes.adminLinks}>Admin Controls</Text>
          {adminLinks}
        </> : <></>}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to="/" className={classes.link}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Return Home</span>
        </Link>

        <a href="/login" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
