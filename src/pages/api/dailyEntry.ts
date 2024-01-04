import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../app/supabase";

interface LogEntry {
  id: number;
  date: string;
}

interface RandomTextsEntry {
  id: number;
  lang: string;
  text: string;
  english_translation: string;
}

const searchForID = async (id: number) => {
  const { data } = await supabase.from("random_texts").select("*").eq("id", id);
  return data;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //check for method
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  } else {
    //first get the date
    const fullDate = new Date();
    const now = fullDate.toISOString().split("T")[0];

    console.log(now);

    //now get a random entry
    const totalEntries = 60;
    const random = Math.floor(Math.random() * totalEntries) + 1;

    //search for something that was already generated for today's date
    const { data, error } = await supabase
      .from("log_db")
      .select("*")
      .eq("date", now);

    const LogData: LogEntry[] | null = data;

    if (LogData) {
      //check if it returned anything for today
      if (LogData.length === 0) {
        try {
          //if not, then input today's date with a random entry number
          const { error } = await supabase
            .from("log_db")
            .insert({ id: random, date: now });

          //and then get an entry with the ID generated
          const todaysEntryGenerated = await searchForID(random);

          //return with the entry for today
          res.status(200).json({ message: todaysEntryGenerated });
        } catch (err) {
          res.status(500).json({ message: err });
        }
      } else {
        try {
          //if there is, get the entry with the ID associated
          const todaysEntry = await searchForID(LogData[0].id);

          //return with the entry for today
          return res.status(200).json({ message: todaysEntry });
        } catch (err) {
          res.status(500).json({ message: err });
        }
      }
    } else {
      //in case the search for the log failed
      return res.status(404).json({ message: "Log fetch failed" });
    }
  }
}
