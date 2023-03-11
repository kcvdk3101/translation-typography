import { createStyles } from "@mantine/core";

export const useTranslationPageStyles = createStyles((theme) => ({
  toolbarContainer: {
    backgroundColor:
      theme.colorScheme === "light"
        ? theme.colors.gray[1]
        : theme.colors.dark[5],
    padding: "32px 0px",
  },

  editorContainer: {
    padding: "28px 16px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.gray[4],
    borderRadius: 8,
  },

  editor: {
    width: "100%",
    outline: "none",
    border: "none",
    transitionProperty: "opacity, transform",
    transitionDuration: 350,
    resize: "none",
  },

  btnFill: {
    width: 30,
    height: 30,
    backgroundColor: theme.white,
    borderRadius: 8,
    borderColor: theme.colors.gray[4],
    padding: 4,
    justifySelf: "center",
    fontSize: 16,
  },

  input: {
    backgroundColor: theme.white,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: theme.colors.gray[4],
    borderRadius: 8,
  },

  inputFill: {
    width: 70,
  },

  select: {
    position: "relative",
    padding: "0px 8px",
  },
}));
