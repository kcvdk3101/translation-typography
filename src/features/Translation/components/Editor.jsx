import { Box, LoadingOverlay } from "@mantine/core";
import { bool } from "prop-types";
import { ReactElement, useContext, useState } from "react";
import { modifySelectedLabel } from "../constants";
import { TranslationContext } from "../context/TranslationContext";
import { useTranslationPageStyles } from "../useTranslationPageStyles";

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

  const [content, onChangeContent] = useState("");

  return (
    <Box className={classes.editorContainer} style={{ backgroundColor }}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <textarea
        type="text"
        value={content}
        className={classes.editor}
        style={{
          fontFamily,
          backgroundColor,
          color: fontColor,
          fontSize: `${fontSize}px`,
          lineHeight: `${lineHeight}px`,
          letterSpacing: `${letterSpacing}px`,
          fontWeight: style.length > 1 ? style[1] : "normal",
          fontStyle: style[0] !== "italic" ? "normal" : "italic",
        }}
        rows={10}
        autoCapitalize="none"
        autoComplete="off"
        spellCheck={false}
        placeholder="Type something..."
        onChange={(event) => onChangeContent(event.target.value)}
      />
    </Box>
  );
}

Editor.prototype = {
  isLoading: bool.isRequired,
};
