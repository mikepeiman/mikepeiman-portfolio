<script lang="ts">
	import SpiralGalaxy from '$lib/components/SpiralGalaxy.svelte';
</script>

<svelte:head>
	<title>Spiral Galaxy Animation - Interactive Canvas</title>
	<meta
		name="description"
		content="Interactive spiral galaxy animation with rotating particles and realistic trails"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-wide text-transparent lg:text-4xl"
			>
				Spiral Galaxy
			</h1>
			<p class="mb-2 text-lg text-gray-300">Rotating spiral galaxy with particle trails</p>
			<p class="text-sm italic text-gray-500">
				Use the control panel on the right to adjust animation parameters in real-time
			</p>
		</header>

		<!-- Animation Container -->
		<main class="flex justify-center">
			<div class="rounded-xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
				<SpiralGalaxy showControls={true} width={400} height={400} />
			</div>
		</main>

		<!-- Technical Details -->
		<section class="mt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Technical Details</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Animation Properties</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><strong>Particle Count:</strong> Number of stars in the galaxy</li>
						<li><strong>Max Radius:</strong> Size of the galactic disk</li>
						<li><strong>Spiral Arms:</strong> Number of main spiral arms</li>
						<li><strong>Rotation Speed:</strong> Base angular velocity</li>
						<li><strong>Spiral Tightness:</strong> How tightly wound the arms are</li>
						<li><strong>Trails:</strong> Toggle particle motion trails</li>
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Use Cases</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li>• Astronomical visualizations</li>
						<li>• Space-themed backgrounds</li>
						<li>• Scientific simulations</li>
						<li>• Game environments</li>
						<li>• Educational astronomy apps</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</div>
