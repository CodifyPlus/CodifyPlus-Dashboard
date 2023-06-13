import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

function DarkModeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color:
          theme.colorScheme === "dark"
            ? theme.colors.yellow[4]
            : theme.colors.blue[6],
      })}
      
    >
      {dark ? <IconSun size="1.2rem" /> : <IconMoonStars size="1.2rem" />}
    </ActionIcon>
  );
}

export default DarkModeButton;
