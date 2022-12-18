import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import type { Deck, DeckDto } from "./types";

const DATABASE_URL = import.meta.env.VITE_SUPABASE_DB_URL;
const API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

export const db = createClient(DATABASE_URL, API_KEY);

export function toDeck(dto: DeckDto): Deck {
  return {
    id: dto.id,
    name: dto.name,
    created_by: dto.created_by,
    created_at: DateTime.fromISO(dto.created_at),
    updated_at: DateTime.fromISO(dto.updated_at),
  };
}
