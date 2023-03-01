<script>
	import '@picocss/pico';
	import '@fontsource/yeseva-one';
	import '@fontsource/josefin-sans';
</script>

<div class="main">
	<slot />
</div>

<style>
	.main {
		padding: 2rem;
	}

	:global(h1, h2, h3, h4, h5, h6) {
		font-family: 'Yeseva One', cursive;
	}
	:global(body) {
		font-family: 'Josefin Sans', sans-serif;
	}
</style>
