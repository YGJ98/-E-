<template>
	<scroll-view class="aaa" scroll-y style="height: 100%;" @scrolltolower="loadMore">
		<view>
			<list-card v-for="item in list" :key="item._id" :item="item" @follow = "follow"/>
			<view v-if="list.length === 0" class="noData">
				<image src="../../static/404.png"></image>
				<text class="notext">暂无数据</text>
			</view>
			
		</view>
		<uni-load-more v-if="list.length > 7" :status="load.loading"></uni-load-more>
	</scroll-view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default() {
					return {
						loading:'loading'
					}
				}
			}
		},
		data() {
			return {
				List:[]
			};
		},
		methods:{
			loadMore() {
				this.$emit('loadMore')
			},
			follow(){
				this.$emit('follow')
			}
		}
	}
</script>

<style lang="scss">
	.noData{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 100px;
		&>image{
			width: 200px;
			height: 200px;
		}
		.notext{
			padding-top: 20px;
			color: #8D8D8D;
		}
	}
</style>
