<!-- NavButton.svelte -->
<script>
  import { goto } from "$app/navigation";

  const handleClick = () => {
    goto("/codepens");
  };
</script>

<button
  on:click={handleClick}
  class="text-white hover:text-purple-300 transition-colors duration-200 flex items-center space-x-2">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
  </svg>
  <span class="font-medium">Back to Collection</span>
</button>
