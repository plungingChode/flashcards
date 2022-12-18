import { DateTime } from "luxon";
import { db, toDeck } from "~/supabase";
import { error } from "@sveltejs/kit";
import type { Deck, DeckDto } from "~/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const { id } = params;
  const { data: dtos, error: err } = await db.from("decks").select("*");

  console.log("what????");
  console.log(err);
  
  const dto = dtos?.at(0);
  
  if (err || !dto) {
    throw error(404, "Deck not found");
  }

  const deck = toDeck(dto);

  return {
    deck,
  };
};
