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
  IconLogout,
  IconHome,
  IconUsers,
  IconUser,
  IconCoin,
  IconStatusChange,
  IconUserBolt,
  IconKey,
  IconHomeBolt,
} from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { UserInfoSidebar } from "./UserInfoSidebar";
import { Link, Navigate } from "react-router-dom";
import { IconServer } from "@tabler/icons-react";

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
    link: "/dashboard/allservices",
    label: "All Services",
    icon: IconStatusChange,
  },
  { link: "/dashboard/profile", label: "Profile", icon: IconUserBolt },
  {
    link: "/dashboard/notifications",
    label: "Notifications",
    icon: IconBellRinging,
  },
  {
    link: "/dashboard/changepassword",
    label: "Change Password",
    icon: IconKey,
  },
];

const adminRoutes = [
  { link: "/dashboard/allusers", label: "Manage Users", icon: IconUsers },
  { link: "/dashboard/adduser", label: "Add User", icon: IconUser },
  {
    link: "/dashboard/manageservices",
    label: "Manage Services",
    icon: IconServer,
  },
  { link: "/dashboard/addservice", label: "Add Service", icon: IconCoin },
];

const moderatorRoutes = [
  {
    link: "/dashboard/mod/manageservices",
    label: "Manage Services",
    icon: IconServer,
  },
];

export function Sidebar({ drawerSetOpened }: any) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Home");
  const [showAdminLinks, setShowAdminLinks] = useState(false);
  const [showModeratorLinks, setShowModeratorLinks] = useState(false);
  useEffect(() => {
    setActive(window.location.pathname);
    if (currentUser) {
      setShowAdminLinks(currentUser.role === "ADMIN");
      setShowModeratorLinks(currentUser.role === "MODERATOR");
    }
    //window.location.reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        drawerSetOpened(false);
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
        drawerSetOpened(false);
        setActive(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  const moderatorLinks = moderatorRoutes.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.link === active,
      })}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        drawerSetOpened(false);
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

        {showAdminLinks === true ? (
          <>
            <Text className={classes.adminLinks}>Admin Controls</Text>
            {adminLinks}
          </>
        ) : (
          <></>
        )}
        {showModeratorLinks === true ? (
          <>
            <Text className={classes.adminLinks}>Moderator Controls</Text>
            {moderatorLinks}
          </>
        ) : (
          <></>
        )}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <Link to="https://startupkro.com/" className={classes.link}>
          <IconHomeBolt className={classes.linkIcon} stroke={1.5} />
          <span>Visit Start-Up Kro</span>
        </Link>

        <a href="/login" className={classes.link} onClick={handleLogout}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
