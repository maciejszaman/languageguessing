"use client";
import {
  Button,
  Collapse,
  Divider,
  Fade,
  Heading,
  Icon,
  Input,
  Tag,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  CheckIcon,
  CloseIcon,
  QuestionOutlineIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import Confetti from "react-confetti";
import { TranslationModal } from "./TranslationModal/TranslationModal";
import axios from "axios";

export const Guess = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<Entry>();
  const [guessesLeft, setGuessesLeft] = useState(2);
  const [answer, setAnswer] = useState("");
  const [firstWrongAnswer, setFirstWrongAnswer] = useState<string | null>(null);
  const [secondWrongAnswer, setSecondWrongAnswer] = useState<string | null>(
    null
  );
  const [streak, setStreak] = useState<string | null>("0");

  const [won, setWon] = useState(false);
  const [failed, setFailed] = useState(false);

  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isClient, setIsClient] = useState(false);

  const fullDate = new Date();
  const todaysDate = fullDate.toISOString().split("T")[0];

  interface WindowSize {
    width: number | undefined;
    height: number | undefined;
  }

  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  const fetchEntry = async () => {
    const res = await axios.get("api/dailyEntry");
    const data = res.data.message;
    if (data) {
      setData(data[0]);
      setAnswer(data[0].lang);
    } else {
      console.log(Error);
    }
  };

  interface Entry {
    id: number;
    text: string;
    lang: string;
    english_translation: string;
  }

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      submitGuess(inputValue);
    }
  };

  const saveScore = (result: string) => {
    try {
      localStorage.setItem(todaysDate, result);
      console.log(todaysDate + result);
    } catch (err) {
      console.error("Error saving the score: ", err);
    }
  };

  const submitGuess = (guess: string) => {
    if (won || failed) {
      console.log("You can't guess anymore, you already won or lost");
    } else {
      if (guess === answer) {
        setWon(true);
        saveScore("won");
        localStorage.setItem("streak", (Number(streak) + 1).toString());
        setGuessesLeft(guessesLeft - 1);
        setShowConfetti(true);
        setTimeout(() => {
          setShowConfetti(false);
        }, 3000);
      } else {
        if (guessesLeft === 1) {
          setGuessesLeft(guessesLeft - 1);
          setFailed(true);
          saveScore("failed");
          localStorage.setItem("streak", "0");
          setShake(true);
          setTimeout(() => {
            setShake(false);
          }, 500);
        }

        setGuessesLeft(guessesLeft - 1);
        if (firstWrongAnswer == null) {
          setFirstWrongAnswer(guess);
        } else {
          setSecondWrongAnswer(guess);
        }
        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 500);
        {
        }
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
    setWindowSize({
      width: window.screen.width,
      height: window.screen.height,
    });
    fetchEntry();
    if (streak === null) {
      localStorage.setItem("streak", "0");
    }
    const todaysScore = localStorage.getItem(todaysDate);
    if (todaysScore === "won") {
      setWon(true);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      setGuessesLeft(0);
    } else if (todaysScore === "failed") {
      setFailed(true);
      setGuessesLeft(0);
    }
    if (localStorage.getItem("streak") !== null) {
      setStreak(localStorage.getItem("streak"));
    } else {
      setStreak("0");
    }
  }, []);

  return (
    <section
      about="language guessing game"
      className="flex flex-col gap-8 p-4 max-w-md"
    >
      {isClient ? (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={showConfetti ? 250 : 0}
          className="w-full"
        />
      ) : null}
      <div className="text">
        {data ? <Heading>{data.text}</Heading> : <Heading>Loading...</Heading>}
      </div>
      <Collapse in={won} animateOpacity>
        <div className="p-6 bg-green-500 text-white flex flex-row gap-4 ">
          <div className="left items-center">
            <Icon w={7} h={7} as={CheckIcon} />
          </div>
          <div className="right flex flex-col gap-2">
            <div className="top">
              <span>Correct! This text was written in </span>
              <span className="font-semibold">{data?.lang}</span>
            </div>
            <div className="bottom flex gap-4">
              <Button
                rightIcon={<CopyIcon />}
                colorScheme="white"
                size="sm"
                variant="outline"
                onClick={onOpen}
              >
                TRANSLATION
              </Button>
            </div>
          </div>
        </div>
      </Collapse>
      <Collapse in={failed} animateOpacity>
        <div className="p-6 bg-red-600 text-white flex flex-row gap-4 ">
          <div className="left items-center">
            <Icon w={7} h={7} as={CloseIcon} />
          </div>
          <div className="right flex flex-col gap-2">
            <div className="top">
              <span>Out of tries. This text was written in </span>
              <span className="font-semibold">{data?.lang}</span>
            </div>
            <div className="bottom flex gap-4">
              <Button
                rightIcon={<CopyIcon />}
                colorScheme="white"
                size="sm"
                variant="outline"
                onClick={onOpen}
              >
                TRANSLATION
              </Button>
            </div>
          </div>
        </div>
      </Collapse>

      <Divider />
      <div className="bottomtext">
        <div className="flex p-1 px-3">
          <div className={shake ? "animate-bounce flex gap-1" : "flex gap-1"}>
            <Icon className="self-center" as={QuestionOutlineIcon} />
            <Text>{guessesLeft} guesses left</Text>
          </div>
        </div>
        <div className="flex gap-4">
          <Input
            disabled={won || failed}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="The language of the text above"
            onKeyDown={handleKeyDown}
          />
          <Button onClick={() => submitGuess(inputValue)}>Guess</Button>
        </div>
        <div className="underinput mt-2 flex">
          <div className="flex flex-col gap-2 w-fit">
            <Fade in={firstWrongAnswer !== null}>
              {firstWrongAnswer ? (
                <Tag>
                  <div className="flex gap-1 items-center">
                    <CloseIcon boxSize={3} />
                    {firstWrongAnswer}
                  </div>
                </Tag>
              ) : (
                <Tag></Tag>
              )}
            </Fade>
            <Fade in={secondWrongAnswer !== null}>
              {secondWrongAnswer ? (
                <Tag>
                  <div className="flex gap-1 items-center">
                    <CloseIcon boxSize={3} />
                    {secondWrongAnswer}
                  </div>
                </Tag>
              ) : (
                <Tag></Tag>
              )}
            </Fade>
          </div>
        </div>
      </div>
      {data ? (
        <TranslationModal
          onClose={onClose}
          isOpen={isOpen}
          language={data.lang}
          text={data.text}
          englishTranslation={data.english_translation}
        />
      ) : null}
    </section>
  );
};
