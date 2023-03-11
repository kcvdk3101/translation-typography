import { ActionIcon, Group, useMantineColorScheme } from "@mantine/core";
import { BiSun, BiMoon } from "react-icons/bi";
import { ReactElement } from "react";

/**
 * Color Scheme
 *
 * @returns { ReactElement } Return React Element
 */
export function ColorScheme() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  return (
    <ActionIcon
      variant="outline"
      color={dark ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <BiSun size={20} /> : <BiMoon size={20} />}
    </ActionIcon>
  );
}
