import { Container, Grid, Select, TextInput } from "@mantine/core";
import { array } from "prop-types";
import React, { forwardRef, ReactElement, useContext } from "react";
import {
  ArrowIcon,
  FillBackgroundColorIcon,
  FillFontColorIcon,
  LetterSpacingIcon,
  LineHeightIcon,
} from "../../../assets/icons";
import { CustomColorPicker } from "../../../components/ColorPicker/CustomColorPicker";
import { fontSizeData } from "../../../constants/fontSizeData";
import { filterSelectedItem } from "../../../utils/utils";
import { TranslationContext } from "../context/TranslationContext";
import { useTranslationPageStyles } from "../useTranslationPageStyles";

/**
 * Toolbar Component
 *
 * @param { object } props Props
 * @param { Array } props.fonts Google fonts
 * @param { Array } props.styles Google font styles
 * @returns { ReactElement } Toolbar in Translation Page
 */
export function Toolbar({ fonts, styles }) {
  const { classes } = useTranslationPageStyles();
  const {
    fontFamily,
    fontStyle,
    fontSize,
    lineHeight,
    letterSpacing,
    fontColor,
    backgroundColor,
    updateInitialValue,
  } = useContext(TranslationContext);

  const CustomSelectFontFamily = forwardRef(
    ({ value, label, ...others }, ref) => (
      <p
        {...others}
        ref={ref}
        style={{
          fontFamily: `${value}, sans-serif`,
          fontSize: 14,
        }}
      >
        {label}
      </p>
    )
  );
  CustomSelectFontFamily.displayName = "CustomSelectFontFamily";

  const CustomSelectFontStyle = forwardRef(
    ({ value, label, ...others }, ref) => {
      const splitLabel = label.split(" ");
      if (splitLabel.length === 1) {
        return (
          <p
            {...others}
            ref={ref}
            style={{
              fontStyle: splitLabel[0] === "Italic" ? "italic" : "normal",
              fontWeight: isNaN(parseFloat(splitLabel[0]))
                ? splitLabel[0]
                : "normal",
              fontSize: 14,
            }}
          >
            {label}
          </p>
        );
      }
      return (
        <p
          {...others}
          ref={ref}
          style={{
            fontStyle: splitLabel[0] === "Italic" ? "italic" : "normal",
            fontWeight: splitLabel[1],
            fontSize: 14,
          }}
        >
          {label}
        </p>
      );
    }
  );
  CustomSelectFontStyle.displayName = "CustomSelectFontStyle";

  return (
    <Container size="lg">
      <Grid justify="flex-start" align="center">
        <Grid.Col span={4}>
          <Select
            size="sm"
            variant="unstyled"
            placeholder="Select font family"
            className={`${classes.select} ${classes.input}`}
            searchable
            value={fontFamily}
            data={fonts}
            filter={filterSelectedItem}
            itemComponent={CustomSelectFontFamily}
            nothingFound="Font is not found"
            styles={(theme) => ({
              rightSection: { pointerEvents: "none" },
              item: {
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor: "rgba(68, 121, 219)",
                    color: theme.white,
                  },
                },
              },
              input: {
                color: theme.black,
              },
            })}
            rightSection={<ArrowIcon />}
            onChange={(value) => updateInitialValue("fontFamily", value)}
          />
        </Grid.Col>
        <Grid.Col span="auto">
          <Select
            size="sm"
            variant="unstyled"
            placeholder="Select font style"
            className={`${classes.select} ${classes.input}`}
            value={fontStyle}
            data={styles}
            filter={filterSelectedItem}
            itemComponent={CustomSelectFontStyle}
            nothingFound="Font style is not found"
            styles={(theme) => ({
              rightSection: { pointerEvents: "none" },
              item: {
                "&[data-selected]": {
                  "&, &:hover": {
                    backgroundColor: "rgba(68, 121, 219)",
                    color: theme.white,
                  },
                },
              },
              input: {
                color: theme.black,
              },
            })}
            rightSection={<ArrowIcon />}
            onChange={(value) => updateInitialValue("fontStyle", value)}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Select
            size="sm"
            variant="unstyled"
            placeholder="Select font size"
            className={`${classes.select} ${classes.input}`}
            styles={(theme) => ({
              rightSection: { pointerEvents: "none" },
              input: {
                color: theme.black,
              },
            })}
            value={fontSize}
            data={fontSizeData}
            rightSection={<ArrowIcon />}
            onChange={(value) => updateInitialValue("fontSize", value)}
          />
        </Grid.Col>
        <Grid.Col span="content">
          <TextInput
            size="sm"
            variant="unstyled"
            className={`${classes.inputFill} ${classes.input}`}
            maxLength={3}
            min={1}
            value={lineHeight}
            styles={(theme) => ({
              input: {
                color: theme.black,
              },
            })}
            onChange={(event) =>
              updateInitialValue("lineHeight", event.target.value)
            }
            icon={<LineHeightIcon width={20} />}
          />
        </Grid.Col>
        <Grid.Col span="content">
          <TextInput
            size="sm"
            variant="unstyled"
            className={`${classes.inputFill} ${classes.input}`}
            maxLength={3}
            min={0}
            value={letterSpacing}
            styles={(theme) => ({
              input: {
                color: theme.black,
              },
            })}
            onChange={(event) =>
              updateInitialValue("letterSpacing", event.target.value)
            }
            icon={<LetterSpacingIcon width={20} />}
          />
        </Grid.Col>
        <Grid.Col span="content">
          <CustomColorPicker
            inputId="fontColor"
            inputName="fontColor"
            initialValue={fontColor}
            icon={<FillFontColorIcon width={24} />}
          />
        </Grid.Col>
        <Grid.Col span="content">
          <CustomColorPicker
            inputId="backgroundColor"
            inputName="backgroundColor"
            initialValue={backgroundColor}
            icon={<FillBackgroundColorIcon width={18} />}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}

Toolbar.propTypes = {
  fonts: array.isRequired,
  styles: array.isRequired,
};
