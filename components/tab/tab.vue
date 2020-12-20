<template>
	<view>
		<view class="tab">
			<scroll-view scroll-x class="tab-scroll">
				<view class="tab-list">
					<view class="tab-list-item" v-for="(item,index) in list" :key="index" @click="tabItem(item,index)" :class="{active:tabIndex===index}">
					{{item.name}}
					<view class="tab-item-line" v-if="tabIndex === index"></view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="height: 40px;"></view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type: Array,
				default() {
					return []
				}
			},
			swiperIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				tabIndex:0
			};
		},
		watch:{
			swiperIndex(newVal,oldVal) {
				// console.log(newVal,oldVal)
				this.tabIndex = newVal
			}
		},
		methods:{
			tabItem(item,index) {
				// console.log(item,index)
				this.tabIndex = index
				this.$emit('tab',index)
			}
		}
	}
</script>

<style lang="scss">
	.tab{
		position: fixed;
		display: flex;
		background-color: #fff;
		z-index: 999;
		.tab-scroll{
			flex: 1;
			.tab-list{
				display: flex;
				padding: 10px 3px;
				.tab-list-item{
					padding: 0 15px;
					flex-shrink: 0;
					color: #969696;
					font-weight: 600;
					.tab-item-line{
						border-bottom: 6rpx solid #FEDE33;
						border-top: 6rpx solid #FEDE33;
						border-radius:20rpx;
					}
				}
				.active {
					color: #343434;
				}
				
			}
		}
	}
</style>
