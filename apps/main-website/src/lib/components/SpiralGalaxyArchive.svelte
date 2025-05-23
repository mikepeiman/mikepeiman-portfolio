<script>
	import { onMount, onDestroy } from 'svelte';
	import { createPane, createFolder } from '@mikepeiman-portfolio/common/tweakpane';

	// Props
	let { width = 180, height = 180, showControls = true } = $props();
	// Animation parameters
	let params = $state({
		particleCount: 200,
		maxRadius: 75,
		spiralArms: 3, // Number of spiral arms
		rotationSpeed: 0.1, // Base rotation speed
		spiralTightness: 0.2,
		showTrails: true,
		colorVariation: 0.3,
		trailThreshold: 1.8
	});

	let canvas;
	let ctx;
	let animationId;
	let pane;
	let time = 0;
	let lastTime = 0;
	let particles = [];

	onMount(() => {
		if (!canvas) return;

		ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

		initializeParticles();

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

	function initializeParticles() {
		particles = [];
		for (let i = 0; i < params.particleCount; i++) {
			// Random distance from center (more particles toward center)
			const distanceFactor = Math.pow(Math.random(), 0.5); // Square root distribution
			const distance = distanceFactor * params.maxRadius;

			// Random angle with spiral arm offset
			const armIndex = Math.floor(Math.random() * params.spiralArms);
			const armOffset = (armIndex / params.spiralArms) * Math.PI * 2;

			// Logarithmic spiral formula: r = a*e^(b*θ)
			// We'll use this to determine the angle offset based on distance
			const spiralAngle = Math.log(distance / 5) / params.spiralTightness;

			// Initial particle properties
			particles.push({
				distance: distance,
				angle: spiralAngle + armOffset,
				armIndex: armIndex,
				size: 1 + Math.random() * 1.5,
				opacity: 0.3 + Math.random() * 0.7,
				// Each particle has its own speed variation
				speedFactor: 0.8 + Math.random() * 0.4,
				// Color variation (from white to blue-ish)
				color: {
					r: 220 + Math.floor(Math.random() * 35),
					g: 220 + Math.floor(Math.random() * 35),
					b: 255
				}
			});
		}
	}

	// Reinitialize particles when count changes
	$effect(() => {
		if (params.particleCount !== particles.length) {
			initializeParticles();
		}
	});

	function setupControls() {
		pane = createPane('Spiral Galaxy Archive Controls');

		const galaxyFolder = createFolder(pane, 'Galaxy', true);
		galaxyFolder.addBinding(params, 'particleCount', { min: 50, max: 400, step: 10 });
		galaxyFolder.addBinding(params, 'maxRadius', { min: 50, max: 100, step: 5 });
		galaxyFolder.addBinding(params, 'spiralArms', { min: 2, max: 6, step: 1 });

		const motionFolder = createFolder(pane, 'Motion', true);
		motionFolder.addBinding(params, 'rotationSpeed', { min: 0.01, max: 0.3, step: 0.01 });
		motionFolder.addBinding(params, 'spiralTightness', { min: 0.1, max: 0.5, step: 0.01 });

		const visualFolder = createFolder(pane, 'Visual', true);
		visualFolder.addBinding(params, 'showTrails');
		visualFolder.addBinding(params, 'colorVariation', { min: 0, max: 1, step: 0.1 });
		visualFolder.addBinding(params, 'trailThreshold', { min: 1.0, max: 3.0, step: 0.1 });
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

		// Draw a simple center dot
		ctx.beginPath();
		ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fill();

		// Update and draw particles
		for (const particle of particles) {
			// Rotation speed decreases with distance (Keplerian rotation)
			const rotationFactor = 1 / Math.sqrt(particle.distance / 10);
			// Update angle based on distance from center (closer = faster)
			particle.angle += params.rotationSpeed * rotationFactor * particle.speedFactor * 0.02;

			// Calculate position
			const x = centerX + Math.cos(particle.angle) * particle.distance;
			const y = centerY + Math.sin(particle.angle) * particle.distance;

			// Particle size and opacity pulse based on arm position
			const armPhase = (time * 0.5 + particle.armIndex / params.spiralArms) % 1;
			const pulseFactor = Math.sin(armPhase * Math.PI * 2) * 0.3 + 0.7;

			// Draw trail for some particles (only the larger ones)
			if (params.showTrails && particle.size > params.trailThreshold) {
				const trailLength = particle.distance * 0.15; // Trail length proportional to distance
				const trailAngle = particle.angle - 0.1 * rotationFactor; // Trail points backward
				const trailX = centerX + Math.cos(trailAngle) * (particle.distance - trailLength);
				const trailY = centerY + Math.sin(trailAngle) * (particle.distance - trailLength);

				// Draw trail
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.lineTo(trailX, trailY);
				ctx.strokeStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${particle.opacity * pulseFactor * 0.3})`;
				ctx.lineWidth = particle.size * 0.5;
				ctx.stroke();
			}

			// Draw particle
			ctx.beginPath();
			ctx.arc(x, y, particle.size * pulseFactor, 0, Math.PI * 2);
			// Apply color with opacity
			const finalOpacity = particle.opacity * pulseFactor;
			ctx.fillStyle = `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${finalOpacity})`;
			ctx.fill();
		}
	}
</script>

<div class="animation-container">
	<div class="animation-title">Spiral Galaxy Archive</div>
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
