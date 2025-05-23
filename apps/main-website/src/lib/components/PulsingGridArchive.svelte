<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		gridSize: 5, // 5x5 grid
		spacing: 15,
		breathingSpeed: 0.5, // Speed of expansion/contraction
		waveSpeed: 1.2, // Speed of wave patterns
		colorPulseSpeed: 1.0, // Speed of color pulsing
		showConnections: true,
		centerDotSize: 3,
		maxDotSize: 3,
		lineOpacity: 0.1
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
		pane = createPane('Pulsing Grid Archive Controls');

		const gridFolder = createFolder(pane, 'Grid', true);
		gridFolder.addBinding(params, 'gridSize', { min: 3, max: 9, step: 2 }); // Keep odd numbers for center
		gridFolder.addBinding(params, 'spacing', { min: 8, max: 25, step: 1 });

		const animationFolder = createFolder(pane, 'Animation', true);
		animationFolder.addBinding(params, 'breathingSpeed', { min: 0.1, max: 2.0, step: 0.1 });
		animationFolder.addBinding(params, 'waveSpeed', { min: 0.5, max: 3.0, step: 0.1 });
		animationFolder.addBinding(params, 'colorPulseSpeed', { min: 0.5, max: 3.0, step: 0.1 });

		const visualFolder = createFolder(pane, 'Visual', true);
		visualFolder.addBinding(params, 'showConnections');
		visualFolder.addBinding(params, 'centerDotSize', { min: 1, max: 6, step: 0.5 });
		visualFolder.addBinding(params, 'maxDotSize', { min: 1, max: 6, step: 0.1 });
		visualFolder.addBinding(params, 'lineOpacity', { min: 0.05, max: 0.3, step: 0.05 });
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

		// Calculate breathing effect - grid expands and contracts
		const breathingFactor = Math.sin(time * params.breathingSpeed) * 0.2 + 1.0; // 0.8 to 1.2

		// Draw center dot
		ctx.beginPath();
		ctx.arc(centerX, centerY, params.centerDotSize, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fill();

		// Draw pulsing grid pattern
		for (let row = 0; row < params.gridSize; row++) {
			for (let col = 0; col < params.gridSize; col++) {
				// Skip center point
				if (row === Math.floor(params.gridSize / 2) && col === Math.floor(params.gridSize / 2))
					continue;

				// Calculate base position
				const baseX = (col - (params.gridSize - 1) / 2) * params.spacing;
				const baseY = (row - (params.gridSize - 1) / 2) * params.spacing;

				// Calculate distance and angle from center for effects
				const distance = Math.sqrt(baseX * baseX + baseY * baseY);
				const maxDistance = (params.spacing * Math.sqrt(2) * (params.gridSize - 1)) / 2;
				const normalizedDistance = distance / maxDistance;
				const angle = Math.atan2(baseY, baseX);

				// Apply complex wave effects
				// 1. Radial wave (expands from center)
				const radialPhase = (time - normalizedDistance) % 1;
				const radialWave = Math.sin(radialPhase * Math.PI * 2) * 4;

				// 2. Spiral wave (rotates around center)
				const spiralPhase = (angle / (Math.PI * 2) + time * 0.3) % 1;
				const spiralWave = Math.sin(spiralPhase * Math.PI * 2) * 3;

				// 3. Breathing effect (entire grid expands/contracts)
				const breathingX = baseX * breathingFactor;
				const breathingY = baseY * breathingFactor;

				// Combine all effects
				const waveX = centerX + breathingX + Math.cos(angle) * radialWave;
				const waveY = centerY + breathingY + Math.sin(angle) * radialWave;

				// Dot size varies with distance and time
				const baseSize = 1.5 + (1 - normalizedDistance) * 1.5;
				// Complex pulsing effect
				const pulseFactor = Math.sin(time * 2 + normalizedDistance * 5) * 0.6 + 1;
				const size = baseSize * pulseFactor;

				// Color effects - subtle gradient between white and light blue
				const blueAmount =
					Math.sin(time * params.colorPulseSpeed + normalizedDistance * 3) * 0.3 + 0.3;
				const whiteness = 1 - blueAmount;
				// Calculate RGB values
				const r = Math.floor(255 * whiteness + 200 * blueAmount);
				const g = Math.floor(255 * whiteness + 220 * blueAmount);
				const b = 255;

				// Calculate opacity with subtle pulse
				const opacity = 0.5 + Math.sin(time * 1.5 + angle * 3) * 0.2 + normalizedDistance * 0.3;

				// Draw connecting lines (create a network effect)
				if (
					params.showConnections &&
					row > 0 &&
					col > 0 &&
					row < params.gridSize - 1 &&
					col < params.gridSize - 1
				) {
					// Connect to adjacent points
					const neighbors = [
						{ r: row - 1, c: col }, // top
						{ r: row, c: col + 1 }, // right
						{ r: row + 1, c: col }, // bottom
						{ r: row, c: col - 1 } // left
					];

					for (const neighbor of neighbors) {
						// Calculate neighbor position
						const nBaseX = (neighbor.c - (params.gridSize - 1) / 2) * params.spacing;
						const nBaseY = (neighbor.r - (params.gridSize - 1) / 2) * params.spacing;
						// Apply breathing effect
						const nBreathingX = nBaseX * breathingFactor;
						const nBreathingY = nBaseY * breathingFactor;

						// Skip center point
						if (
							neighbor.r === Math.floor(params.gridSize / 2) &&
							neighbor.c === Math.floor(params.gridSize / 2)
						)
							continue;

						// Calculate distance for line opacity
						const lineDistance = Math.sqrt(
							Math.pow(col - neighbor.c, 2) + Math.pow(row - neighbor.r, 2)
						);
						const lineOpacity = params.lineOpacity + Math.sin(time * 1.5 + lineDistance * 2) * 0.05;

						// Draw line
						ctx.beginPath();
						ctx.moveTo(waveX, waveY);
						ctx.lineTo(centerX + nBreathingX, centerY + nBreathingY);
						ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
						ctx.lineWidth = 0.5;
						ctx.stroke();
					}
				}

				// Draw dot
				ctx.beginPath();
				ctx.arc(waveX, waveY, size, 0, Math.PI * 2);
				ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
				ctx.fill();
			}
		}
	}
</script>

<div class="animation-container">
	<div class="animation-title">Pulsing Grid Archive</div>
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
