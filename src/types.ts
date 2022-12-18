import type { DateTime } from "luxon";

export type Deck = {
  id: number;
  name: string;
  created_by: string;
  created_at: DateTime;
  updated_at: DateTime;
};

export type DeckDto = {
  id: number;
  name: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export type DeckUpdateProps = {
  name: string;
  created_by: string;
};

export type DeckUpdate = {
  id: number;
  data: DeckUpdateProps;
};
