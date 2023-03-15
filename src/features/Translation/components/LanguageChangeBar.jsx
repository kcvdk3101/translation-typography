import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Select,
  useMantineColorScheme,
} from "@mantine/core";
import { ReactElement, useState } from "react";
import { RiExchangeLine } from "react-icons/ri";
import { ArrowIcon } from "../../../assets/icons";
import { filterSelectedItem } from "../../../utils/utils";
import { useTranslationPageStyles } from "../useTranslationPageStyles";
import { string, bool, func } from "prop-types";
import { LANGUAGES } from "../../../constants/languages";

/**
 * Language Change Bar
 *
 * @param { object } props Props
 * @param { string } props.isExchanging Check function onExchangeLanguage is executed
 * @param { string } props.originalLang Original language
 * @param { string } props.translateLang Translation language
 * @param { Function } props.onChangeLanguage Function handle change language when select item in dropdown
 * @param { Function } props.onExchangeLanguage Function handle switch original language and translation language
 * @returns { ReactElement } Return Language Change Bar
 */
export function LanguageChangeBar({
  isExchanging,
  originalLang,
  translateLang,
  onChangeLanguage,
  onExchangeLanguage,
}) {
  const { classes } = useTranslationPageStyles();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Flex direction="row" align="center" justify="center" wrap="nowrap" mb="md">
      <Select
        size="sm"
        variant="unstyled"
        placeholder="Pick one"
        className={`${classes.select} ${classes.input}`}
        style={{ width: "100%" }}
        searchable
        value={originalLang}
        filter={filterSelectedItem}
        nothingFound="No options"
        data={LANGUAGES}
        rightSection={<ArrowIcon />}
        onChange={(value) => onChangeLanguage(value)}
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
      />
      <ActionIcon
        mx={4}
        color={colorScheme === "dark" ? "indigo" : "blue"}
        onClick={onExchangeLanguage}
      >
        <RiExchangeLine
          size={24}
          style={{
            transform: isExchanging ? "rotate(0deg)" : "rotate(180deg)",
            transition: "transform 200ms ease-in",
          }}
        />
      </ActionIcon>
      <Select
        size="sm"
        variant="unstyled"
        placeholder="Pick one"
        className={`${classes.select} ${classes.input}`}
        style={{ width: "100%" }}
        searchable
        value={translateLang}
        filter={filterSelectedItem}
        nothingFound="No options"
        data={LANGUAGES}
        rightSection={<ArrowIcon />}
        onChange={(value) => onChangeLanguage(value, false)}
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
      />
    </Flex>
  );
}

LanguageChangeBar.prototype = {
  isExchanging: bool.isRequired,
  originalLang: string.isRequired,
  translateLang: string.isRequired,
  onChangeLanguage: func.isRequired,
  onExchangeLanguage: func.isRequired,
};
