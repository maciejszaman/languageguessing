import { Button, IconButton, Text } from "@chakra-ui/react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import HomeIcon from "@mui/icons-material/Home";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import React from "react";

export const Navigation = () => {
  const fullDate = new Date();
  const today = fullDate.toISOString().split("T")[0];
  let isCompleteToday = false;
  if (localStorage.getItem(today) === "won") {
    isCompleteToday = true;
  } else {
    isCompleteToday = false;
  }

  const Streak = localStorage.getItem("streak");
  return (
    <div className="flex justify-between">
      <div className="group hidden md:flex">
        <Button color="gray" disabled variant="ghost">
          Home
        </Button>
        <Button variant="ghost">Language guessing</Button>
      </div>
      <div className="group md:hidden">
        <IconButton
          aria-label="Home"
          icon={<HomeIcon />}
          color="gray"
          disabled
          variant="ghost"
        />
        <IconButton
          aria-label="Language guessing"
          icon={<GTranslateIcon />}
          variant="ghost"
        />
      </div>
      <div className="group hidden md:block">
        <Button
          color="gray"
          variant="outlined"
          leftIcon={<CalendarMonthIcon />}
        >
          <Text>{today}</Text>
        </Button>
        <Button
          color={isCompleteToday ? "orange" : "gray"}
          variant="outlined"
          rightIcon={<WhatshotIcon />}
        >
          <Text>Streak: {Streak}</Text>
        </Button>
      </div>
      <div className="group md:hidden">
        <Button
          color="gray"
          variant="outlined"
          leftIcon={<CalendarMonthIcon />}
        >
          <Text>{today}</Text>
        </Button>
        <Button
          color={isCompleteToday ? "orange" : "gray"}
          variant="outlined"
          rightIcon={<WhatshotIcon />}
        >
          <Text>{Streak}</Text>
        </Button>
      </div>
    </div>
  );
};
