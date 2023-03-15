import { Box, Divider, Flex, LoadingOverlay, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { bool } from "prop-types";
import { ReactElement, useContext, useState } from "react";
import { getGoogleTranslateLanguage } from "../../../api/google";
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
  const [translateContent, setTranslateContent] = useState("");
  const [originalLang, setOriginalLang] = useState("vi");
  const [translateLang, setTranslateLang] = useState("en");
  const [isExchanging, setIsExchanging] = useState(false);

  const translate = async (data) => {
    const response = await getGoogleTranslateLanguage(data);
  };

  const onChangeContent = (value) => {
    setOriginalContent(value);
    if (!value) return;
    const data = { sl: originalLang, tl: translateLang, q: value };
    translate(data);
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

  // const [translateContent] = useDebouncedValue(onChangeContent, 300);

  // async function translate(data: { q: string, tl: string, sl: string }) {
  //   return fetchJSON<{ sentences: any[] }>("/api/translate", {
  //     method: "POST",
  //     body: JSON.stringify(data)
  //   }).then(({ sentences }) => {
  //     if (sentences && sentences.length) {
  //       setTransText(sentences[0].trans)
  //     }
  //   }).catch((err) => {
  //     setError(err.message)
  //   })
  // }

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
