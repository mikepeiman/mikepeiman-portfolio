<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		ringCount: 5,
		maxRadius: 75,
		baseRotationSpeed: 0.2,
		pulseIntensity: 3,
		phaseOffset: 0.7,
		baseDotSize: 2,
		sizePulseAmount: 0.7
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
		pane = createPane('Concentric Rings Controls');

		const structureFolder = createFolder(pane, 'Structure', true);
		structureFolder.addBinding(params, 'ringCount', { min: 3, max: 8, step: 1 });
		structureFolder.addBinding(params, 'maxRadius', { min: 50, max: 100, step: 5 });

		const animationFolder = createFolder(pane, 'Animation', true);
		animationFolder.addBinding(params, 'baseRotationSpeed', { min: 0.05, max: 0.5, step: 0.05 });
		animationFolder.addBinding(params, 'pulseIntensity', { min: 1, max: 8, step: 0.5 });
		animationFolder.addBinding(params, 'phaseOffset', { min: 0.1, max: 2.0, step: 0.1 });

		const visualFolder = createFolder(pane, 'Visual', true);
		visualFolder.addBinding(params, 'baseDotSize', { min: 1, max: 4, step: 0.1 });
		visualFolder.addBinding(params, 'sizePulseAmount', { min: 0.2, max: 1.5, step: 0.1 });
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

		// Draw center dot
		ctx.beginPath();
		ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fill();

		// Draw concentric rings of dots
		for (let r = 0; r < params.ringCount; r++) {
			const radius = ((r + 1) / params.ringCount) * params.maxRadius;
			const dotCount = 6 + r * 6; // More dots in outer rings

			// Phase offset for rotation based on ring index
			const phaseOffset =
				r % 2 === 0 ? time * params.baseRotationSpeed : -time * params.baseRotationSpeed;

			// Each ring pulses at a different phase
			const ringPhase = time + r * params.phaseOffset;

			for (let i = 0; i < dotCount; i++) {
				const angle = (i / dotCount) * Math.PI * 2 + phaseOffset;

				// Add a pulsing effect to the radius (slight)
				const radiusPulse = Math.sin(ringPhase) * params.pulseIntensity;
				const finalRadius = radius + radiusPulse;
				const x = centerX + Math.cos(angle) * finalRadius;
				const y = centerY + Math.sin(angle) * finalRadius;

				// Enhanced dot size pulsing - more pronounced
				// Base size that varies by ring position
				const baseSize = params.baseDotSize + r / (params.ringCount - 1);
				// Size pulse effect - make it more dramatic
				const sizePulse = Math.sin(ringPhase) * baseSize * params.sizePulseAmount + baseSize;

				// Enhanced opacity pulsing
				const opacityPulse = 0.6 + Math.sin(ringPhase) * 0.4;

				ctx.beginPath();
				ctx.arc(x, y, sizePulse, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${opacityPulse})`;
				ctx.fill();
			}
		}
	}
</script>

<div class="animation-container">
	<div class="animation-title">Concentric Rings</div>
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
