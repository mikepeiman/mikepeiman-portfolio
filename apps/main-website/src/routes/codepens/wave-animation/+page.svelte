<script>
	// Wave animation component
</script>

<div class="wave-container">
	{#each Array(5) as _, i}
		<div class="wave wave-{i + 1}"></div>
	{/each}
</div>

<style>
	.wave-container {
		position: relative;
		width: 100%;
		height: 300px;
		background: linear-gradient(to bottom, #000428, #004e92);
		border-radius: 12px;
		overflow: hidden;
	}

	.wave {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		background: linear-gradient(45deg, rgba(0, 150, 255, 0.3), rgba(0, 255, 150, 0.3));
		border-radius: 50% 50% 0 0;
		animation: wave 3s ease-in-out infinite;
	}

	.wave-1 {
		animation-delay: 0s;
		height: 80px;
	}

	.wave-2 {
		animation-delay: 0.5s;
		height: 60px;
		background: linear-gradient(45deg, rgba(255, 0, 150, 0.3), rgba(150, 0, 255, 0.3));
	}

	.wave-3 {
		animation-delay: 1s;
		height: 100px;
		background: linear-gradient(45deg, rgba(255, 150, 0, 0.3), rgba(255, 0, 0, 0.3));
	}

	.wave-4 {
		animation-delay: 1.5s;
		height: 70px;
		background: linear-gradient(45deg, rgba(0, 255, 0, 0.3), rgba(255, 255, 0, 0.3));
	}

	.wave-5 {
		animation-delay: 2s;
		height: 90px;
		background: linear-gradient(45deg, rgba(150, 255, 0, 0.3), rgba(0, 150, 255, 0.3));
	}

	@keyframes wave {
		0%,
		100% {
			transform: translateX(-100px) scaleY(1);
			opacity: 0.7;
		}
		50% {
			transform: translateX(100px) scaleY(1.2);
			opacity: 1;
		}
	}
</style>
