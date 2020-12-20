<template>
	<view>
		<list-card v-for="item in list" :key="item._id" :item="item"></list-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.getArticle()
		},
		methods: {
			getArticle() {
				this.$api.my_article().then(res=>{
					const {data} = res
					this.list = data
				})
			},
		}
	}
</script>

<style>

</style>
