<template>
	<view>
		<!-- 图片模式 -->
		<view class="context" v-if="item.mode === 'image'">
			<view class="ModeTop">
				<view class="ModeTop-left">
					<view class="avatar">
						<image :src="item.author.avatar" mode="aspectFit"></image>
					</view>
					<view class="author_name">
						{{item.author_name}}
					</view>
				</view>
				<view class="MpdeTop-right">
					<view class="guanzhu" @click="follow(item.author.id)" :class="{AK:item.is_author===true || isLike===true}">
						<uni-icons type="plusempty" size="20" color="" />
						<text>关注</text>
					</view>
				</view>
			</view>
			<view class="VideoContent">
				{{item.content.text}}
			</view>
			<view class="con">
				<view class="conImg" v-if="item.content.cover.length === 1" v-for="(i,index) in item.content.cover" :key="index">
					<image :src="i" class="a" lazy-load @click="previewImg(i)"></image>
				</view>
				<view class="conImgTwo" v-else-if="item.content.cover.length === 2" v-for="(i,index) in item.content.cover" :key="index">
					<image :src="i" class="a" lazy-load @click="previewImg(i)"></image>
				</view>
				<view class="conImgThree" v-else-if="item.content.cover.length >=3"  v-for="(i,index) in item.content.cover" :key="index">
					<image :src="i" class="a" lazy-load @click="previewImg(i)"></image>
				</view>
			</view>
			<view class="comment">
				<view class="dianzan">
					<uni-icons type="hand-thumbsup-filled" size="22" :color="item.is_thumbs_up?'#FEDE33':'#D5D5D5'" @click="thumbsup(item._id)"/>
					<view class="iconA">{{item.up_count}}</view>
					<uni-icons type="hand-thumbsdown-filled" size="22" :color="item.is_thumbs_down?'#FEDE33':'#D5D5D5'" @click="thumbsdown(item._id)"/>
					<view class="iconA">{{item.down_count}}</view>

				</view>
				<view class="pinglun" @click="open">
					<uni-icons type="chat-filled" size="22" color="#D5D5D5" />
					<text class="icon">{{item.comments_count}}</text>
				</view>
			</view>
		</view>

		<!-- 视频模式 -->
		<view class="context Vdo" v-if="item.mode === 'video'">
				<view class="ModeTop">
					<view class="ModeTop-left">
						<view class="avatar">
							<image :src="item.author.avatar" mode="aspectFit"></image>
						</view>
						<view class="author_name">
							{{item.author_name}}
						</view>
					</view>
					<view class="MpdeTop-right">
						<view class="guanzhu" @click="follow(item.author.id)"
						:class="{AK:item.is_author===true || isLike===true}">
							<uni-icons type="plusempty" size="20" color="" />
							<text>关注</text>
						</view>
					</view>
				</view>
				<view class="VideoContent">
					{{item.content.text}}
				</view>
				<view class="VAV">
					<video class="vidImg" :src="item.content.cover[0]" controls></video>
				</view>
			<view class="comment">
				<view class="dianzan">
					<uni-icons type="hand-thumbsup-filled" size="22" :color="item.is_thumbs_up?'#FEDE33':'#D5D5D5'" @click="thumbsup(item._id)" />
					<view class="iconA">{{item.up_count}}</view>
					<uni-icons type="hand-thumbsdown-filled" size="22" :color="item.is_thumbs_down?'#FEDE33':'#D5D5D5'" @click="thumbsdown(item._id)" />
					<view class="iconA">{{item.down_count}}</view>
				</view>
				<view class="pinglun" @click="open">
					<uni-icons type="chat-filled" size="22" color="#D5D5D5" />
					<text class="icon">{{item.up_count}}</text>
					
				</view>
			</view>
		</view>

		
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			},
		},
		data() {
			return {
				isLike : false
			};
		},
		
		methods:{
			follow(author_id){
				// console.log(author_id)
				this.isLike = true
				this.setLikeAuthor(author_id)
				this.$emit('follow')
			},
			// 是否关注
			setLikeAuthor(author_id) {
				this.$api.update_author({
					author_id,
					article_id:this.item._id
				}).then(res=>{
					// console.log(res)
				})
			},
			previewImg(current) {
				// console.log(current)
				if (!uni.getStorageSync('userinfo')) {
				 	uni.navigateTo({
				 		url:'/pages/login/login'
				 	})
				 } else {
					uni.previewImage({
						urls:this.item.content.cover
					})
				}
			},
			// 打开详情
			open() {
				if (!uni.getStorageSync('userinfo')) {
					uni.navigateTo({
						url:'/pages/login/login'
					})
				} else {
					const item = this.item
					// console.log(this.item)
					const param = {
						avatar:item.author.avatar,
						text: item.content.text,
						cover: item.content.cover,
						mode: item.mode,
						author_name: item.author_name,
						_id:item._id
					}
					uni.navigateTo({
						url: '/pages/home-detail/home-detail?param='+JSON.stringify(param)
					})
				}
				
				
			},
			//点赞
			thumbsup(article_id){
				if (!uni.getStorageSync('userinfo')) {
					uni.navigateTo({
						url:'/pages/login/login'
					})
				} else {
					if(this.item.is_thumbs_up) {
						uni.showToast({
							title:'你已点过赞了'
						})
					}else{
						this.setUpThumbs(article_id)
					}
				}
			},
			thumbsdown(article_id){
				if (!uni.getStorageSync('userinfo')) {
					uni.navigateTo({
						url:'/pages/login/login'
					})
				} else {
					if(this.item.is_thumbs_down) {
						uni.showToast({
							title:'请手下留情'
						})
					} else{
						this.setDownThumbs(article_id)
					}
				}
			},
			setUpThumbs(article_id) {
				this.$api.update_thumbs({
					article_id
				}).then(res=>{
					this.item.is_thumbs_up = !this.item.is_thumbs_up
					this.item.up_count++
				})
			},
			setDownThumbs(article_id) {
				this.$api.update_thumbs_down({
					article_id
				}).then(res=>{
					this.item.is_thumbs_down = !this.item.is_thumbs_down
					this.item.down_count++
				})
			}
		}
	}
</script>

<style lang="scss">
	.context {
		border-bottom: 1px solid #eee;
		padding: 10px;

		.ModeTop {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.ModeTop-left {
				display: flex;
				align-items: center;

				.avatar {
					&>image {
						width: 45px;
						height: 45px;
						border-radius: 50%;
					}
				}

				.author_name {
					padding: 0 10px;
					color: #989898;
				}
			}

			.MpdeTop-right {
				display: flex;
				align-items: center;
				padding-right: 15px;

				.guanzhu {
					background-color: #F4F4F4;
					padding: 3px 8px;
					border-radius: 7px;
					margin-right: 15px;
				}
				.AK{
					display: none;
				}
			}
		}

		.VideoContent {
			padding-top: 15px;
			padding-left: 10px;
			font-size: 16px;
		}

		.con {
			.conImg {
				margin-top: 10px;
				border-radius: 10px;
				width: 100%;
				border: 1xp  solid red;
				&>image {
					width: 100%;
					border-radius: 10px;
				}
			}
			.conImgTwo{
				margin-top: 10px;
				width: 100%;
				display: flex;
				.a{
					width: 200px;
					height: 100px;
					margin-right: 10px;
				}
			}
			.conImgThree{
				margin-top: 10px;
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				.a{
					width: 105px;
					height: 105px;
					margin-right: 13px;
					margin-bottom: 10px;
				}
			}
		}
		.comment {
			display: flex;
			justify-content: space-between;
			padding: 15px;
			padding-bottom: 10px;
			.dianzan {
				display: flex;
				align-items: center;

				.iconA {
					color: #D5D5D5;
					font-size: 18px;
					padding: 0 8px;

				}
			}

			.pinglun {
				display: flex;
				align-items: center;

				.icon {
					color: #D5D5D5;
					font-size: 18px;
					padding: 0 4px;
				}
			}
		}
	}

	.Vdo {
		.VAV{
			width: 100%;
			padding-top: 10px;
			.vidImg{
				width: 100%;
				border-radius: 10px;
			}
		}
	}
</style>
