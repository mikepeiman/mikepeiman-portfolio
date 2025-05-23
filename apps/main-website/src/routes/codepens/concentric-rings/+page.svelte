<script lang="ts">
	import ConcentricRings from '$lib/components/ConcentricRings.svelte';
</script>

<svelte:head>
	<title>Concentric Rings Animation - Interactive Canvas</title>
	<meta
		name="description"
		content="Interactive concentric rings animation with counter-rotating rings and enhanced pulsing"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-wide text-transparent lg:text-4xl"
			>
				Concentric Rings
			</h1>
			<p class="mb-2 text-lg text-gray-300">Counter-rotating rings with enhanced pulsing</p>
			<p class="text-sm italic text-gray-500">
				Use the control panel on the right to adjust animation parameters in real-time
			</p>
		</header>

		<!-- Animation Container -->
		<main class="flex justify-center">
			<div class="rounded-xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
				<ConcentricRings showControls={true} width={400} height={400} />
			</div>
		</main>

		<!-- Technical Details -->
		<section class="mt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Technical Details</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Animation Properties</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><strong>Ring Count:</strong> Number of concentric rings</li>
						<li><strong>Max Radius:</strong> Outer boundary of animation</li>
						<li><strong>Rotation Speed:</strong> Base rotation rate</li>
						<li><strong>Pulse Intensity:</strong> Radius oscillation strength</li>
						<li><strong>Phase Offset:</strong> Ring timing differences</li>
						<li><strong>Size Pulse:</strong> Dot size variation amount</li>
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Use Cases</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li>• Orbital mechanics visualizations</li>
						<li>• Planetary ring systems</li>
						<li>• Atomic structure displays</li>
						<li>• Meditation and focus aids</li>
						<li>• Abstract art generators</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</div>
