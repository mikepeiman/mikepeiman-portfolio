<script lang="ts">
	import SequentialPulse from '$lib/components/SequentialPulse.svelte';
</script>

<svelte:head>
	<title>Sequential Pulse Animation - Interactive Canvas</title>
	<meta
		name="description"
		content="Interactive sequential pulse animation with sequential pulsing dots around a circle"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-wide text-transparent lg:text-4xl"
			>
				Sequential Pulse
			</h1>
			<p class="mb-2 text-lg text-gray-300">Sequential pulsing dots around a circle</p>
			<p class="text-sm italic text-gray-500">
				Use the control panel on the right to adjust animation parameters in real-time
			</p>
		</header>

		<!-- Animation Container -->
		<main class="flex justify-center">
			<div class="rounded-xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
				<SequentialPulse showControls={true} width={400} height={400} />
			</div>
		</main>

		<!-- Technical Details -->
		<section class="mt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Technical Details</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Animation Properties</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><strong>Radius:</strong> Distance from center to dots</li>
						<li><strong>Dot Count:</strong> Number of dots around the circle</li>
						<li><strong>Pulse Speed:</strong> Speed of the wave moving around</li>
						<li><strong>Pulse Amplitude:</strong> Intensity of size and radius changes</li>
						<li><strong>Connections:</strong> Toggle lines connecting to center</li>
						<li><strong>Line Opacity:</strong> Transparency of connection lines</li>
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Use Cases</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li>• Loading indicators with style</li>
						<li>• Audio visualizers</li>
						<li>• Progress indicators</li>
						<li>• Radar-like displays</li>
						<li>• Rhythmic pattern generators</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</div>
