"use client";
import Image from "next/image";
import { ChakraProvider } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Navigation } from "./components/Navigation/Navigation";
import { Guess } from "./components/Guess/Guess";
import { extendTheme } from "@chakra-ui/react";

const config = { initialColorMode: "dark", useSystemColorMode: false };
const theme = extendTheme({ config });

export default function Home() {
  return (
    <ChakraProvider theme={theme}>
      <Navigation />
      <div className="body h-screen p-4 md:p-8 lg:p-48 lg:px-[25%]">
        <Guess />
      </div>
    </ChakraProvider>
  );
}
