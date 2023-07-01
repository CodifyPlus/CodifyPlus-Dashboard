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
import { Notifications } from "@mantine/notifications";
import Profile from "./components/Screens/Profile";
import { EmptyPage } from "./components/Screens/EmptyPage";
import AllServices from "./components/Screens/AllServices";
import ServiceStatus from "./components/Screens/ServiceStatus";
import { AllUsers } from "./components/Screens/AdminScreens/AllUsers";
import { AddUser } from "./components/Screens/AdminScreens/AddUser";
import { ManageServices } from "./components/Screens/AdminScreens/ManageServices";
import AddService from "./components/Screens/AdminScreens/AddService";
import { TrackService } from "./components/Screens/AdminScreens/TrackService";
import { ChangePassword } from "./components/Screens/ChangePassword";
import { ManageServicesMod } from "./components/Screens/ModeratorScreens/ManageServicesMod";
import { TrackServiceMod } from "./components/Screens/ModeratorScreens/TrackServiceMod";

export default function App() {
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
          primaryColor: "yellow",
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
            <Route path="allservices" element={<AllServices />} />
            <Route path="changepassword" element={<ChangePassword />} />
            <Route path="servicestatus" element={<ServiceStatus />}>
              <Route path="*" element={<ServiceStatus />} />
            </Route>
            <Route path="mod/manageservices" element={<ManageServicesMod />} />
            <Route path="mod/track" element={<TrackServiceMod />}>
              <Route path="*" element={<TrackServiceMod />} />
            </Route>
            <Route path="allusers" element={<AllUsers />}></Route>
            <Route path="adduser" element={<AddUser />}></Route>
            <Route path="manageservices" element={<ManageServices />}></Route>
            <Route path="addservice" element={<AddService />}></Route>
            <Route path="track" element={<TrackService />}>
              <Route path="*" element={<TrackService />} />
            </Route>
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
