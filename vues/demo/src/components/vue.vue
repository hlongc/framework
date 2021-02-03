<template>
	<div>
		<p>
			<router-link to="/vue/home">行业信披指引</router-link>
			<router-link to="/vue/about">公司个案分析</router-link>
			<router-link to="/vue/user">重点行业研究</router-link>
			<span>行业关键指标</span>
		</p>
		<iframe :src="src"></iframe>
	</div>
</template>

<script>
export default {
	name: '',
	data() {
		return {
			src: 'http://localhost:8080/#/'
		}
	},
	watch: {
		'$route': {
			handler(news) {
				this.src = `http://localhost:8080/#${news.path.replace('/vue', '')}`
			},
			immediate: true
		}
	}
}
</script>
<style>
iframe {
	width: 100%;
	height: 100%;
	border: none;
}
</style>
