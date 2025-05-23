<script lang="ts">
	import OrbitalPulse from '$lib/components/OrbitalPulse.svelte';
</script>

<svelte:head>
	<title>Orbital Pulse Animation - Interactive Canvas</title>
	<meta
		name="description"
		content="Interactive orbital pulse animation with concentric orbits and smooth pulsing effects"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-wide text-transparent lg:text-4xl"
			>
				Orbital Pulse
			</h1>
			<p class="mb-2 text-lg text-gray-300">Concentric orbits with smooth pulsing effects</p>
			<p class="text-sm italic text-gray-500">
				Use the control panel on the right to adjust animation parameters in real-time
			</p>
		</header>

		<!-- Animation Container -->
		<main class="flex justify-center">
			<div class="rounded-xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
				<OrbitalPulse showControls={true} width={400} height={400} />
			</div>
		</main>

		<!-- Technical Details -->
		<section class="mt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Technical Details</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Animation Properties</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><strong>Pulse Frequency:</strong> Speed of the pulsing wave</li>
						<li><strong>Pulse Amplitude:</strong> Intensity of the pulse effect</li>
						<li><strong>Orbit Count:</strong> Number of concentric orbital rings</li>
						<li><strong>Base Radius:</strong> Starting radius of inner orbit</li>
						<li><strong>Radius Step:</strong> Distance between each orbit</li>
						<li><strong>Dot Counts:</strong> Configurable dots per orbit</li>
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Use Cases</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li>• Orbital system visualizations</li>
						<li>• Data propagation effects</li>
						<li>• Network activity indicators</li>
						<li>• Scientific simulations</li>
						<li>• Meditation and focus apps</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</div>
