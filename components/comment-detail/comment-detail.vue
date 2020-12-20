<template>
	<view>
		<view class="comment">
			<view class="authorInfo">
				<image :src="comments.author.avator" class="avator"></image>
				<view class="user">
					<view class="Name" v-if="comments.is_reply">{{comments.author.author_name}}</view>
					<view class="Name" v-else>{{comments.author.author_name}} <text class="reply-text">{{comments.to}}</text></view>
					<view class="CreateTime">{{comments.create_time}}</view>
				</view>
			</view>
			<view class="content">{{comments.comment_content}}</view>
			<text class="aaa" @click="commentsReply({comments,is_reply:reply})">回复</text>
			<view class="reply-content" v-for="(item,index) in comments.replys" :key="item.comment_id">
				<commentDetail :comments="item" :reply="true" @reply="commentsReply"></commentDetail>
			</view>
		</view>
	</view>
</template>

<script>
	import commentDetail from '@/components/comment-detail/comment-detail.vue'
	export default {
		name:'comment-detail',
		components:{
			commentDetail
		},
		props:{
			comments:{
				type:Object,
				default(){
					return {}
				}
			},
			reply:{
				type:Boolean,
				default:false
				
			}
		},
		
		data() {
			return {

			};
		},
		methods:{
			commentsReply(comment){
				if(comment.is_reply) {
					comment.comments.reply_id = comment.comments.comment_id
					comment.comments.comment_id = this.comments.comment_id
				}
				this.$emit('reply',comment)
			}
		}
	}
</script>

<style lang="scss">
	.comment{
		padding: 20px;
		margin-top: 20px;
		border-top: 1px solid #999;
		border-bottom: 1px solid #999;
		.authorInfo{
			display: flex;
			.avator{
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
			.user{
				padding-left: 15px;
				.Name{
					font-size: 16px;
					.reply-text{
						margin: 0 10px;
						font-weight: 600;
						color: #000;
					}
				}
				.CreateTime{
					padding-top: 10px;
					font-size: 14px;
					color: #999;
				}
			}
		}
		.content{
			padding-top: 15px;
			font-size: 16px;
			font-weight: 400;
			padding-bottom: 10px;
		}
		.aaa{
			font-size: 12px;
			margin-top: 30px;
			margin-left: 10px;
			padding: 2px 3px;
			border-radius: 5px;
			border: 1px solid #999;
			color: #999;
		}
		.reply-content{
			display: flex;
			margin: 15px 0;
			padding: 0 10px;
			border: 1px solid #eee;
		}
	}
</style>
