<script>
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
			description: 'Rings of dots pulsing outward from center'
		},
		{
			component: OrbitalPulse,
			title: 'Orbital Pulse',
			description: 'Concentric orbits with smooth pulsing effects'
		},
		{
			component: SpiralGalaxy,
			title: 'Spiral Galaxy',
			description: 'Rotating spiral galaxy with particle trails'
		},
		{
			component: PendulumWave,
			title: 'Pendulum Wave',
			description: 'Synchronized pendulum motion'
		},

		{
			component: PulsingGrid,
			title: 'Pulsing Grid',
			description: 'Breathing grid with wave effects'
		},
		{
			component: SequentialPulse,
			title: 'Sequential Pulse',
			description: 'Sequential pulsing dots around a circle'
		},
		{
			component: OscillatingDots,
			title: 'Oscillating Dots',
			description: 'Vertical wave oscillations in rows'
		},
		{
			component: PulseWave,
			title: 'Pulse Wave',
			description: 'Concentric rings with wave oscillations'
		},
		{
			component: ConcentricRings,
			title: 'Concentric Rings',
			description: 'Counter-rotating rings with enhanced pulsing'
		}
	];
</script>

<svelte:head>
	<title>Circle Animations Collection - CodePen</title>
	<meta
		name="description"
		content="A collection of circle-based canvas animations with interactive controls"
	/>
</svelte:head>

<div class="page-container">
	<header class="page-header">
		<h1>Circle Animations Collection N°2</h1>
		<p>Interactive canvas animations with real-time parameter controls</p>

		<div class="controls-toggle">
			<label class="toggle-label">
				<input type="checkbox" bind:checked={showControls} class="toggle-input" />
				<span class="toggle-slider"></span>
				<span class="toggle-text">Show Controls</span>
			</label>
		</div>
	</header>

	<main class="animations-grid">
		{#each animations as animation (animation.title)}
			<div class="animation-card">
				<svelte:component this={animation.component} {showControls} width={180} height={180} />
				<div class="card-info">
					<h3>{animation.title}</h3>
					<p>{animation.description}</p>
				</div>
			</div>
		{/each}
	</main>

	{#if showControls}
		<div class="controls-info">
			<p>💡 Use the control panels on the right to adjust animation parameters in real-time</p>
		</div>
	{/if}
</div>

<style>
	@import url('https://fonts.cdnfonts.com/css/thegoodmonolith');

	:global(body) {
		background: #000;
		color: #f0f0f0;
		font-family: 'TheGoodMonolith', monospace;
		margin: 0;
		padding: 0;
	}

	.page-container {
		min-height: 100vh;
		padding: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.page-header {
		text-align: center;
		margin-bottom: 40px;
		max-width: 800px;
	}

	.page-header h1 {
		font-size: 2.5rem;
		letter-spacing: 2px;
		margin-bottom: 10px;
		background: linear-gradient(45deg, #fff, #888);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.page-header p {
		font-size: 1rem;
		opacity: 0.8;
		margin-bottom: 30px;
	}

	.controls-toggle {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}

	.toggle-label {
		display: flex;
		align-items: center;
		gap: 12px;
		cursor: pointer;
		user-select: none;
	}

	.toggle-input {
		display: none;
	}

	.toggle-slider {
		position: relative;
		width: 50px;
		height: 24px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 12px;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.3);
	}

	.toggle-slider::before {
		content: '';
		position: absolute;
		top: 2px;
		left: 2px;
		width: 18px;
		height: 18px;
		background: white;
		border-radius: 50%;
		transition: all 0.3s ease;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
	}

	.toggle-input:checked + .toggle-slider {
		background: linear-gradient(45deg, #667eea, #764ba2);
		border-color: #667eea;
	}

	.toggle-input:checked + .toggle-slider::before {
		transform: translateX(26px);
	}

	.toggle-text {
		font-size: 0.9rem;
		letter-spacing: 0.5px;
		text-transform: uppercase;
	}

	.animations-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 30px;
		max-width: 1200px;
		width: 100%;
	}

	.animation-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 12px;
		padding: 20px;
		transition: all 0.3s ease;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.animation-card:hover {
		transform: translateY(-5px);
		border-color: rgba(255, 255, 255, 0.3);
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
	}

	.card-info {
		margin-top: 15px;
		text-align: center;
	}

	.card-info h3 {
		font-size: 1rem;
		letter-spacing: 1px;
		margin-bottom: 8px;
		text-transform: uppercase;
	}

	.card-info p {
		font-size: 0.8rem;
		opacity: 0.7;
		line-height: 1.4;
		max-width: 200px;
	}

	.controls-info {
		position: fixed;
		bottom: 20px;
		left: 50%;
		transform: translateX(-50%);
		background: rgba(0, 0, 0, 0.8);
		padding: 12px 20px;
		border-radius: 25px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		font-size: 0.85rem;
		opacity: 0.9;
		animation: fadeInUp 0.5s ease;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateX(-50%) translateY(20px);
		}
		to {
			opacity: 0.9;
			transform: translateX(-50%) translateY(0);
		}
	}

	@media (max-width: 768px) {
		.page-header h1 {
			font-size: 2rem;
		}

		.animations-grid {
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 20px;
		}

		.controls-info {
			bottom: 10px;
			left: 10px;
			right: 10px;
			transform: none;
			text-align: center;
		}
	}

	@media (max-width: 480px) {
		.animations-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
