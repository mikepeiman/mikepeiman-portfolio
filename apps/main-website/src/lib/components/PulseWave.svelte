<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		ringCount: 5,
		baseRadius: 15,
		radiusStep: 15,
		baseDotCount: 6,
		dotCountStep: 6,
		pulseAmplitude: 3,
		waveSpeed: 2,
		dotSize: 2
	});

	let canvas;
	let ctx;
	let animationId;
	let pane;
	let time = 0;
	let lastTime = 0;

	// Generate dot rings based on parameters
	function getDotRings() {
		return Array.from({ length: params.ringCount }, (_, i) => ({
			radius: params.baseRadius + i * params.radiusStep,
			count: params.baseDotCount + i * params.dotCountStep
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
		pane = createPane('Pulse Wave Controls');

		const structureFolder = createFolder(pane, 'Structure', true);
		structureFolder.addBinding(params, 'ringCount', { min: 3, max: 8, step: 1 });
		structureFolder.addBinding(params, 'baseRadius', { min: 10, max: 25, step: 1 });
		structureFolder.addBinding(params, 'radiusStep', { min: 8, max: 25, step: 1 });
		structureFolder.addBinding(params, 'baseDotCount', { min: 4, max: 12, step: 1 });
		structureFolder.addBinding(params, 'dotCountStep', { min: 2, max: 10, step: 1 });

		const animationFolder = createFolder(pane, 'Animation', true);
		animationFolder.addBinding(params, 'pulseAmplitude', { min: 1, max: 8, step: 0.5 });
		animationFolder.addBinding(params, 'waveSpeed', { min: 0.5, max: 4, step: 0.1 });
		animationFolder.addBinding(params, 'dotSize', { min: 1, max: 4, step: 0.1 });
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
		ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fill();

		// Draw dots in concentric circles with wave effect
		getDotRings().forEach((ring, ringIndex) => {
			for (let i = 0; i < ring.count; i++) {
				const angle = (i / ring.count) * Math.PI * 2;

				// Calculate position with pulsing radius
				const radiusPulse =
					Math.sin(time * params.waveSpeed - ringIndex * 0.4) * params.pulseAmplitude;
				const x = centerX + Math.cos(angle) * (ring.radius + radiusPulse);
				const y = centerY + Math.sin(angle) * (ring.radius + radiusPulse);

				// Calculate opacity with wave effect
				const opacityWave =
					0.4 + Math.sin(time * params.waveSpeed - ringIndex * 0.4 + i * 0.2) * 0.6;

				// Draw dot
				ctx.beginPath();
				ctx.arc(x, y, params.dotSize, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${opacityWave})`;
				ctx.fill();
			}
		});
	}
</script>

<div class="animation-container">
	<div class="animation-title">Pulse Wave</div>
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
