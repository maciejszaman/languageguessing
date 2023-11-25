import { Button, Stack } from "@chakra-ui/react";
import React from "react";

export const Navigation = () => {
  return (
    <Stack direction="row" spacing={4} align="center">
      <Button disabled variant="ghost">
        Home
      </Button>
      <Button variant="ghost">Language guessing</Button>
      <Button disabled variant="ghost">
        Flag guessing
      </Button>
    </Stack>
  );
};
