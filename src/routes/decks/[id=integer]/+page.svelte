<script lang="ts">
import type { PageData } from "./$types";

export const ssr = false;
export let data: PageData;

const { deck } = data;

</script>

<h1>{deck.name}</h1>
<h4>by {deck.created_by}</h4>