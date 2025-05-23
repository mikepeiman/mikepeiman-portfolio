<!-- NavBreadcrumb.svelte -->
<script>
  let { pageSlug } = $props();
</script>

<div class="text-gray-400">|</div>
<div class="text-gray-300">
  {pageSlug || "Animation"}
</div>
