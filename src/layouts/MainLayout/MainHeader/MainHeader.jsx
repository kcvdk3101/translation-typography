import { Group, Header, Text } from "@mantine/core";
import { ReactElement } from "react";
import { ColorScheme } from "../../../components/ColorScheme/ColorScheme";
import { useMainHeaderStyles } from "./useMainHeaderStyles";

/**
 * Header
 *
 * @returns { ReactElement } Header of Main Layout
 */
export function MainHeader() {
  const { classes } = useMainHeaderStyles();

  return (
    <Header className={classes.headerContainer} py="lg">
      <Group position="apart" sx={{ height: "100%" }}>
        <Group>
          <Text fz="xl" fw={600}>
            Fonts
          </Text>
        </Group>
        <ColorScheme />
      </Group>
    </Header>
  );
}
