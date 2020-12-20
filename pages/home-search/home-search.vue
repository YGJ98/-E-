<template>
	<view>
		<navBar v-model="value" :isSearch="true" @input="change"></navBar>
		<view class="home" v-if="is_histroy">
			<view class="home-title">
				<view class="history">搜索历史</view>
				<view class="clear" @click="clear">清空</view>
			</view>
			<view class="history-search">
				<view class="item" v-for="(item,index) in historyList" :key="index" @click="openHistory(item)">{{item.name}}</view>
			</view>
			<view class="noData">
				暂无数据
			</view>
		</view>
		<view v-else class="scroll">
			<scroll-view scroll-y >
				<uni-load-more v-if="loading" status="loading" iconType="snow"/>
				<view v-if="searchList.length > 0" style="height: 100%;">
					<list-card v-for="item in searchList" :key="item._id" :item="item" @clickTo="setHistory"></list-card>
				</view>
			</scroll-view>
			<view v-if="searchList.length ===0 && !loading" class="no-search" :style="{height: infoHeight - 50+'px'}">
				<view class="a">
					<image src="../../static/404.png" class="img"></image>
					<view>暂无数据</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				value:'',
				is_histroy: true,
				searchList: [],
				infoHeight:0,
				loading:false
			}
		},
		computed:{
			...mapState(['historyList'])
		},
		created() {
			let info = uni.getSystemInfoSync()
			this.infoHeight = info.windowHeight
		},
		methods:{
			setHistory(){
				this.$store.dispatch('set_history',{
					name: this.value
				})
			},
			openHistory(item){
				this.value = item.name
				this.getSearch(this.value)
			},
			clear(){
				this.$store.dispatch('clear_history')
				uni.showToast({
					title:'清空完成'
				})
			},
			change(value){
				this.value = value
				if(!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				if(!this.mark) {
					this.mark = true
					const timer = setTimeout(()=>{
						this.mark = true
						this.getSearch(value)
					},1000)
				}
			},
			getSearch(value) {
				if(!value) {
					this.searchList = []
					this.is_histroy = true
					return
				}
				this.loading = true
				this.is_histroy = false
				this.$api.get_search({
					value
				}).then(res=>{
					const {data} = res
					this.loading = false
					this.searchList = data
				}).catch(()=>{
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;

		.home {
			padding: 10px;
			background-color: #fff;

			.home-title {
				display: flex;
				justify-content: space-between;
				font-size: 16px;
				font-weight: 500;
				border-bottom: 1px solid #eee;
				padding-bottom: 10px;

				.clear {
					color: #30b33a;
				}
			}

			.history-search {
				padding: 10px 0;
				display: flex;
				flex-wrap: wrap;

				.item {
					border: 1px solid #eee;
					padding: 3px 5px;
					border-radius: 10px;
					margin: 5px;
				}
			}

			.noData {
				display: flex;
				align-items: center;
				justify-content: center;
				color: #999;
				padding: 20px 0;
				font-size: 16px;

			}
		}
		.scroll{
			height: 100%;
			background-color: #fff;
			.no-search{
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
				.a{
					position: absolute;
					top: 150px;
					text-align: center;
					&>image{
						width: 200px;
						height: 200px;
					}
				}
			}
		}
	}
</style>
