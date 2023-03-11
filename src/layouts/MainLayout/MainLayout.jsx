import { Container } from "@mantine/core";
import { ReactElement } from "react";
import { TranslationProvider } from "../../features/Translation/context/TranslationContext";
import { TranslationPage } from "../../features/Translation/TranslationPage";
import { MainHeader } from "./MainHeader/MainHeader";

/**
 * Main Layout
 *
 * @returns { ReactElement } Return main layout
 */
export function MainLayout() {
  return (
    <Container fluid px={0}>
      <Container size="lg">
        <MainHeader />
      </Container>
      <TranslationProvider>
        <TranslationPage />
      </TranslationProvider>
    </Container>
  );
}

MainLayout.prototype = {};
