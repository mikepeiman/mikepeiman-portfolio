<script lang="ts">
	import RadialPulse from '$lib/components/RadialPulse.svelte';
</script>

<svelte:head>
	<title>Radial Pulse Animation - Interactive Canvas</title>
	<meta
		name="description"
		content="Interactive radial pulse animation with real-time parameter controls using Tweakpane"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-wide text-transparent lg:text-4xl"
			>
				Radial Pulse
			</h1>
			<p class="mb-2 text-lg text-gray-300">Rings of dots pulsing outward from center</p>
			<p class="text-sm italic text-gray-500">
				Use the control panel on the right to adjust animation parameters in real-time
			</p>
		</header>

		<!-- Animation Container -->
		<main class="flex justify-center">
			<div class="rounded-xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
				<RadialPulse showControls={true} width={400} height={400} />
			</div>
		</main>

		<!-- Technical Details -->
		<section class="mt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Technical Details</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Animation Properties</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><strong>Speed:</strong> Configurable pulse frequency</li>
						<li><strong>Ring Count:</strong> Number of concentric pulse rings</li>
						<li><strong>Dots Per Ring:</strong> Density of dots in each ring</li>
						<li><strong>Max Radius:</strong> Maximum expansion radius</li>
						<li><strong>Dot Size:</strong> Base size of individual dots</li>
						<li><strong>Opacity:</strong> Overall transparency control</li>
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Use Cases</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li>• Loading indicators</li>
						<li>• Audio visualizations</li>
						<li>• Interactive backgrounds</li>
						<li>• Data visualization accents</li>
						<li>• Gaming particle effects</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</div>
