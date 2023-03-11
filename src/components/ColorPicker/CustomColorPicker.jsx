import {
  ActionIcon,
  Box,
  ColorPicker,
  ColorSwatch,
  Grid,
  Menu,
  NumberInput,
  Select,
  Text,
} from "@mantine/core";
import { node, string } from "prop-types";
import { ReactElement, ReactNode, useContext, useState } from "react";
import { dataColorFormat } from "../../constants/colorFormat";
import { TranslationContext } from "../../features/Translation/context/TranslationContext";
import { useCustomColorPickerStyles } from "./useCustomColorPicketStyles";

/**
 * Custom Color Picker
 *  - Render in Toolbar
 *
 * @param { object } props Props
 * @param { string } props.inputName Name input
 * @param { ReactNode } props.icon Icon button
 * @param { ReactNode } props.initialValue Initial color
 * @returns { ReactElement } Custom Color Picker
 */
export function CustomColorPicker({ inputName, icon, initialValue }) {
  const { classes } = useCustomColorPickerStyles();
  const { updateInitialValue } = useContext(TranslationContext);

  const [colorFormat, onChangeColorFormat] = useState(dataColorFormat[0].value);

  return (
    <Menu position="bottom-end">
      <Menu.Target>
        <ActionIcon className={classes.btnFill}>{icon}</ActionIcon>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        <div className={classes.pickerContainer}>
          <ColorPicker
            size="md"
            value={initialValue}
            onChange={(color) => updateInitialValue(inputName, color)}
            format={colorFormat}
          />
          <Grid gutter={4} mt={2} align="center">
            <Grid.Col span={3}>
              <Select
                size="xs"
                variant="unstyled"
                defaultValue={colorFormat}
                className={classes.block}
                styles={{ rightSection: { pointerEvents: "none" } }}
                data={dataColorFormat}
                onChange={(value) => onChangeColorFormat(value)}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Box className={`${classes.block} ${classes.color}`}>
                <Text fz="xs">{initialValue}</Text>
              </Box>
            </Grid.Col>
            <Grid.Col span={2}>
              <NumberInput
                size="xs"
                variant="unstyled"
                className={classes.block}
                defaultValue={100}
                max={100}
                min={0}
                maxLength={3}
                minLength={1}
              />
            </Grid.Col>
            <Grid.Col span="content">
              <ColorSwatch color={initialValue} size={16} withShadow />
            </Grid.Col>
          </Grid>
        </div>
      </Menu.Dropdown>
    </Menu>
  );
}

CustomColorPicker.prototype = {
  inputName: string.isRequired,
  icon: node.isRequired,
  initialValue: string.isRequired,
};
