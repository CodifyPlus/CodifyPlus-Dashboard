import React from "react";
import DarkGIF from "./DarkGIF.gif";
import LightGIF from "./LightGIF.gif";
import { useMantineTheme } from "@mantine/core";

function Logo() {
  const { colorScheme } = useMantineTheme();
  return (
    <div>
      <img src={colorScheme === "dark" ? DarkGIF : LightGIF} alt="" width={150} />
    </div>
  );
}

export default Logo;