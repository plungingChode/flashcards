<script lang="ts">
import { createEventDispatcher } from "svelte";
import "./DeckTile.css";

const dispatch = createEventDispatcher<{
  click: void;
}>();

const handleClick = () => {
  dispatch("click");
};
</script>

<button
  on:click={handleClick}
  class="
    deck-tile
    grid place-items-center w-96 h-52
    border-2 border-dashed border-gray-500 rounded-lg text-lg
    cursor-pointer shadow-md shadow-black/20
    hover:shadow-lg hover:shadow-black/30
  "
>
  New deck +
</button>
