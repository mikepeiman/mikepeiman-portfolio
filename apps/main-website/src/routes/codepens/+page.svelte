<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let searchQuery = '';
	let filteredItems = [];

	// Collection of animations/experiments
	const codepenItems = [
		{
			id: 'floating-dots',
			title: 'Floating Dots',
			description: 'Animated dots floating upward with rotation effects and gradient background',
			tags: ['animation', 'dots', 'float', 'css'],
			component: 'FloatingDots',
			route: '/codepens/floating-dots'
		},
		{
			id: 'pulsing-orb',
			title: 'Pulsing Orb',
			description: 'Glowing orb with pulsing animation and inner light effects',
			tags: ['animation', 'orb', 'pulse', 'glow'],
			component: 'PulsingOrb',
			route: '/codepens/pulsing-orb'
		},
		{
			id: 'rotating-squares',
			title: 'Rotating Squares',
			description: 'Multiple rotating squares with different sizes, colors and timing',
			tags: ['animation', 'squares', 'rotate', 'geometric'],
			component: 'RotatingSquares',
			route: '/codepens/rotating-squares'
		},
		{
			id: 'wave-animation',
			title: 'Wave Animation',
			description: 'Flowing wave patterns with gradient colors and smooth transitions',
			tags: ['animation', 'waves', 'flow', 'gradient'],
			component: 'WaveAnimation',
			route: '/codepens/wave-animation'
		},
		{
			id: 'sliding-bars',
			title: 'Sliding Bars',
			description: 'Animated bars that slide up and down with scaling effects',
			tags: ['animation', 'bars', 'slide', 'scale'],
			component: 'SlidingBars',
			route: '/codepens/sliding-bars'
		},
		{
			id: 'spinning-loader',
			title: 'Spinning Loader',
			description: 'Multi-ring spinning loader with different rotation speeds',
			tags: ['animation', 'loader', 'spinner', 'loading'],
			component: 'SpinningLoader',
			route: '/codepens/spinning-loader'
		}
	];

	// Fuzzy search function
	function fuzzySearch(items, query) {
		if (!query.trim()) return items;

		const searchTerms = query
			.toLowerCase()
			.split(' ')
			.filter((term) => term.length > 0);

		return items.filter((item) => {
			const searchableText =
				`${item.title} ${item.description} ${item.tags.join(' ')}`.toLowerCase();

			return searchTerms.every((term) => {
				// Check for exact matches first
				if (searchableText.includes(term)) return true;

				// Then check for fuzzy matches
				return searchableText.split(' ').some((word) => {
					if (word.length < 3) return word.includes(term);

					let matches = 0;
					let termIndex = 0;

					for (let i = 0; i < word.length && termIndex < term.length; i++) {
						if (word[i] === term[termIndex]) {
							matches++;
							termIndex++;
						}
					}

					return matches >= Math.ceil(term.length * 0.7);
				});
			});
		});
	}

	// Reactive search
	$: filteredItems = fuzzySearch(codepenItems, searchQuery);

	function navigateToItem(route) {
		goto(route);
	}

	onMount(() => {
		filteredItems = codepenItems;
	});
</script>

<svelte:head>
	<title>CodePen Collection - Animation Experiments</title>
	<meta name="description" content="A collection of CSS animations and interactive experiments" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<!-- Header -->
	<div class="relative overflow-hidden bg-black/20 backdrop-blur-sm border-b border-white/10">
		<div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
		<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="text-center">
				<h1 class="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
					<span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
						CodePen
					</span>
					<span class="text-white">Collection</span>
				</h1>
				<p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
					A curated collection of CSS animations, interactive experiments, and creative code
					snippets
				</p>

				<!-- Search Bar -->
				<div class="relative max-w-md mx-auto">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
						<svg
							class="h-5 w-5 text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
					<input
						bind:value={searchQuery}
						type="text"
						placeholder="Search animations..."
						class="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
					/>
				</div>
			</div>
		</div>
	</div>

	<!-- Main Content -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<!-- Results Count -->
		<div class="mb-8">
			<p class="text-gray-400 text-center">
				{#if searchQuery}
					Showing {filteredItems.length} of {codepenItems.length} animations
				{:else}
					{codepenItems.length} animations available
				{/if}
			</p>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredItems as item (item.id)}
				<div
					class="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
				>
					<!-- Thumbnail Container -->
					<div
						class="relative h-48 bg-gradient-to-br from-purple-600/20 to-pink-600/20 overflow-hidden"
					>
						<!-- Animated Preview -->
						<div class="absolute inset-0 flex items-center justify-center">
							{#if item.component === 'FloatingDots'}
								<div class="relative w-full h-full">
									{#each Array(3) as _, i}
										<div
											class="absolute w-2 h-2 bg-white/60 rounded-full animate-bounce"
											style="left: {20 + i * 30}%; animation-delay: {i *
												0.2}s; animation-duration: 2s;"
										></div>
									{/each}
								</div>
							{:else if item.component === 'PulsingOrb'}
								<div
									class="w-16 h-16 bg-gradient-to-r from-red-400 to-teal-400 rounded-full animate-pulse shadow-lg shadow-red-400/50"
								></div>
							{:else if item.component === 'RotatingSquares'}
								<div class="relative">
									{#each Array(2) as _, i}
										<div
											class="absolute w-8 h-8 border-2 border-white/60 animate-spin"
											style="animation-delay: {i * 0.5}s; animation-duration: 2s; left: -{i *
												4}px; top: -{i * 4}px;"
										></div>
									{/each}
								</div>
							{:else if item.component === 'WaveAnimation'}
								<div class="flex space-x-1">
									{#each Array(5) as _, i}
										<div
											class="w-2 h-8 bg-gradient-to-t from-blue-400 to-teal-400 animate-pulse"
											style="animation-delay: {i * 0.1}s; animation-duration: 1.5s;"
										></div>
									{/each}
								</div>
							{:else if item.component === 'SlidingBars'}
								<div class="flex space-x-2 items-end">
									{#each Array(4) as _, i}
										<div
											class="w-3 bg-gradient-to-t from-purple-400 to-pink-400 animate-bounce"
											style="height: {20 + i * 5}px; animation-delay: {i *
												0.1}s; animation-duration: 1s;"
										></div>
									{/each}
								</div>
							{:else if item.component === 'SpinningLoader'}
								<div class="relative">
									<div
										class="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin"
									></div>
									<div
										class="absolute top-2 left-2 w-8 h-8 border-2 border-white/20 border-r-white/60 rounded-full animate-spin"
										style="animation-direction: reverse; animation-duration: 1.5s;"
									></div>
								</div>
							{/if}
						</div>

						<!-- Hover Overlay -->
						<div
							class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						></div>

						<!-- Play Button -->
						<div
							class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						>
							<div class="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
								<svg class="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8 5v14l11-7z" />
								</svg>
							</div>
						</div>
					</div>

					<!-- Content -->
					<div class="p-6">
						<h3
							class="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors duration-200"
						>
							{item.title}
						</h3>
						<p class="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
							{item.description}
						</p>

						<!-- Tags -->
						<div class="flex flex-wrap gap-2 mb-4">
							{#each item.tags.slice(0, 3) as tag}
								<span
									class="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full border border-white/20"
								>
									{tag}
								</span>
							{/each}
							{#if item.tags.length > 3}
								<span class="px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-full">
									+{item.tags.length - 3}
								</span>
							{/if}
						</div>

						<!-- Action Button -->
						<button
							on:click={() => navigateToItem(item.route)}
							class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
						>
							View Animation
						</button>
					</div>
				</div>
			{/each}
		</div>

		<!-- Empty State -->
		{#if filteredItems.length === 0}
			<div class="text-center py-16">
				<div class="mb-4">
					<svg
						class="mx-auto h-16 w-16 text-gray-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="1"
							d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.881-6.087-2.33l-.012-.012A7.936 7.936 0 014 9c0-1.933.685-3.711 1.826-5.1L7.05 5.125A5.963 5.963 0 0112 3c1.933 0 3.711.685 5.1 1.826l1.225 1.224A5.963 5.963 0 0120 9a7.936 7.936 0 01-1.9 5.158l-.012.012A7.962 7.962 0 0112 15z"
						></path>
					</svg>
				</div>
				<h3 class="text-xl font-medium text-gray-300 mb-2">No animations found</h3>
				<p class="text-gray-500">Try adjusting your search terms or browse all animations.</p>
				{#if searchQuery}
					<button
						on:click={() => (searchQuery = '')}
						class="mt-4 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg transition-colors duration-200"
					>
						Clear Search
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	@keyframes bounce {
		0%,
		20%,
		53%,
		80%,
		100% {
			transform: translate3d(0, 0, 0);
		}
		40%,
		43% {
			transform: translate3d(0, -8px, 0);
		}
		70% {
			transform: translate3d(0, -4px, 0);
		}
		90% {
			transform: translate3d(0, -2px, 0);
		}
	}
</style>
