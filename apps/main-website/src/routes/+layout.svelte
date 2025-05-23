<!-- +layout.svelte -->
<script>
	let { children } = $props();
	import '../app.css';
	import { Nav } from '@mikepeiman-portfolio/common';
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<Nav />

	<!-- Main Content -->
	<main>
		{@render children()}
	</main>
</div>
