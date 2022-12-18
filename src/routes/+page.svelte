<script>
import { db } from "../supabase";

const cardCount = db
  .from("cards")
  .select("*", { count: "estimated" })
  .then((data) => data.count);
</script>

<h1>Welcome to SvelteKit</h1>
<p># of cards: {#await cardCount} ... {:then count} {count} {/await}</p>
