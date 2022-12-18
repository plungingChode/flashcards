import { db, toDeck } from "~/supabase";
import type { Deck } from "~/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async () => {
  const { data: decksResult } = await db.from("decks").select("*");
  // const cardCounts = db.from("cards").select()

  console.log("ok??");
  const decks: Deck[] = (decksResult || []).map(toDeck);

  return {
    decks,
  };
};
