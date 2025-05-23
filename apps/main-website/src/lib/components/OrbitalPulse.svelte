<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		pulseFrequency: 0.5,
		pulseAmplitude: 2,
		orbitCount: 6,
		baseRadius: 15,
		radiusStep: 10,
		baseDotCount: 6,
		dotCountStep: 4
	});

	let canvas;
	let ctx;
	let animationId;
	let pane;
	let time = 0;
	let lastTime = 0;

	// Generate orbits based on parameters
	function getOrbits() {
		return Array.from({ length: params.orbitCount }, (_, i) => ({
			radius: params.baseRadius + i * params.radiusStep,
			dotCount: params.baseDotCount + i * params.dotCountStep
		}));
	}

	onMount(() => {
		if (!canvas) return;

		ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

		if (showControls) {
			setupControls();
		}

		animate();
	});

	onDestroy(() => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
		if (pane) {
			pane.dispose();
		}
	});

	function setupControls() {
		pane = createPane('Orbital Pulse Controls');

		const pulseFolder = createFolder(pane, 'Pulse', true);
		pulseFolder.addBinding(params, 'pulseFrequency', { min: 0.1, max: 2.0, step: 0.05 });
		pulseFolder.addBinding(params, 'pulseAmplitude', { min: 0.5, max: 5.0, step: 0.1 });

		const orbitFolder = createFolder(pane, 'Orbits', true);
		orbitFolder.addBinding(params, 'orbitCount', { min: 3, max: 10, step: 1 });
		orbitFolder.addBinding(params, 'baseRadius', { min: 10, max: 30, step: 1 });
		orbitFolder.addBinding(params, 'radiusStep', { min: 5, max: 20, step: 1 });
		orbitFolder.addBinding(params, 'baseDotCount', { min: 4, max: 12, step: 1 });
		orbitFolder.addBinding(params, 'dotCountStep', { min: 2, max: 8, step: 1 });
	}

	function animate(timestamp = 0) {
		if (!lastTime) lastTime = timestamp;
		const deltaTime = timestamp - lastTime;
		lastTime = timestamp;
		time += deltaTime * 0.001;

		draw();
		animationId = requestAnimationFrame(animate);
	}

	function draw() {
		if (!ctx) return;

		const centerX = width / 2;
		const centerY = height / 2;
		const maxRadius = Math.max(width, height) / 2 - 10;

		ctx.clearRect(0, 0, width, height);

		// Draw center
		ctx.beginPath();
		ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fill();

		// Draw orbits
		getOrbits().forEach((orbit, orbitIndex) => {
			// Skip if orbit would be too large
			if (orbit.radius > maxRadius) return;

			// Draw orbit circle (very faint)
			ctx.beginPath();
			ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
			ctx.lineWidth = 1;
			ctx.stroke();

			// Calculate pulse effect
			const normalizedRadius = orbit.radius / maxRadius;
			const pulseDelay = normalizedRadius * 1.5;
			const pulsePhase = (time * params.pulseFrequency - pulseDelay) % 1;
			const pulseEffect = Math.sin(pulsePhase * Math.PI) * params.pulseAmplitude;
			const finalPulseEffect = pulseEffect > 0 ? pulseEffect : 0;

			// Draw dots
			for (let i = 0; i < orbit.dotCount; i++) {
				const angle = (i / orbit.dotCount) * Math.PI * 2;
				const pulsedRadius = orbit.radius + finalPulseEffect;
				const x = centerX + Math.cos(angle) * pulsedRadius;
				const y = centerY + Math.sin(angle) * pulsedRadius;

				const dotSize = 2 + (finalPulseEffect / params.pulseAmplitude) * 1.5;
				const opacity = 0.7 + (finalPulseEffect / params.pulseAmplitude) * 0.3;

				ctx.beginPath();
				ctx.arc(x, y, dotSize, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
				ctx.fill();
			}
		});
	}
</script>

<div class="animation-container">
	<div class="animation-title">Orbital Pulse</div>
	<div class="canvas-container">
		<canvas bind:this={canvas}></canvas>
	</div>
</div>

<style>
	.animation-container {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px;
		border: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.5);
		transition: border-color 0.3s ease;
	}

	.animation-container:hover {
		border-color: rgba(255, 255, 255, 0.3);
	}

	.animation-title {
		margin-bottom: 10px;
		font-size: 12px;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		text-align: center;
		color: #f0f0f0;
		font-family: 'TheGoodMonolith', monospace;
	}

	.canvas-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	canvas {
		display: block;
	}
</style>
