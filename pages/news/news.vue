<template>
	<view>
		<view class="room">
			<view class="other">
				<image src="../../static/logo.png" mode=""></image>
				<view class="text">123</view>
			</view>
			<view class="my">
				<view class="text">123</view>
				<image src="../../static/logo.png" mode=""></image>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #eee;
		.room {
			padding: 10px;
			box-sizing: border-box;
			.other{
				display: flex;
				image{
					width: 45px;
					height: 45px;
					border-radius: 50%;
				}
				.text {
					padding: 5px 10px;
					background-color: #fff;
					border-radius: 10px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
			.my{
				display: flex;
				justify-content: flex-end;
				image{
					width: 45px;
					height: 45px;
					border-radius: 50%;
				}
				.text {
					padding: 5px 10px;
					background-color: #4CD964;
					border-radius: 10px;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
