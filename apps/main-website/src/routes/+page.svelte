<script>
	import { goto } from '$app/navigation';
</script>

<div
	class="flex flex-col align-middle items-center justify-center w-screen h-screen bg-gradient-to-r from-sky-400 to-indigo-200"
>
	<div class="flex bg-amber-300 p-4 rounded-2xl align-middle items-center">
		<h1 class="text-3xl font-bold">Mike Peiman</h1>
	</div>

	<button
		on:click={() => goto('/codepens')}
		class=" bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
	>
		Codepens
	</button>
</div>
