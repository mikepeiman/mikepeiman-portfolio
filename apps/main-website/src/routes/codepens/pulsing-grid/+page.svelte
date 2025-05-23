<script lang="ts">
	import PulsingGrid from '$lib/components/PulsingGrid.svelte';
</script>

<svelte:head>
	<title>Pulsing Grid Animation - Interactive Canvas</title>
	<meta
		name="description"
		content="Interactive pulsing grid animation with breathing effects and wave patterns"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-wide text-transparent lg:text-4xl"
			>
				Pulsing Grid
			</h1>
			<p class="mb-2 text-lg text-gray-300">Breathing grid with wave effects</p>
			<p class="text-sm italic text-gray-500">
				Use the control panel on the right to adjust animation parameters in real-time
			</p>
		</header>

		<!-- Animation Container -->
		<main class="flex justify-center">
			<div class="rounded-xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
				<PulsingGrid showControls={true} width={400} height={400} />
			</div>
		</main>

		<!-- Technical Details -->
		<section class="mt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Technical Details</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Animation Properties</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><strong>Grid Size:</strong> Dimensions of the dot grid</li>
						<li><strong>Spacing:</strong> Distance between grid points</li>
						<li><strong>Breathing Speed:</strong> Rate of expansion/contraction</li>
						<li><strong>Wave Speed:</strong> Speed of radial wave patterns</li>
						<li><strong>Color Pulse:</strong> Speed of color transitions</li>
						<li><strong>Connections:</strong> Toggle inter-dot connections</li>
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Use Cases</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li>• Data grid visualizations</li>
						<li>• Network topology displays</li>
						<li>• Dynamic backgrounds</li>
						<li>• System monitoring dashboards</li>
						<li>• Interactive art installations</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</div>
