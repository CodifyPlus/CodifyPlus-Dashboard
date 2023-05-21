import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import Home from "./components/Screens/Home";
import GSTCalculator from "./components/Screens/GSTCalculator";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Fragments/Navbar/Navbar";
import { Footer } from "./components/Fragments/Footer/Footer";
import links from "./components/data/links";
import footerLinks from "./components/data/footerLinks";
import { ContactUs } from "./components/Screens/ContactUs";
import OurProcess from "./components/Screens/OurProcess";
import OurServices from "./components/Screens/OurServices";
import { Login } from "./components/Screens/Login";
import { Register } from "./components/Screens/Register";
import Dashboard from "./components/Screens/Dashboard";
import DashboardHome from "./components/Screens/DashboardHome";
import { NotificationsPage } from "./components/Screens/Notifications";
import { Notifications } from '@mantine/notifications';
import Profile from "./components/Screens/Profile";
import { EmptyPage } from "./components/Screens/EmptyPage";
import AllServices from "./components/Screens/AllServices";
import ServiceStatus from "./components/Screens/ServiceStatus";
import { AllUsers } from "./components/Screens/AdminScreens/AllUsers";

export default function App() {
  //console.log(window.location.pathname)
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          fontFamily: "Mulish, sans-serif",
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Notifications />
        <Navbar links={links.links} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="gst-calculator" element={<GSTCalculator />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="our-process" element={<OurProcess />} />
          <Route path="our-services" element={<OurServices />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<EmptyPage />} />
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="home" element={<DashboardHome />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="all-services" element={<AllServices />} />
            <Route path="servicestatus" element={<ServiceStatus />} >
              <Route path="*" element={<ServiceStatus/>} />
            </Route>
            <Route path="allusers" element={<AllUsers data={[
    {
      "avatar": "https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Robert Wolfkisser",
      "job": "Engineer",
      "email": "rob_wolf@gmail.com",
      "role": "Collaborator"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Jill Jailbreaker",
      "job": "Engineer",
      "email": "jj@breaker.com",
      "role": "Collaborator"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1632922267756-9b71242b1592?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Henry Silkeater",
      "job": "Designer",
      "email": "henry@silkeater.io",
      "role": "Contractor"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Bill Horsefighter",
      "job": "Designer",
      "email": "bhorsefighter@gmail.com",
      "role": "Contractor"
    },
    {
      "avatar": "https://images.unsplash.com/photo-1630841539293-bd20634c5d72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
      "name": "Jeremy Footviewer",
      "job": "Manager",
      "email": "jeremy@foot.dev",
      "role": "Manager"
    }
  ]} />} ></Route>
          </Route>
        </Routes>
        {window.location.pathname.toLowerCase().includes("dashboard") ? (
          <></>
        ) : (
          <Footer data={footerLinks.data} />
        )}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
