<template>
	<view>
		<scroll-view scroll-y="true" height="100%">
			<view class="context" v-if="formData.mode === 'image'">
				<view class="ModeTop">
					<view class="ModeTop-left">
						<view class="avatar">
							<image :src="formData.avatar" mode="aspectFit"></image>
						</view>
						<view class="author_name">
							{{formData.author_name}}
						</view>
					</view>
				</view>
				<view class="VideoContent">
					{{formData.text}}
				</view>
				<view class="con">
					<view class="conImg" v-if="formData.cover.length === 1" v-for="(i,index) in formData.cover" :key="index">
						<image :src="i" class="a" lazy-load @click="previewImg(i)"></image>
					</view>
					<view class="conImgTwo" v-else-if="formData.cover.length === 2" v-for="(i,index) in formData.cover" :key="index">
						<image :src="i" class="a" lazy-load @click="previewImg(i)"></image>
					</view>
					<view class="conImgThree" v-else-if="formData.cover.length >=3"  v-for="(i,index) in formData.cover" :key="index">
						<image :src="i" class="a" lazy-load @click="previewImg(i)"></image>
					</view>
				</view>
				
			</view>
			
			<!-- 视频模式 -->
			<view class="context Vdo" v-if="formData.mode === 'video'">
				<view class="ModeTop">
					<view class="ModeTop-left">
						<view class="avatar">
							<image :src="formData.avatar" mode="aspectFit"></image>
						</view>
						<view class="author_name">
							{{formData.author_name}}
						</view>
					</view>
				</view>
				<view class="VideoContent">
					{{formData.text}}
				</view>
				<view class="VAV">
					<video class="vidImg" :src="formData.cover[0]" controls></video>
				</view>
			</view>
			
			
			<view class="comment">最新评论</view>
			<comment-detail v-for="item in commentList" :key="item.comment_id" :comments="item" @reply="reply"></comment-detail>
			<view style="height: 45px;"></view>
			<view class="detail_bottom">
				<view class="detail_comment">
					<input type="text" value="" placeholder="谈谈你的看法" @click="open"/>
					<uni-icons type="compose" size="22" color="#F07373" class="icon"/>
				</view>
			</view>
			<uni-popup ref="popup" type="bottom" :maskClick="false">
				<view class="popup">
					<view class="popup_top">
						<view class="cancel"  @click="close">取消</view>
						<view class="textOk" @click="submit">发布</view>
					</view>
					<view class="popup-content">
						<textarea class="text-popup" placeholder="请输入评论内容" maxlength="200" v-model="commentsValue"/>
						<view class="textLength">{{commentsValue.length}}/200</view>
					</view>
				</view>
			</uni-popup>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {},
				commentsValue:'',
				commentList:[],
				replyForDate:{}
			}
		},
		onLoad(query) {
			console.log(JSON.parse(query.param))
			this.formData = JSON.parse(query.param)
			this.getComment()
		},
		methods: {
			open(){
				this.commentsValue = ''
				this.$refs.popup.open()
			},
			close(){
				this.commentsValue = ''
				this.$refs.popup.close()
			},
			submit(){
				if(!this.commentsValue) {
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
					return
				}
				this.setComment({content:this.commentsValue,...this.replyForDate})
			},
			reply(e){
				this.replyForDate ={
					"comment_id":e.comments.comment_id,
					"is_reply": e.is_reply
				}
				// console.log(e)
				if(e.comments.reply_id){
					this.replyForDate.reply_id = e.comments.reply_id
				} 
				console.log(this.replyForDate)
				this.open()
				
			},
			setComment(content) {
				const formdata ={
					article_id:this.formData._id,
					...content
				}
				// console.log(formdata)
				uni.showLoading()
				this.$api.update_comment(formdata).then((res)=>{
					console.log(res);
					uni.hideLoading()
					uni.showToast({
						title:'评论发布成功'
					})
					this.getComment()
					this.close()
					this.replyForDate = {}
					this.commentsValue = ''
				})
			},
			getComment() {
				this.$api.get_comment({
					article_id:this.formData._id
				}).then(res=>{
					console.log(res)
					const {data} = res
					// console.log(data)
					this.commentList = data
				})
			},
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
	
	.comment{
		padding: 20px;
		font-size: 20px;
		font-weight: 600;
		overflow: hidden;
	}
	.detail_bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 45px;
		background-color: #eee;
		display: flex;
		align-items: center;
		.detail_comment{
			flex: 1;
			padding: 10px 30px;
			display: flex;
			input {
				padding-left: 5px;
				width: 100%;
				height: 30px;
				border: 1px solid #999;
				border-radius: 10px;
			}
			.icon {
				position: relative;
				left: -30px;
				bottom: -4px;
			}
		}
	}
	.popup{
		width: 100%;
		background-color: #fff;
		.popup_top{
			display: flex;
			padding: 10px;
			justify-content: space-between;
			border-bottom: 1px solid #f5f5f5;
		}
		.popup-content{
			padding: 10px;
			box-sizing: border-box;
			.text-popup{
				width: 100%;
				padding: 10px 2px;
			}
			.textLength{
				display: flex;
				justify-content: flex-end;
				color: #999;
			}
		}
	}
</style>