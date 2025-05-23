<script>
	// Sliding bars animation component
</script>

<div class="bars-container">
	{#each Array(6) as _, i}
		<div class="bar bar-{i + 1}"></div>
	{/each}
</div>

<style>
	.bars-container {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		width: 100%;
		height: 300px;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 12px;
		padding: 20px;
		box-sizing: border-box;
	}

	.bar {
		width: 30px;
		background: linear-gradient(to top, #ff6b6b, #4ecdc4);
		border-radius: 15px 15px 0 0;
		animation: slide 2s ease-in-out infinite;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.bar-1 {
		height: 60px;
		animation-delay: 0s;
	}

	.bar-2 {
		height: 100px;
		animation-delay: 0.2s;
		background: linear-gradient(to top, #ffecd2, #fcb69f);
	}

	.bar-3 {
		height: 80px;
		animation-delay: 0.4s;
		background: linear-gradient(to top, #a8edea, #fed6e3);
	}

	.bar-4 {
		height: 120px;
		animation-delay: 0.6s;
		background: linear-gradient(to top, #d299c2, #fef9d7);
	}

	.bar-5 {
		height: 90px;
		animation-delay: 0.8s;
		background: linear-gradient(to top, #89f7fe, #66a6ff);
	}

	.bar-6 {
		height: 70px;
		animation-delay: 1s;
		background: linear-gradient(to top, #fdbb2d, #22c1c3);
	}

	@keyframes slide {
		0%,
		100% {
			transform: translateY(0) scaleY(1);
		}
		25% {
			transform: translateY(-20px) scaleY(1.2);
		}
		50% {
			transform: translateY(-40px) scaleY(0.8);
		}
		75% {
			transform: translateY(-20px) scaleY(1.1);
		}
	}
</style>
