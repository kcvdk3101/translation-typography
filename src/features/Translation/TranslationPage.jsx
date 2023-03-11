import { Alert, Box, Container } from "@mantine/core";
import { ReactElement, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { load } from "webfontloader";
import { getGoogleFonts } from "../../api/api";
import { capitalizeFirstLetterOfEachWord } from "../../utils/utils";
import { modifySelectedLabel } from "./constants";
import { Editor } from "./components/Editor";
import { Toolbar } from "./components/Toolbar";
import { TranslationContext } from "./context/TranslationContext";
import { useTranslationPageStyles } from "./useTranslationPageStyles";

/**
 * Translation Page
 *
 * @returns { ReactElement } UI Translation Page
 */
export function TranslationPage() {
  const { classes } = useTranslationPageStyles();
  const { data, error, status } = useQuery("fonts", getGoogleFonts);
  const { fontFamily, updateInitialValue } = useContext(TranslationContext);

  const [fonts, setFonts] = useState([]);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    if (data) {
      const fonts = data.items.map((item) => ({
        value: item.family,
        label: item.family,
      }));
      setFonts(fonts ?? []);
    }
  }, [data]);

  useEffect(() => {
    if (data && fontFamily) {
      load({
        google: {
          families: [fontFamily],
        },
      });

      const specificFontFamily = data.items.find(
        (item) => item.family === fontFamily
      );
      const styles = specificFontFamily.variants.map((variant) => {
        const selectLabel = modifySelectedLabel(variant);
        return {
          value: variant,
          label: capitalizeFirstLetterOfEachWord(selectLabel),
        };
      });
      updateInitialValue("fontStyle", "regular");
      setStyles(styles ?? []);
    }
  }, [data, fontFamily]);

  return (
    <>
      {status === "error" ? (
        <Container>
          <Alert title="Bummer!" color="red">
            {error.message}
          </Alert>
        </Container>
      ) : (
        <Box>
          <Container fluid className={classes.toolbarContainer}>
            <Toolbar fonts={fonts} styles={styles} />
          </Container>
          <Container mt="md" size="lg">
            <Editor isLoading={status === "loading"} />
          </Container>
        </Box>
      )}
    </>
  );
}

TranslationPage.propTypes = {};
