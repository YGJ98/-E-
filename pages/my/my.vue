<template>
	<view class="my">
		<view class="my-top">
			<view class="userInfo" @click="login" v-if="!isLogin">
				<image src="../../static/logo/initUser.jpg" mode="" class="avator"></image>
				<view class="userName">用户名称</view>
			</view>
			<view class="userInfo" @click="login" v-else>
				<image :src="userinfo.avatar" class="avator"></image>
				<view class="userName">{{userinfo.author_name}}</view>
			</view>
		</view>
		<view class="content">
			<view class="my-titlt">
				<view class="guanzhu" @click="guanzhu">
					<view class="text">关注</view>
					<view class="count">{{followCount}}</view>
				</view>
				<view class="guanzhu" @click="myArticle">
					<view class="text">动态</view>
					<view class="count">{{articleCount}}</view>
				</view>
			</view>
			<view class="card">
				<view class="ziliao" @click="opinion">
					<uni-icons type="help" size="20" class="gear" />
					<text class="jiben">意见反馈</text>
					<uni-icons type="arrowright" class="arrow" />
				</view>
				<button type="default" @click="clearLogin">注销账号</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				isLogin: false,
				followCount:0,
				list:[],
				signature:"",
				user:[],
				userinfo:{},
				articleCount:0,
			}
		},
		// computed:{
		// 	...mapState(['userinfo'])
		// },
		onLoad() {
			uni.$on('Info',res=>{
				// console.log(res)
				console.log(userInfo)
				const {userInfo} = res
				// this.userInfo = userInfo
				if(this.res =={}) {
					this.isLogin = false
				} else {
					this.isLogin = true
				}
				this.getLogin(userInfo)
			})
			this.getUser()
		},
		onShow(){
			 
			if(uni.getStorageSync('userinfo')) {
				this.userinfo = uni.getStorageSync('userinfo')
				this.isLogin = true
			}
		},
		methods: {
			guanzhu(){
				// if(!this.isLogin) {
				// 	uni.navigateTo({
				// 		url:'/pages/login/login'
				// 	})
				// } else {
				// 	uni.navigateTo({
				// 		url:'/pages/follower/follower'
				// 	})
				// }
			},
			login() {
				this.userinfo = ""
				if (!uni.getStorageSync('userinfo')) {
					uni.navigateTo({
						url:'/pages/login/login'
					})
				}
			},
			myArticle(){
				if(!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url:'/pages/my-article/my-article'
					})
				}
			},
			opinion() {
				if(!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				} else {
					uni.navigateTo({
						url: '/pages/user-opinion/user-opinion'
					})
				}
			},
			setLogin(userInfo) {
				const {
					avatarUrl,
					nickName,
					gender
				} = userInfo
				let sex = gender===1? '男':'女'
				uniCloud.callFunction({
					name:'login',
					data:{
						avatarUrl,
						nickName,
						sex
					}
				}).then(res=>{
					// console.log(res.result)
					this.isLogin = true
				})
			},
			getLogin(userInfo) {
				
				const {nickName} = userInfo
				uniCloud.callFunction({
					name: 'get_login',
					data:{
						nickName
					},
					
				}).then(res=>{
					// console.log(res.result)
					const {data} = res.result
					// console.log(data)
					if(data.length === 0) {
						this.setLogin(userInfo)
						this.getLogin(userInfo)
					} else if(data.length > 0) {
						this.$store.dispatch('set_userinfo',data[0])
						this.userinfo = uni.getStorageSync('userinfo')
						this.isLogin = true
					}
					
				})
			},
			clearLogin(){
				// console.log(this.userInfo)
				if(!this.isLogin) {
					uni.showToast({
						title:"用户未登录"
					})
				} else {
					this.$api.clear_login({
						user_id:this.userinfo._id
					}).then(res=>{
						console.log(res)
					})
					this.$store.dispatch("clear_userinfo")
					this.isLogin = false
					uni.navigateTo({
						url:'/pages/my/my'
					})
				}
			},
			getUser() {
				this.$api.get_user().then(res=>{
					console.log(res.data[0])
					const {article_ids,Followers_ids} = res.data[0]
					this.followCount = Followers_ids.length
					this.articleCount = article_ids.length
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #FFFADD;

		.my-top {
			height: 180px;
			background-color: #FEDE33;
			padding: 10px;

			.userInfo {
				display: flex;
				align-items: center;
				padding: 15px 15px;

				.avator {
					width: 50px;
					height: 50px;
					border-radius: 50%;
				}

				.userName {
					color: #fff;
					font-weight: 600;
					margin-left: 10px;
				}
			}
		}

		.content {
			position: absolute;
			top: 100px;
			background-color: #fff;
			width: 355px;
			height: 300px;
			margin: 10px;
			z-index: 999;
			border-radius: 10px;

			.my-titlt {
				display: flex;
				justify-content: space-around;
				padding: 20px 10px;
				margin-top: 20px;
				font-size: 18px;
				font-weight: 600;
				color: #999;

				.guanzhu {
					display: flex;
					flex-direction: column;
					align-items: center;

					.text {
						padding-bottom: 6px;
					}
				}
			}

			.card {
				padding: 10px;
				margin-top: 30px;

				.ziliao {
					display: flex;
					border-bottom: 1px solid #eee;
					padding: 20px 0;
					.gear {
						flex: 2;
					}

					.jiben {
						flex: 8;
					}

					.arrow {
						flex: 2;
					}
				}
				
			}
		}

		
	}
</style>
