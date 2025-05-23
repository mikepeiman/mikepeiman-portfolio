<!-- Nav.svelte -->
<script>
	import NavButton from './NavButton.svelte';
	import NavBreadcrumb from './NavBreadcrumb.svelte';
	import GitHubLink from './GitHubLink.svelte';

	// Accept page data as props
	let { currentPath = '/', pageSlug = null, onNavigate = () => {} } = $props();

	// Derived reactive values
	const isHomePage = $derived(currentPath === '/codepens');
</script>

<nav
	class="bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10 sticky top-0 z-50"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<div class="flex items-center space-x-4">
				<NavButton {onNavigate} />
				
				{#if !isHomePage}
					<NavBreadcrumb {pageSlug} />
				{/if}
			</div>

			<div class="flex items-center space-x-4">
				<GitHubLink />
			</div>
		</div>
	</div>
</nav>