import {
  Box,
  Button,
  Collapse,
  Divider,
  Heading,
  Icon,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import supabase from "@/app/supabase";
import { CheckIcon, CloseIcon, QuestionOutlineIcon } from "@chakra-ui/icons";

export const Guess = () => {
  const [inputValue, setInputValue] = useState("");
  const [guessesLeft, setGuessesLeft] = useState(2);
  const [failed, setFailed] = useState(false);
  const [won, setWon] = useState(false);
  const [answer, setAnswer] = useState("");

  const [data, setData] = useState<Entry>();

  const totalEntries = 14;

  const randomOffset = Math.floor(Math.random() * totalEntries) + 1;

  const fetchEntry = async () => {
    const { data, error } = await supabase
      .from("random_texts")
      .select("*")
      .eq("id", randomOffset);
    if (data) {
      setData(data[0]);
      setAnswer(data[0].lang);
    } else {
      console.log(error);
    }
  };

  interface Entry {
    id: number;
    text: string;
    lang: string;
  }

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      submitGuess(inputValue);
    }
  };

  const submitGuess = (guess: string) => {
    if (won || failed) {
      console.log("You can't guess anymore, you already won or lost");
    } else {
      if (guess === answer) {
        setWon(true);
        setGuessesLeft(guessesLeft - 1);
      } else {
        if (guessesLeft === 1) {
          setGuessesLeft(guessesLeft - 1);
          setFailed(true);
        }
        setGuessesLeft(guessesLeft - 1);
        {
        }
      }
    }
  };

  useEffect(() => {
    fetchEntry();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="text">
        {data ? <Heading>{data.text}</Heading> : <Heading>Loading...</Heading>}
      </div>
      <Collapse in={won} animateOpacity>
        <div className="p-6 bg-green-500 text-white ">
          <Icon w={7} h={7} as={CheckIcon} />
          <span className="pl-3">Correct! This text is written in </span>
          <span className="font-semibold">{data?.lang}</span>
        </div>
      </Collapse>
      <Collapse in={failed} animateOpacity>
        <div className="p-6 bg-red-600 text-white ">
          <Icon w={7} h={7} as={CloseIcon} />
          <span className="pl-3">Out of tries. This text is written in </span>
          <span className="font-semibold">{data?.lang}</span>
        </div>
      </Collapse>

      <Divider />
      <div className="bottomtext">
        <div className="flex p-1 px-3">
          <div className={"flex gap-1"}>
            <Icon className="self-center" as={QuestionOutlineIcon} />
            <p>{guessesLeft} guesses left</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="The language of the text above"
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => submitGuess(inputValue)}>Guess</Button>
        </div>
      </div>
    </div>
  );
};
