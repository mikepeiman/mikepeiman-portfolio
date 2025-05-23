<script lang="ts">
	import PendulumWave from '$lib/components/PendulumWave.svelte';
</script>

<svelte:head>
	<title>Pendulum Wave Animation - Interactive Canvas</title>
	<meta
		name="description"
		content="Interactive pendulum wave animation with synchronized pendulum motion and physics"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-4xl">
		<!-- Header -->
		<header class="mb-8 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-3xl font-bold tracking-wide text-transparent lg:text-4xl"
			>
				Pendulum Wave
			</h1>
			<p class="mb-2 text-lg text-gray-300">Synchronized pendulum motion</p>
			<p class="text-sm italic text-gray-500">
				Use the control panel on the right to adjust animation parameters in real-time
			</p>
		</header>

		<!-- Animation Container -->
		<main class="flex justify-center">
			<div class="rounded-xl border border-white/20 bg-black/40 p-8 shadow-2xl backdrop-blur-sm">
				<PendulumWave showControls={true} width={400} height={400} />
			</div>
		</main>

		<!-- Technical Details -->
		<section class="mt-12">
			<h2 class="mb-6 text-2xl font-bold text-white">Technical Details</h2>
			<div class="grid gap-6 md:grid-cols-2">
				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Animation Properties</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li><strong>Pendulum Count:</strong> Number of synchronized pendulums</li>
						<li><strong>Base Frequency:</strong> Oscillation frequency</li>
						<li><strong>Pendulum Length:</strong> Length of each pendulum</li>
						<li><strong>Max Angle:</strong> Maximum swing angle in degrees</li>
						<li><strong>Reference Line:</strong> Toggle the pivot reference line</li>
						<li><strong>Bob Size:</strong> Size of pendulum weights</li>
					</ul>
				</div>

				<div class="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
					<h3 class="mb-3 text-lg font-semibold text-white">Use Cases</h3>
					<ul class="space-y-2 text-sm text-gray-300">
						<li>• Physics demonstrations</li>
						<li>• Metronome visualizations</li>
						<li>• Hypnotic patterns</li>
						<li>• Educational simulations</li>
						<li>• Relaxation animations</li>
					</ul>
				</div>
			</div>
		</section>
	</div>
</div>
