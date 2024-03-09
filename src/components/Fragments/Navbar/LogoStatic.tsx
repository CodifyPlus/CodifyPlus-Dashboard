import React from "react";
import { GlobalConfiguration } from "../../../common/GlobalConfiguration";
import { useMantineTheme } from "@mantine/core";

function LogoStatic() {
  const { colorScheme } = useMantineTheme();
  return (
    <div>
      <img
        src={
          colorScheme === "dark"
            ? GlobalConfiguration.appLogoDark
            : GlobalConfiguration.appLogoLight
        }
        alt=""
        width={150}
      />
    </div>
  );
}

export default LogoStatic;
