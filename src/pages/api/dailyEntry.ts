// pages/api/daily-entry.js
import supabase from "../../app/supabase";
interface Entry {
  id: number;
  text: string;
  lang: string;
  english_translation: string;
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);

    try {
      const totalEntries = 60;

      const randomOffset = Math.floor(Math.random() * totalEntries) + 1;

      const { data, error } = await supabase
        .from("random_texts")
        .select("*")
        .eq("id", randomOffset);

      if (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(data);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
