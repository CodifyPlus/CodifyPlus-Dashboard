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
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Navbar links={links.links} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="gst-calculator" element={<GSTCalculator />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="our-process" element={<OurProcess />} />
          <Route path="our-services" element={<OurServices />} />
        </Routes>
        <Footer data={footerLinks.data} />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
