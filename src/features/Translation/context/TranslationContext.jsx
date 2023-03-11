import { ReactElement, ReactNode, createContext, useState } from "react";
import { localStorageService } from "../../../services/localStorage.service";

export const TranslationContext = createContext();

/**
 * Translation Context Provider
 *
 * @param { object } props Props
 * @param { ReactNode } props.children Children in Component
 * @returns { ReactElement } Translation Context Provider
 */
export function TranslationProvider({ children }) {
  const [initialValue, setInitialValue] = useState({
    fontFamily: "Roboto",
    fontStyle: "regular",
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0,
    fontColor: "#000000",
    backgroundColor: "#ffffff",
  });

  const updateInitialValue = (key, value) => {
    localStorageService.set(key, value);
    setInitialValue((prev) => ({ ...prev, [key]: value }));
  };

  const value = { ...initialValue, updateInitialValue };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
