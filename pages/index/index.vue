<template>
	<view class="content">
		<navBar></navBar>
		<tab :list='tabList' @tab="tab" :swiperIndex="swiperIndex"></tab>
		<list :tab = 'tabList' @change="change" :tabIndex="tabIndex"></list>
		<view class="submit" @click="add">
			<uni-icons type="paperplane-filled" size="30" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList:[],
				tabIndex:0,
				swiperIndex:0
			}
		},
		onLoad() {
			this.getLabel()
			uni.showShareMenu({
				withShareTicket:true,
			})
		},
		 onShareAppMessage(res) {
		    return {
		      title: '小E社区',
		      path: '/pages/index/index'
		    }
		  },
		methods: {
			tab(index){
				this.tabIndex = index
			},
			change(current){
				this.swiperIndex = current	
				this.tabIndex = current
			},
			add(){
				uni.getSetting({
					success: (res) => {
						// console.log(res.authSetting)
						 if (!res.authSetting['scope.userInfo']) {
							uni.navigateTo({
								url:'/pages/login/login'
							})
						} else {
							uni.navigateTo({
								url:'/pages/home-add/home-add'
							})
						}
					}
				})
			},
			getLabel(){
				this.$api.get_label().then(res=>{
					const {data} = res
					// console.log(data)
					this.tabList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	.submit {
		position: fixed;
		bottom: 100px;
		right: 25px;
		width: 50px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FEDE33;
		border-radius: 50%;
		box-shadow: 0 0 10px #FEDE34;
	}
</style>
