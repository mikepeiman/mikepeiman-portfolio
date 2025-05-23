<script>
	// Floating dots animation component
</script>

<div class="floating-container">
	{#each Array(6) as _, i}
		<div class="dot dot-{i + 1}"></div>
	{/each}
</div>

<style>
	.floating-container {
		position: relative;
		width: 100%;
		height: 400px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		overflow: hidden;
		border-radius: 12px;
	}

	.dot {
		position: absolute;
		width: 8px;
		height: 8px;
		background: rgba(255, 255, 255, 0.8);
		border-radius: 50%;
		animation: float 6s ease-in-out infinite;
	}

	.dot-1 {
		left: 10%;
		animation-delay: 0s;
	}

	.dot-2 {
		left: 20%;
		animation-delay: 1s;
	}

	.dot-3 {
		left: 30%;
		animation-delay: 2s;
	}

	.dot-4 {
		left: 60%;
		animation-delay: 0.5s;
	}

	.dot-5 {
		left: 70%;
		animation-delay: 1.5s;
	}

	.dot-6 {
		left: 80%;
		animation-delay: 2.5s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(400px) rotate(0deg);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		50% {
			transform: translateY(0px) rotate(180deg);
		}
	}
</style>
