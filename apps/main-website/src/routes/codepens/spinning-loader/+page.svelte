<script>
	// Spinning loader animation component
</script>

<div class="loader-container">
	<div class="loader">
		<div class="loader-ring"></div>
		<div class="loader-ring"></div>
		<div class="loader-ring"></div>
	</div>
</div>

<style>
	.loader-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300px;
		background: radial-gradient(circle, #0f0f23, #1a1a2e);
		border-radius: 12px;
	}

	.loader {
		position: relative;
		width: 100px;
		height: 100px;
	}

	.loader-ring {
		position: absolute;
		border: 4px solid transparent;
		border-radius: 50%;
		animation: spin 2s linear infinite;
	}

	.loader-ring:nth-child(1) {
		width: 100px;
		height: 100px;
		border-top-color: #ff6b6b;
		animation-delay: 0s;
	}

	.loader-ring:nth-child(2) {
		width: 80px;
		height: 80px;
		top: 10px;
		left: 10px;
		border-right-color: #4ecdc4;
		animation-delay: 0.3s;
		animation-direction: reverse;
	}

	.loader-ring:nth-child(3) {
		width: 60px;
		height: 60px;
		top: 20px;
		left: 20px;
		border-bottom-color: #ffe66d;
		animation-delay: 0.6s;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
