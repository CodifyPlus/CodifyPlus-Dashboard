import React from "react";
import DarkPNG from "./CodifyPlusLogoDarkMode.png";
import LightPNG from "./CodifyPlusLogoLightMode.png";
import { useMantineTheme } from "@mantine/core";

function LogoStatic() {
  const { colorScheme } = useMantineTheme();
  return (
    <div>
      <img src={colorScheme === "dark" ? DarkPNG : LightPNG} alt="" width={150} />
    </div>
  );
}

export default LogoStatic;