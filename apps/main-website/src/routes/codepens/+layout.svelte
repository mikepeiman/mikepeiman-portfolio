<script>
	let { children } = $props();
	import '$lib/styles/app.css';
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
	<!-- Main Content -->
	<main>
		{@render children()}
	</main>
</div>
