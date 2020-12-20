<template>
	<view>
		<view class="top">
			<view class="shenqing">申请获取以下权限:</view>
			<view class="info">获得你的公开信息(昵称，头像，地区等)</view>
		</view>
		<button class="login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">授权登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			appLoginWx() {
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (res2) => {
									uni.getUserInfo({
										provider: 'weixin',
										success: (info) => {
											// console.log(res2);
											// console.log(info);
											uni.$emit('Info',info)
			
										},
										fail: () => {
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									})
								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})
			
						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				uni.switchTab({
					url:'/pages/my/my'
				})
			},
		}
	}
</script>

<style lang="scss">
	.top{
		padding: 50px 20px;
		.shenqing{
			font-size: 16px;
			font-weight: 550px;
		}
		.info{
			color: #999;
			font-size: 14px;
			padding-top: 15px;
		}
	}
	.login{
		height: 40px;
		line-height: 40px;
		margin: 0 30px;
		color: #fff;
		background-color: #FEDE33;
		border: none;
		border-radius: 20px;
	}
</style>
