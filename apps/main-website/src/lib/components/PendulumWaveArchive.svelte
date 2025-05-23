<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		pendulumCount: 15,
		baseFrequency: 0.5, // All pendulums at the same frequency
		pendulumLength: 90,
		maxAngleDegrees: 15, // 15 degrees max angle
		showReferenceLine: true,
		bobSize: 3,
		lineOpacity: 0.4
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
		pane = createPane('Pendulum Wave Archive Controls');

		const pendulumFolder = createFolder(pane, 'Pendulums', true);
		pendulumFolder.addBinding(params, 'pendulumCount', { min: 8, max: 25, step: 1 });
		pendulumFolder.addBinding(params, 'baseFrequency', { min: 0.2, max: 1.5, step: 0.05 });
		pendulumFolder.addBinding(params, 'pendulumLength', { min: 60, max: 120, step: 5 });
		pendulumFolder.addBinding(params, 'maxAngleDegrees', { min: 5, max: 30, step: 1 });

		const visualFolder = createFolder(pane, 'Visual', true);
		visualFolder.addBinding(params, 'showReferenceLine');
		visualFolder.addBinding(params, 'bobSize', { min: 1, max: 6, step: 0.5 });
		visualFolder.addBinding(params, 'lineOpacity', { min: 0.1, max: 1.0, step: 0.05 });
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
		const maxAngle = (params.maxAngleDegrees * Math.PI) / 180; // Convert to radians

		ctx.clearRect(0, 0, width, height);

		// Draw reference line if enabled
		if (params.showReferenceLine) {
			const lineWidth = params.pendulumCount * 8;
			const lineY = centerY - params.pendulumLength;

			ctx.beginPath();
			ctx.moveTo(centerX - lineWidth / 2, lineY);
			ctx.lineTo(centerX + lineWidth / 2, lineY);
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
			ctx.lineWidth = 1;
			ctx.stroke();
		}

		// Calculate single angle for all pendulums - simple left-right motion
		const angle = Math.sin(time * params.baseFrequency * Math.PI) * maxAngle;

		// Draw pendulums - all moving in unison
		for (let i = 0; i < params.pendulumCount; i++) {
			// Calculate pendulum position
			const pendulumX = centerX - params.pendulumCount * 4 + i * 8;
			const pendulumY = centerY - params.pendulumLength;

			// Calculate bob position - all with the same angle
			const bobX = pendulumX + Math.sin(angle) * params.pendulumLength;
			const bobY = pendulumY + Math.cos(angle) * params.pendulumLength;

			// Draw pendulum line
			ctx.beginPath();
			ctx.moveTo(pendulumX, pendulumY);
			ctx.lineTo(bobX, bobY);
			ctx.strokeStyle = `rgba(255, 255, 255, ${params.lineOpacity})`;
			ctx.lineWidth = 1;
			ctx.stroke();

			// Draw pendulum bob
			ctx.beginPath();
			ctx.arc(bobX, bobY, params.bobSize, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
			ctx.fill();

			// Draw pivot point
			ctx.beginPath();
			ctx.arc(pendulumX, pendulumY, 1, 0, Math.PI * 2);
			ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
			ctx.fill();
		}
	}
</script>

<div class="animation-container">
	<div class="animation-title">Pendulum Wave Archive</div>
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
