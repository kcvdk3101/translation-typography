import { createStyles } from "@mantine/core";

export const useCustomColorPickerStyles = createStyles((theme) => ({
  dropdown: {
    backgroundColor: theme.white,
  },

  pickerContainer: {
    width: "auto",
    height: "auto",
    maxWidth: "min-content",
    padding: 16,
    backgroundColor: theme.white,
  },

  block: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 6,
    boxShadow: theme.shadows.xs,
    borderRadius: theme.radius.sm,
  },

  btnFill: {
    width: 38,
    height: 38,
    backgroundColor: theme.white,
    borderRadius: 8,
    borderColor: theme.colors.gray[4],
    padding: 4,
    justifySelf: "center",
  },

  color: {
    minHeight: 30,
  },
}));
