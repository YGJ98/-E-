<template>
	<view class="navbar">
		<view class="nav-fixed">
			<!-- 状态栏 -->
			<view :style="{height:statusBarHeight + 'px'}"></view>
			<!-- 导航栏 -->
			<view class="nav-gation" :style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<uni-icons type="arrowleft" size="24" color="#333" class="back" @click="back"></uni-icons>
				<slot></slot>
				<view class="submit" @click="submit">发布</view>
			</view>
		</view>
		<view :style="{height:statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				windowWidth: 0,
				navBarHeight: 0,
				val: ''
			};
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
			back(){
				this.$emit('back')
			},
			submit(){
				this.$emit('submit')
			}
		}
	}
</script>

<style lang="scss">
	.navbar {
		box-sizing: border-box;

		.nav-fixed {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			background-color: #FEDE33;
			z-index: 999;

			.nav-gation {
				display: flex;
				align-items: center;
				width: 100%;
				justify-content: space-between;

				.back {
					padding-left: 10px;
				}

				.submit {
					padding-right: 10px;
					font-weight: 500;
				}
			}
		}
	}
</style>
