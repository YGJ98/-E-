<template>
	<view class="uni-uploader">
		<view class="uni-uploader-head">
			<view class="uni-uploader-title">点击可预览选好的图片</view>
			<view class="uni-uploader-info">{{updateList.length}}/9</view>
		</view>
		<view class="uni-uploader__file">
			<view class="uni-uploader-file-img" v-for="(item,index) in updateList" :key="index">
				<image :src="item" class="item" @click="previewImg(index)"></image>
			</view>
			<view class="uni-uploader-file-video" v-if="updateVideo.length >0">
				<video :src="updateVideo[0].tempFilePath" controls></video>
			</view>
			<view class="a" @click="update" v-if="updateList.length < 9 && updateVideo.length < 1">
				<uni-icons type="plusempty" size="32" />
			</view>
		</view>
		<view class="label">
				<view class="label_title">标签</view>
				<view class="lable_items">
					<view class="lable_item" v-for="(item,index) in lableList" :key="index" :class="{lable_itemp:tabIndex === index}" @click="clickLable(index)">{{item.name}}</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			updateList:{
				type:Array,
				default() {
					return []
				}
			},
			updateVideo:{
				type:Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				lableList:[],
				tabIndex:0
			};
		},
		created() {
			this.getLable()
		},
		methods: {
			clickLable(index) {
				this.tabIndex = index
				let name = this.lableList[index].name
				this.$emit('tab',name)
			},
			update() {
				this.$emit('update')
			},
			previewImg(current) {
				uni.previewImage({
					urls: this.updateList
				})
			},
			getLable() {
				this.$api.get_label().then(res=>{
					const {data} = res
					data.shift()
					this.lableList = data
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-uploader {
		padding: 10px;

		.uni-uploader-head {
			display: flex;
			justify-content: space-between;

			.uni-uploader-title {
				font-weight: 545;
				font-size: 16px;
			}

			.uni-uploader-info {
				color: #999;
				padding-right: 14px;
			}
		}

		.uni-uploader__file {
			padding-top: 30px;
			display: flex;
			flex-wrap: wrap;

			.uni-uploader-file-img {
				.item {
					width: 100px;
					height: 100px;
					padding: 6px;
				}
			}

			.a {
				width: 100px;
				height: 100px;
				background-color: #999;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.label{
			padding-top: 30px;
			.label_title {
				padding: 10px 0;
				border-top: 1px solid #eee;
				font-size: 16px;
			}
			.lable_items {
				display: flex;
				flex-wrap: wrap;
				.lable_item{
					padding: 3px 5px;
					border: 1px solid #eee;
					border-radius: 10px;
					margin-right: 5px;
					box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
				}
				.lable_itemp{
					background-color: #FEDE33;
					color: #fff;
				}
			}
		}
	}
</style>
