<script lang="ts">
import DeckTile from "~/lib/DeckTile.svelte";
import NewDeckTile from "~/lib/NewDeckTile.svelte";
import { db } from "~/supabase";
import { DateTime } from "luxon";

import type { Deck, DeckUpdate } from "~/types";
import type { PageData } from "./$types";

export let data: PageData;

$: decks = data.decks;

let isInitializingId: number | null = null;

const onNewDeckCreated = () => {
  const newDeck: Deck = {
    id: -1,
    name: "New deck",
    created_by: "guest",
    created_at: DateTime.now(),
    updated_at: DateTime.now(),
  };

  decks = [...decks, newDeck];
  isInitializingId = newDeck.id;
};

const onNewDeckInitialized = async (e: CustomEvent<DeckUpdate>) => {
  try {
    const deck = e.detail;
    const initDeckResponse = await db.from("decks").insert(deck.data).select("*");

    if (!initDeckResponse.data || !initDeckResponse.data.length) {
      throw new Error("Failed to create deck");
    }

    const initializedDeck = initDeckResponse.data.at(0) as Deck;
    const newDeckIdx = decks.findIndex((d) => d.id === deck.id);
    decks.splice(newDeckIdx, 1, initializedDeck);
  } catch (e: unknown) {
    console.log(e);
  }
};
</script>

<h1>Decks</h1>
<div class="flex p-5 gap-4">
  {#each decks as deck}
    <DeckTile
      props={deck}
      isInitializing={deck.id === isInitializingId}
      on:initialized={onNewDeckInitialized}
    />
  {/each}
  {#if isInitializingId === null}
    <NewDeckTile on:click={onNewDeckCreated} />
  {/if}
</div>
