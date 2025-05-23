<script>
	// Pulsing orb animation component
</script>

<div class="orb-container">
	<div class="orb">
		<div class="orb-inner"></div>
	</div>
</div>

<style>
	.orb-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 300px;
		background: radial-gradient(circle, #1a1a2e, #16213e);
		border-radius: 12px;
	}

	.orb {
		position: relative;
		width: 120px;
		height: 120px;
		border-radius: 50%;
		background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
		animation: pulse 2s ease-in-out infinite;
		box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
	}

	.orb-inner {
		position: absolute;
		top: 20%;
		left: 20%;
		width: 60%;
		height: 60%;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		animation: innerPulse 2s ease-in-out infinite reverse;
	}

	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
		}
		50% {
			transform: scale(1.1);
			box-shadow: 0 0 50px rgba(255, 107, 107, 0.8);
		}
	}

	@keyframes innerPulse {
		0%,
		100% {
			opacity: 0.3;
			transform: scale(1);
		}
		50% {
			opacity: 0.6;
			transform: scale(0.8);
		}
	}
</style>
