import { Box, Divider, Flex, LoadingOverlay, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { bool } from "prop-types";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { postGoogleTranslateLanguage } from "../../../api/google";
import { DEFAULT_MAX_LENGTH_CHARACTERS } from "../../../constants";
import { modifySelectedLabel } from "../constants";
import { TranslationContext } from "../context/TranslationContext";
import { useTranslationPageStyles } from "../useTranslationPageStyles";
import { LanguageChangeBar } from "./LanguageChangeBar";

/**
 * Editor Component
 *
 * @param { object } props Props
 * @param { boolean } props.isLoading Loading data
 * @returns { ReactElement } Editor in Translation Page
 */
export function Editor({ isLoading }) {
  const { classes } = useTranslationPageStyles();
  const {
    fontFamily,
    fontStyle,
    fontSize,
    lineHeight,
    letterSpacing,
    fontColor,
    backgroundColor,
  } = useContext(TranslationContext);

  const style = modifySelectedLabel(fontStyle).split(" ");

  const [originalContent, setOriginalContent] = useState("");
  const [debouncedOriginContent] = useDebouncedValue(originalContent, 300);
  const [translateContent, setTranslateContent] = useState("");
  const [originalLang, setOriginalLang] = useState("vi");
  const [translateLang, setTranslateLang] = useState("en");
  const [isExchanging, setIsExchanging] = useState(false);

  const translate = async (data) => {
    try {
      const response = await postGoogleTranslateLanguage(data);
      if (!response) return;
      setTranslateContent(response.translatedText);
    } catch (error) {
      // console.log(error);
    }
  };

  const onChangeContent = (value) => {
    setOriginalContent(value);
  };

  const onChangeLanguage = (value, checkLanguage = true) => {
    if (checkLanguage) {
      setOriginalLang(value);
    } else {
      setTranslateLang(value);
    }
  };

  const onExchangeLanguage = () => {
    setIsExchanging((prev) => !prev);
    setTranslateLang(originalLang);
    setOriginalLang(translateLang);
  };

  useEffect(() => {
    const debounceTranslate = setTimeout(() => {
      const data = {
        q: debouncedOriginContent,
        sl: originalLang,
        tl: translateLang,
      };
      translate(data);
    }, 100);

    return () => clearTimeout(debounceTranslate);
  }, [debouncedOriginContent]);

  return (
    <Box my="xl">
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <LanguageChangeBar
        isExchanging={isExchanging}
        originalLang={originalLang}
        translateLang={translateLang}
        onChangeLanguage={onChangeLanguage}
        onExchangeLanguage={onExchangeLanguage}
      />
      <Flex
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="nowrap"
        pos="relative"
      >
        <Text ta="right" fz="xs" className={classes.counter}>
          {originalContent.length} / {DEFAULT_MAX_LENGTH_CHARACTERS}
        </Text>
        <textarea
          id="original-editor"
          type="text"
          value={originalContent}
          className={classes.editor}
          style={{
            fontFamily,
            backgroundColor,
            color: fontColor,
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight ? lineHeight : 16}px`,
            letterSpacing: `${letterSpacing ? letterSpacing : 0}px`,
            fontWeight: style.length > 1 ? style[1] : "normal",
            fontStyle: style[0] !== "italic" ? "normal" : "italic",
          }}
          rows={12}
          maxLength={DEFAULT_MAX_LENGTH_CHARACTERS}
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => onChangeContent(event.target.value)}
        />
        <Divider orientation="vertical" size="md" mx="md" />
        <textarea
          id="translate-editor"
          type="text"
          value={translateContent}
          className={classes.editor}
          style={{
            fontFamily,
            backgroundColor,
            color: fontColor,
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight ? lineHeight : 16}px`,
            letterSpacing: `${letterSpacing ? letterSpacing : 0}px`,
            fontWeight: style.length > 1 ? style[1] : "normal",
            fontStyle: style[0] !== "italic" ? "normal" : "italic",
          }}
          readOnly
          rows={12}
          maxLength={DEFAULT_MAX_LENGTH_CHARACTERS}
          autoCapitalize="none"
          autoComplete="off"
          spellCheck={false}
        />
      </Flex>
    </Box>
  );
}

Editor.prototype = {
  isLoading: bool.isRequired,
};
