<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		dotCount: 20,
		rowCount: 5,
		spacing: 15,
		baseAmplitude: 4,
		amplitudeStep: 2,
		baseFrequency: 1,
		frequencyStep: 0.2,
		phaseOffset: 0.5
	});

	let canvas;
	let ctx;
	let animationId;
	let pane;
	let time = 0;
	let lastTime = 0;

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
		pane = createPane('Oscillating Dots Controls');

		const gridFolder = createFolder(pane, 'Grid', true);
		gridFolder.addBinding(params, 'dotCount', { min: 10, max: 30, step: 1 });
		gridFolder.addBinding(params, 'rowCount', { min: 3, max: 8, step: 1 });
		gridFolder.addBinding(params, 'spacing', { min: 8, max: 25, step: 1 });

		const waveFolder = createFolder(pane, 'Wave', true);
		waveFolder.addBinding(params, 'baseAmplitude', { min: 2, max: 10, step: 0.5 });
		waveFolder.addBinding(params, 'amplitudeStep', { min: 0.5, max: 4, step: 0.1 });
		waveFolder.addBinding(params, 'baseFrequency', { min: 0.5, max: 3, step: 0.1 });
		waveFolder.addBinding(params, 'frequencyStep', { min: 0.1, max: 0.5, step: 0.05 });
		waveFolder.addBinding(params, 'phaseOffset', { min: 0.1, max: 1, step: 0.1 });
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

		// Draw oscillating dots in rows
		for (let row = 0; row < params.rowCount; row++) {
			const y = centerY - ((params.rowCount - 1) / 2) * params.spacing + row * params.spacing;

			for (let i = 0; i < params.dotCount; i++) {
				// Calculate x-position with sine wave offset
				const baseX = centerX - ((params.dotCount - 1) / 2) * 8 + i * 8;

				// Wave parameters vary by row
				const amplitude = params.baseAmplitude + row * params.amplitudeStep;
				const frequency = params.baseFrequency + row * params.frequencyStep;
				const phaseOffset = row * params.phaseOffset;

				// Calculate offset
				const offset = Math.sin(time * frequency + i * 0.2 + phaseOffset) * amplitude;
				const x = baseX;
				const finalY = y + offset;

				// Draw dot
				ctx.beginPath();
				ctx.arc(x, finalY, 2, 0, Math.PI * 2);
				ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
				ctx.fill();
			}
		}
	}
</script>

<div class="animation-container">
	<div class="animation-title">Oscillating Dots</div>
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
