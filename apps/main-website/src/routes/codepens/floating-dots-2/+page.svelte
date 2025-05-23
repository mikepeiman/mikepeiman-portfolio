<script>
	import { onMount } from 'svelte';

	let showCode = false;
	let copySuccess = false;

	// Floating dots animation component

	async function copyCode() {
		try {
			await navigator.clipboard.writeText(codeSnippet);
			copySuccess = true;
			setTimeout(() => (copySuccess = false), 2000);
		} catch (err) {
			console.error('Failed to copy code:', err);
		}
	}
</script>

<svelte:head>
	<title>Floating Dots Animation - CodePen Collection</title>
	<meta
		name="description"
		content="Animated dots floating upward with rotation effects and gradient background"
	/>
</svelte:head>

<div class="floating-container">
	{#each Array(6) as _, i}
		<div class="dot dot-{i + 1}"></div>
	{/each}
</div>

<div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<!-- Header -->
	<div class="text-center mb-12">
		<h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
			<span class="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
				Floating Dots
			</span>
		</h1>
		<p class="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
			Animated dots floating upward with rotation effects and gradient background. Perfect for
			creating dynamic and engaging user interfaces.
		</p>

		<!-- Tags -->
		<div class="flex flex-wrap justify-center gap-2 mb-8">
			{#each ['CSS Animation', 'Keyframes', 'Transform', 'Gradient', 'Floating Effect'] as tag}
				<span
					class="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full border border-white/20"
				>
					{tag}
				</span>
			{/each}
		</div>
	</div>

	<!-- Animation Demo -->
	<div class="mb-12">
		<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
			<div class="floating-container">
				{#each Array(6) as _, i}
					<div class="dot dot-{i + 1}"></div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Controls -->
	<div class="flex flex-wrap gap-4 justify-center mb-12">
		<button
			on:click={() => (showCode = !showCode)}
			class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
		>
			{showCode ? 'Hide Code' : 'Show Code'}
		</button>

		<button
			on:click={copyCode}
			class="bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 flex items-center space-x-2"
		>
			<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
				></path>
			</svg>
			<span>{copySuccess ? 'Copied!' : 'Copy Code'}</span>
		</button>
	</div>

	<!-- Code Display -->
	{#if showCode}
		<div class="mb-12">
			<div
				class="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
			>
				<div class="flex items-center justify-between px-6 py-4 border-b border-white/10">
					<h3 class="text-lg font-medium text-white">FloatingDots.svelte</h3>
					<button
						on:click={copyCode}
						class="text-gray-400 hover:text-white transition-colors duration-200"
						title="Copy to clipboard"
					>
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
							></path>
						</svg>
					</button>
				</div>
				<div class="p-6 overflow-x-auto">
					<pre class="text-sm text-gray-300 leading-relaxed"><code>{codeSnippet}</code></pre>
				</div>
			</div>
		</div>
	{/if}

	<!-- Technical Details -->
	<div class="grid md:grid-cols-2 gap-8 mb-12">
		<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
			<h3 class="text-xl font-bold text-white mb-4">Animation Details</h3>
			<ul class="space-y-2 text-gray-300">
				<li><strong class="text-white">Duration:</strong> 6 seconds per cycle</li>
				<li><strong class="text-white">Timing:</strong> ease-in-out</li>
				<li><strong class="text-white">Properties:</strong> transform, opacity</li>
				<li><strong class="text-white">Transforms:</strong> translateY, rotate</li>
				<li><strong class="text-white">Performance:</strong> GPU accelerated</li>
			</ul>
		</div>

		<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
			<h3 class="text-xl font-bold text-white mb-4">Use Cases</h3>
			<ul class="space-y-2 text-gray-300">
				<li>• Loading animations</li>
				<li>• Background effects</li>
				<li>• Hero section decoration</li>
				<li>• Interactive particles</li>
				<li>• Ambient UI elements</li>
			</ul>
		</div>
	</div>

	<!-- Customization Tips -->
	<div class="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
		<h3 class="text-2xl font-bold text-white mb-6">Customization Tips</h3>
		<div class="grid md:grid-cols-2 gap-6 text-gray-300">
			<div>
				<h4 class="text-white font-semibold mb-2">Animation Speed</h4>
				<p class="text-sm">
					Modify the <code class="bg-black/30 px-1 rounded">animation-duration</code> to make dots float
					faster or slower.
				</p>
			</div>
			<div>
				<h4 class="text-white font-semibold mb-2">Dot Size</h4>
				<p class="text-sm">
					Change <code class="bg-black/30 px-1 rounded">width</code> and
					<code class="bg-black/30 px-1 rounded">height</code> properties to adjust dot size.
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	.floating-container {
		position: relative;
		width: 100%;
		height: 400px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		overflow: hidden;
		border-radius: 12px;
	}

	.dot {
		position: absolute;
		width: 8px;
		height: 8px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		animation: float 6s ease-in-out infinite;
	}

	.dot-1 {
		left: 10%;
		animation-delay: 0s;
	}
	.dot-2 {
		left: 20%;
		animation-delay: 1s;
	}
	.dot-3 {
		left: 30%;
		animation-delay: 2s;
	}
	.dot-4 {
		left: 60%;
		animation-delay: 0.5s;
	}
	.dot-5 {
		left: 70%;
		animation-delay: 1.5s;
	}
	.dot-6 {
		left: 80%;
		animation-delay: 2.5s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(400px) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		50% {
			transform: translateY(0px) rotate(180deg);
		}
	}
</style>
