<!-- +layout.svelte -->
<script>
	let { children } = $props();
	import '$lib/styles/app.css';
	import { Nav } from '@mikepeiman-portfolio/common';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	// Derived reactive values for Nav component
	const currentPath = $derived($page.url.pathname);
	const pageSlug = $derived($page.params?.slug);

	const handleNavigate = (path) => {
		goto(path);
	};
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<Nav {currentPath} {pageSlug} onNavigate={handleNavigate} />

	<!-- Main Content -->
	<main>
		{@render children()}
	</main>
</div>
