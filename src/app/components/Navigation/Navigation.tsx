import { CalendarIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import React from "react";

export const Navigation = () => {
  const fullDate = new Date();
  const today = fullDate.toISOString().split("T")[0];

  const Streak = 0;
  return (
    <Flex direction="row" justifyContent="left" align="center">
      <Box>
        <Button disabled variant="ghost">
          Home
        </Button>
        <Button variant="ghost">Language guessing</Button>
        <Button disabled variant="ghost">
          Flag guessing
        </Button>
      </Box>
      <Box>
        <Button color="gray" variant="outlined" leftIcon={<CalendarIcon />}>
          <Text>{today}</Text>
        </Button>
        <Button color="gray" variant="outlined" rightIcon={<StarIcon />}>
          <Text>Streak: {Streak}</Text>
        </Button>
      </Box>
    </Flex>
  );
};
