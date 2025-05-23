<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters (sped up from original)
	let params = $state({
		pulseFrequency: 0.5, // Sped up from 0.2 to 0.5
		pulseAmplitude: 2,
		maxRadius: 75,
		showOrbitCircles: true,
		circleOpacity: 0.05
	});

	let canvas;
	let ctx;
	let animationId;
	let pane;
	let time = 0;
	let lastTime = 0;

	// Fixed orbital rings with smoother pulse
	const orbits = [
		{ radius: 15, dotCount: 6 },
		{ radius: 25, dotCount: 10 },
		{ radius: 35, dotCount: 14 },
		{ radius: 45, dotCount: 18 },
		{ radius: 55, dotCount: 22 },
		{ radius: 65, dotCount: 26 }
	];

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
		pane = createPane('Orbital Pulse Archive Controls');

		const pulseFolder = createFolder(pane, 'Pulse', true);
		pulseFolder.addBinding(params, 'pulseFrequency', { min: 0.1, max: 1.5, step: 0.05 });
		pulseFolder.addBinding(params, 'pulseAmplitude', { min: 0.5, max: 5.0, step: 0.1 });

		const visualFolder = createFolder(pane, 'Visual', true);
		visualFolder.addBinding(params, 'maxRadius', { min: 60, max: 100, step: 5 });
		visualFolder.addBinding(params, 'showOrbitCircles');
		visualFolder.addBinding(params, 'circleOpacity', { min: 0.01, max: 0.2, step: 0.01 });
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

		ctx.clearRect(0, 0, width, height);

		// Draw center
		ctx.beginPath();
		ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fill();

		// Draw orbits
		orbits.forEach((orbit) => {
			// Skip if orbit would be too large
			if (orbit.radius > params.maxRadius) return;

			// Draw orbit circle (very faint) if enabled
			if (params.showOrbitCircles) {
				ctx.beginPath();
				ctx.arc(centerX, centerY, orbit.radius, 0, Math.PI * 2);
				ctx.strokeStyle = `rgba(255, 255, 255, ${params.circleOpacity})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			// Calculate smooth pulse animation
			const normalizedRadius = orbit.radius / params.maxRadius;
			const pulseDelay = normalizedRadius * 1.5; // Outer rings pulse later

			// Create a smooth, continuous pulse wave moving outward
			const pulsePhase = (time * params.pulseFrequency - pulseDelay) % 1;

			// Create a smooth bell curve for the pulse effect
			const pulseEffect = Math.sin(pulsePhase * Math.PI) * params.pulseAmplitude;
			// Only apply positive pulse effects (moving outward)
			const finalPulseEffect = pulseEffect > 0 ? pulseEffect : 0;

			// Draw dots around the orbit
			for (let i = 0; i < orbit.dotCount; i++) {
				const angle = (i / orbit.dotCount) * Math.PI * 2;
				// Apply pulse to radius - smooth movement outward
				const pulsedRadius = orbit.radius + finalPulseEffect;
				const x = centerX + Math.cos(angle) * pulsedRadius;
				const y = centerY + Math.sin(angle) * pulsedRadius;

				// Dot size also gently increases with pulse
				const dotSize = 2 + (finalPulseEffect / params.pulseAmplitude) * 1.5;
				// Opacity also increases with pulse
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
	<div class="animation-title">Orbital Pulse Archive</div>
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
