<script lang="ts" context="module">
import type { Deck, DeckUpdate, DeckUpdateProps } from "~/types";
import type { DateTime } from "luxon";

import * as Stretchy from "stretchy";

import "./DeckTile.css";
import { createEventDispatcher } from "svelte";

const formatDate = (d: DateTime) => {
  // TODO display stuff like "yesterday", "last week" using `toRelativeCalendar`
  return d.toFormat("yyyy LLL dd");
};

const asDeckUpdateProps: (deck: Deck) => DeckUpdateProps = (deck) => {
  return {
    name: deck.name,
    created_by: deck.created_by,
  };
};
</script>

<script lang="ts">
export let props: Deck;
export let isInitializing: boolean = false;
let isEdited: boolean = false;

const dispatch = createEventDispatcher<{
  initialized: DeckUpdate;
  edited: DeckUpdate;
}>();

$: if (isEdited || isInitializing) {
  Stretchy.init();
}

let editedProps = asDeckUpdateProps(props);

const onSubmit = () => {
  if (isInitializing) {
    dispatch("initialized", { id: props.id, data: editedProps });
  }
};
</script>

{#if isEdited || isInitializing}
  <div
    class="flex flex-col w-96 h-52 border-2 p-4 rounded-lg"
    class:border-gray-500;border-dashed={isInitializing}
  >
    <textarea
      type="text"
      maxlength="128"
      bind:value={editedProps.name}
      class="
        w-full border-b-2 border-solid border-black text-xl 
        font-bold resize-none
      "
    />
    <div class="flex gap-2 mt-1 self-end">
      by
      <input
        type="text"
        bind:value={editedProps.created_by}
        class="min-w-[10ch] border-b border-solid border-black text-end"
      />
    </div>

    <div class="grid grid-cols-2 grid-rows-3 mt-auto">
      <span class="row-start-1">C {formatDate(props.created_at)}</span>
      <span class="row-start-2">U {formatDate(props.updated_at)}</span>
      <span class="row-start-3">0 cards</span>

      <div class="row-start-1 row-span-full col-start-2">
        <button on:click={onSubmit}>OK</button>
      </div>
    </div>
  </div>
{:else}
  <a
    class="flex flex-col w-96 h-52 border-2 p-4 rounded-lg"
    href="/decks/{props.id.toString()}"
    data-sveltekit-preload-data="tap"
  >
    <h4 class="text-xl font-bold">{props.name}</h4>
    <span>by {props.created_by}</span>

    <div class="grid grid-cols-2 grid-rows-3 mt-auto">
      <span class="row-start-1">C {formatDate(props.created_at)}</span>
      <span class="row-start-2">U {formatDate(props.updated_at)}</span>
      <span class="row-start-3">0 cards</span>
    </div>
  </a>
{/if}
