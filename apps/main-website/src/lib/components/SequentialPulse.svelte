<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		radius: 70,
		dotCount: 16,
		pulseSpeed: 0.5,
		pulseAmplitude: 5,
		lineOpacity: 0.1,
		showConnections: true
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
		pane = createPane('Sequential Pulse Controls');

		const structureFolder = createFolder(pane, 'Structure', true);
		structureFolder.addBinding(params, 'radius', { min: 30, max: 100, step: 5 });
		structureFolder.addBinding(params, 'dotCount', { min: 8, max: 32, step: 1 });

		const animationFolder = createFolder(pane, 'Animation', true);
		animationFolder.addBinding(params, 'pulseSpeed', { min: 0.1, max: 2.0, step: 0.1 });
		animationFolder.addBinding(params, 'pulseAmplitude', { min: 2, max: 15, step: 0.5 });

		const visualFolder = createFolder(pane, 'Visual', true);
		visualFolder.addBinding(params, 'showConnections');
		visualFolder.addBinding(params, 'lineOpacity', { min: 0.05, max: 0.5, step: 0.05 });
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

		// Draw reference circle (very faint)
		ctx.beginPath();
		ctx.arc(centerX, centerY, params.radius, 0, Math.PI * 2);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
		ctx.lineWidth = 1;
		ctx.stroke();

		// Draw dots with sequential pulsing
		for (let i = 0; i < params.dotCount; i++) {
			const angle = (i / params.dotCount) * Math.PI * 2;
			// Sequential pulsing - wave moves around the circle
			const pulsePhase = (time * params.pulseSpeed + i / params.dotCount) % 1;
			const pulseFactor = Math.sin(pulsePhase * Math.PI * 2);

			// Apply pulse to size and radius
			const size = 2 + pulseFactor * 2;
			const finalRadius = params.radius + pulseFactor * params.pulseAmplitude;
			const x = centerX + Math.cos(angle) * finalRadius;
			const y = centerY + Math.sin(angle) * finalRadius;

			// Draw connecting line to center if enabled
			if (params.showConnections) {
				ctx.beginPath();
				ctx.moveTo(centerX, centerY);
				ctx.lineTo(x, y);
				ctx.strokeStyle = `rgba(255, 255, 255, ${params.lineOpacity + pulseFactor * 0.2})`;
				ctx.lineWidth = 1;
				ctx.stroke();
			}

			// Draw dot
			ctx.beginPath();
			ctx.arc(x, y, size, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
			ctx.fill();
		}
	}
</script>

<div class="animation-container">
	<div class="animation-title">Sequential Pulse</div>
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
