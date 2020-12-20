<template>
	<view class="navbar">
		<view class="nav-fixed">
			<!-- 状态栏 -->
			<view :style="{height:statusBarHeight + 'px'}"></view>
			<!-- 导航栏 -->
			<view class="nav-gation" :style="{height:navBarHeight+'px',width:windowWidth+'px'}" @click.stop="open">
				<!-- 搜索页 -->
				<view v-if="isSearch" class="home-search">
					<view  class="nav-search">
						<view class="iconfont icon-sousuo iconS"></view>
						<input type="text" placeholder="请输入搜索内容" @input="inputChange" v-model="val"/>
					</view>
					<text class="back" @click="back">取消</text>
				</view>
				<!-- 非搜索页 -->
				<view v-if="!isSearch" class="nav-search">
					<view class="iconfont icon-sousuo iconS"></view>
					<input type="text" placeholder="请输入搜索内容" />
				</view>

			</view>
		</view>
		<view :style="{height:statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props:{
			value:{
				type:[String,Number],
				deault:''
			},
			isSearch:{
				type:Boolean,
				default:false,
				val:''
			}
		},
		data() {
			return {
				statusBarHeight:0,
				windowWidth:0,
				navBarHeight:0,
				val:''
			};
		},
		watch:{
			value(newVal) {
				this.val = newVal
			}
		},
		created() {
			const info = uni.getSystemInfoSync();
			// console.log(info)
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// console.log(this.windowWidth)
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			// console.log(menuButtonInfo)
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// console.log(this.navBarHeight)
			// #endif
		},
		methods:{
			open(){
				if(this.isSearch) return
				uni.navigateTo({
					url:'/pages/home-search/home-search'
				})
			},
			back(){
				uni.switchTab({
					url:'/pages/index/index'
				})
			},
			inputChange(e){
				// console.log(e)
				const {value} = e.detail
				this.$emit('input',value)
			}
		}
	}
</script>

<style lang="scss">
	.navbar{
		box-sizing: border-box;
		.nav-fixed{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background-color: #FEDE33;
			z-index: 999;
			.nav-gation{
				padding: 0 5px;
				display: flex;
				flex: 1;
				justify-content: space-between;
				align-items: center;
				.nav-search{
					border-radius: 10px;
					display: flex;
					padding: 5px;
					width: 100%;
					background-color: #F7F7F7;
					.iconS{
						color: #999;
						font-size: 18px;
						
					}
					input{
						padding-left: 5px;
					}
				}
				.home-search{
					display: flex;
					width: 100%;
					.nav-search{
						flex:4;
					}
					.back{
						flex: 1;
						display: flex;
						padding-left: 10px;
						align-items: center;
						font-size: 16px;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>
