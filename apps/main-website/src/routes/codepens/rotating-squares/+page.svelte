<script>
	// Rotating squares animation component
</script>

<div class="squares-container">
	{#each Array(4) as _, i}
		<div class="square square-{i + 1}"></div>
	{/each}
</div>

<style>
	.squares-container {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300px;
		background: linear-gradient(45deg, #2c3e50, #3498db);
		border-radius: 12px;
	}

	.square {
		position: absolute;
		width: 60px;
		height: 60px;
		border: 3px solid rgba(255, 255, 255, 0.8);
		animation: rotate 4s linear infinite;
	}

	.square-1 {
		animation-delay: 0s;
		border-color: #e74c3c;
	}

	.square-2 {
		animation-delay: 1s;
		border-color: #f39c12;
		width: 80px;
		height: 80px;
	}

	.square-3 {
		animation-delay: 2s;
		border-color: #2ecc71;
		width: 100px;
		height: 100px;
	}

	.square-4 {
		animation-delay: 3s;
		border-color: #9b59b6;
		width: 120px;
		height: 120px;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg) scale(1);
			opacity: 1;
		}
		25% {
			transform: rotate(90deg) scale(0.8);
			opacity: 0.8;
		}
		50% {
			transform: rotate(180deg) scale(1.2);
			opacity: 0.6;
		}
		75% {
			transform: rotate(270deg) scale(0.9);
			opacity: 0.8;
		}
		100% {
			transform: rotate(360deg) scale(1);
			opacity: 1;
		}
	}
</style>
