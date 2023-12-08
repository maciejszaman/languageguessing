"use client";
import { ChakraProvider } from "@chakra-ui/react";
import { Navigation } from "./components/Navigation/Navigation";
import { Guess } from "./components/Guess/Guess";
import { extendTheme } from "@chakra-ui/react";
import { Footer } from "./components/Footer/Footer";

const config = { initialColorMode: "dark", useSystemColorMode: false };
const theme = extendTheme({ config });

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Navigation />
      <main className="flex justify-between flex-col items-center py-11">
        <Guess />
      </main>
      <Footer />
    </ChakraProvider>
  );
}
