<script lang="ts">
	import { goto } from '$app/navigation';
	import RadialPulse from '$lib/components/RadialPulse.svelte';
	import OrbitalPulse from '$lib/components/OrbitalPulse.svelte';
	import SpiralGalaxy from '$lib/components/SpiralGalaxy.svelte';
	import PendulumWave from '$lib/components/PendulumWave.svelte';
	import PulsingGrid from '$lib/components/PulsingGrid.svelte';
	import SequentialPulse from '$lib/components/SequentialPulse.svelte';
	import OscillatingDots from '$lib/components/OscillatingDots.svelte';
	import PulseWave from '$lib/components/PulseWave.svelte';
	import ConcentricRings from '$lib/components/ConcentricRings.svelte';

	let showControls = $state(false);

	const animations = [
		{
			component: RadialPulse,
			title: 'Radial Pulse',
			description: 'Rings of dots pulsing outward from center',
			slug: 'radial-pulse'
		},
		{
			component: OrbitalPulse,
			title: 'Orbital Pulse',
			description: 'Concentric orbits with smooth pulsing effects',
			slug: 'orbital-pulse'
		},
		{
			component: SpiralGalaxy,
			title: 'Spiral Galaxy',
			description: 'Rotating spiral galaxy with particle trails',
			slug: 'spiral-galaxy'
		},
		{
			component: PendulumWave,
			title: 'Pendulum Wave',
			description: 'Synchronized pendulum motion',
			slug: 'pendulum-wave'
		},
		{
			component: PulsingGrid,
			title: 'Pulsing Grid',
			description: 'Breathing grid with wave effects',
			slug: 'pulsing-grid'
		},
		{
			component: SequentialPulse,
			title: 'Sequential Pulse',
			description: 'Sequential pulsing dots around a circle',
			slug: 'sequential-pulse'
		},
		{
			component: OscillatingDots,
			title: 'Oscillating Dots',
			description: 'Vertical wave oscillations in rows',
			slug: 'oscillating-dots'
		},
		{
			component: PulseWave,
			title: 'Pulse Wave',
			description: 'Concentric rings with wave oscillations',
			slug: 'pulse-wave'
		},
		{
			component: ConcentricRings,
			title: 'Concentric Rings',
			description: 'Counter-rotating rings with enhanced pulsing',
			slug: 'concentric-rings'
		}
	];

	function navigateToAnimation(slug: string) {
		goto(`/codepens/${slug}`);
	}
</script>

<svelte:head>
	<title>Circle Animations Collection - CodePen</title>
	<meta
		name="description"
		content="A collection of circle-based canvas animations with interactive controls"
	/>
</svelte:head>

<div class="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<header class="mb-12 text-center">
			<h1
				class="mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-4xl font-bold tracking-wide text-transparent lg:text-5xl"
			>
				Circle Animations Collection N°2
			</h1>
			<p class="mb-2 text-lg text-gray-300">
				Interactive canvas animations with real-time parameter controls
			</p>
			<p class="mb-8 text-sm italic text-gray-500">
				Click any animation to view it with interactive controls
			</p>

			<!-- Controls Toggle -->
			<div class="flex items-center justify-center gap-3">
				<label class="flex cursor-pointer items-center gap-3 select-none">
					<input type="checkbox" bind:checked={showControls} class="sr-only" />
					<div class="relative">
						<div
							class="block h-6 w-11 rounded-full border border-white/30 bg-white/20 transition-all duration-300 {showControls
								? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500'
								: ''}"
						></div>
						<div
							class="absolute left-1 top-1 h-4 w-4 rounded-full bg-white shadow transition-transform duration-300 {showControls
								? 'translate-x-5'
								: ''}"
						></div>
					</div>
					<span class="text-sm font-medium uppercase tracking-wider text-gray-300">
						Show Controls
					</span>
				</label>
			</div>
		</header>

		<!-- Animation Grid -->
		<main class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{#each animations as animation (animation.title)}
				<button
					class="group relative flex flex-col items-center rounded-xl border border-white/10 bg-black/30 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white/30 hover:shadow-xl hover:shadow-black/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
					on:click={() => navigateToAnimation(animation.slug)}
					type="button"
				>
					<!-- Animation Component -->
					<div class="mb-4">
						<svelte:component this={animation.component} {showControls} width={180} height={180} />
					</div>

					<!-- Card Info -->
					<div class="text-center">
						<h3 class="mb-2 text-base font-semibold uppercase tracking-wide text-white">
							{animation.title}
						</h3>
						<p class="mb-3 text-sm leading-relaxed text-gray-400">
							{animation.description}
						</p>
						<div
							class="flex items-center justify-center gap-2 text-xs text-purple-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
						>
							<span>Click to view with controls</span>
							<svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M9 5l7 7-7 7"
								></path>
							</svg>
						</div>
					</div>
				</button>
			{/each}
		</main>

		<!-- Controls Info -->
		{#if showControls}
			<div class="fixed bottom-4 left-1/2 -translate-x-1/2 animate-fade-in-up">
				<div
					class="rounded-full border border-white/20 bg-black/80 px-5 py-3 text-sm text-gray-300 backdrop-blur-md"
				>
					💡 Use the control panels on the right to adjust animation parameters in real-time
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) translateY(0);
		}
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.5s ease-out;
	}
</style>
