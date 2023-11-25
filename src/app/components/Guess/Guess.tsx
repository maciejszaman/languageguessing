import { Button, Divider, Heading, Icon, Input } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import supabase from "@/app/supabase";
import { CloseIcon } from "@chakra-ui/icons";

export const Guess = () => {
  const [inputValue, setInputValue] = useState("");
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [failed, setFailed] = useState(false);
  const [won, setWon] = useState(false);
  const [answer, setAnswer] = useState("");

  const [data, setData] = useState<Entry>();

  const totalEntries = 13;

  const randomOffset = Math.floor(Math.random() * totalEntries) + 1;

  const fetchEntry = async () => {
    const { data, error } = await supabase
      .from("random_texts")
      .select("*")
      .eq("id", randomOffset);

    console.log(data);
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

  const submitGuess = (guess: string) => {
    if (won || failed) {
      console.log("You can't guess anymore, you already won or lost");
    } else {
      if (guess === answer) {
        setWon(true);
      } else {
        if (wrongGuesses !== 3) {
          setWrongGuesses(wrongGuesses + 1);
        } else {
          setFailed(true);
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

      <Divider />
      <div className="bottomtext">
        <div className="flex p-1 px-3">
          <div
            className={
              wrongGuesses
                ? "flex gap-1 animate-wrongGuessAnimation"
                : "flex gap-1"
            }
          >
            <p>
              {wrongGuesses}/{3}
            </p>
            <Icon as={CloseIcon} className="self-center" boxSize={3} />
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="The language of the text above"
          />
          <Button onClick={() => submitGuess(inputValue)}>Guess</Button>
        </div>
      </div>
      <div className="div">
        <p>inputValue: {inputValue}</p>
        <p>wrongGuesses: {wrongGuesses}</p>
        <p>failed: {failed ? "true" : "false"}</p>
        <p>won: {won ? "true" : "false"}</p>
      </div>
    </div>
  );
};
