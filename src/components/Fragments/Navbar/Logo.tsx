import React from "react";
import WhiteBGLogo from "./CodifyPlusLogoLightMode.png";
import BlackBGLogo from "./CodifyPlusLogoDarkMode.png";
import { useMantineTheme } from "@mantine/core";

function Logo() {
  const { colorScheme } = useMantineTheme();
  return (
    <div>
      <img src={colorScheme === "dark" ? BlackBGLogo : WhiteBGLogo} alt="" width={150} />
    </div>
  );
}

export default Logo;
