import supabase from "../../app/supabase";
import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  } else {
    const fullDate = new Date();
    const now = fullDate.toISOString().split("T")[0];

    const totalEntries = 60;
    const random = Math.floor(Math.random() * totalEntries) + 1;

    const { data, error } = await supabase
      .from("log_db")
      .select("*")
      .eq("date", now);

    if (error) {
      return res.status(500).json({ message: { error } });
    } else {
      if (data.length === 0) {
        try {
          const { error } = await supabase
            .from("log_db")
            .insert({ id: random, date: now });
          return res.status(500).json({ message: "INSERTED" });
        } catch (err) {
          return res.status(500).json({ message: err });
        }
      }
    }
  }
}
