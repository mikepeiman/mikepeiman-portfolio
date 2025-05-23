<script>
	import { onMount, onDestroy } from 'svelte';
	import {
		createPane,
		createFolder,
		addAnimationControls
	} from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		speed: 0.35,
		ringCount: 8,
		dotsPerRing: 12,
		maxRadius: 75,
		dotSize: 2.5,
		opacity: 0.9
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
		pane = createPane('Radial Pulse Controls');

		const animationFolder = createFolder(pane, 'Animation', true);
		animationFolder.addBinding(params, 'speed', { min: 0.1, max: 2.0, step: 0.05 });
		animationFolder.addBinding(params, 'ringCount', { min: 3, max: 15, step: 1 });
		animationFolder.addBinding(params, 'dotsPerRing', { min: 6, max: 24, step: 1 });

		const visualFolder = createFolder(pane, 'Visual', true);
		visualFolder.addBinding(params, 'maxRadius', { min: 30, max: 120, step: 5 });
		visualFolder.addBinding(params, 'dotSize', { min: 1, max: 5, step: 0.1 });
		visualFolder.addBinding(params, 'opacity', { min: 0.1, max: 1.0, step: 0.05 });
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

		// Draw central dot
		ctx.beginPath();
		ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
		ctx.fillStyle = `rgba(255, 255, 255, ${params.opacity})`;
		ctx.fill();

		// Draw pulse rings
		for (let i = 0; i < params.ringCount; i++) {
			const pulsePhase = (time * params.speed + i / params.ringCount) % 1;
			const ringRadius = pulsePhase * params.maxRadius;

			if (ringRadius < 5) continue;

			const opacity = (1 - pulsePhase) * params.opacity;

			for (let j = 0; j < params.dotsPerRing; j++) {
				const angle = (j / params.dotsPerRing) * Math.PI * 2;
				const x = centerX + Math.cos(angle) * ringRadius;
				const y = centerY + Math.sin(angle) * ringRadius;
				const dotSize = params.dotSize * (1 - pulsePhase * 0.5);

				ctx.beginPath();
				ctx.arc(x, y, dotSize, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
				ctx.fill();
			}
		}
	}
</script>

<div class="animation-container">
	<div class="animation-title">Radial Pulse</div>
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
