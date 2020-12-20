<template>
	<view>
		<view class="optionText">意见反馈：</view>
		<view class="text-content">
			<textarea placeholder="请输入反馈问题" maxlength="200" class="TextSub" v-model="content"/>
		</view>
		<view class="imgText">反馈图片：</view>
		<view class="files">
			<view class="file">
				<view class="addImg" v-for="(item,index) in imgList">
					<image :src="item.url" mode=""></image>
					<view class="del" @click="del(index)">×</view>
				</view>
				<view class="add" @click="add">+</view>
			</view>
			
		</view>
		<button type="primary" @click="submit">提交反馈意见</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[],
				content:''
			}
		},
		methods: {
			add() {
				const count = 3 - this.imgList.length
				uni.chooseImage({
					count: count,
					success: (res) => {
						const tempFilePaths = res.tempFilePaths
						tempFilePaths.forEach((item,index) => {
							if(index < count) {
								this.imgList.push({
									url:item
								})
							}
						})
					}
				})
			},
			del(index) {
				this.imgList.splice(index,1)
			},
			async submit() {
				let imagePath = []
				uni.showLoading()
				for(let i = 0; i < this.imgList.length; i++) {
					const filePath = this.imgList[i].url
					filePath = await this.uploadFiles(filePath)
					imageList.push(filePath)
				}
				
				// console.log(imagePath)
				this.feedback({
					content:this.content,
					feedbackImages:imagePath
				})
			},
			async uploadFiles(filePath) {
				const result = await uniCloud.uploadFile({
					filePath:filePath
				})
				// console.log(result)
				return result.fileID
			},
			feedback({content,feedbackImages}) {
				this.$api.feedback({content,feedbackImages}).then(res=>{
					// console.log(res)
					uni.hideLoading()
					uni.showToast({
						title: "反馈提交成功",
						icon:"none"
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/my/my'
						})
					},2000)
				}).catch(err=>{
					uni.hideLoading()
					uni.showToast({
						title: "反馈提交失败",
						icon:"none"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	.text-content{
		padding: 10px;
		padding-top: 20px;
		.TextSub{
			width: 100%;
			height: 150px;
			border: 1px solid #999;
		}
	}
	.files{
		padding: 10px;
		display: flex;
		flex-wrap: wrap;
		.file {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.addImg{
				image {
					width: 80px;
					height: 80px;
					margin: 10px;
					vertical-align: middle;
				}
				.del {
					width: 20px;
					height: 20px;
					background-color: #f0ad4e;
					border-radius: 50%;
					line-height: 20px;
					text-align: center;
					color: #fff;
					position: relative;
					bottom: 100px;
					left: 80px;
				}
			}
			.add {
				width: 80px;
				height: 80px;
				border: 1px solid #999;
				font-size: 32px;
				text-align: center;
				line-height: 80px;
				margin: 10px;
			}
		}
	}
</style>
