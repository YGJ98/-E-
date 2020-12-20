<template>
	<view class="content">
		<swiper class="swiper" :style="{height:swiperHeight+'px'}" @change="change" :current="tabIndex">
			<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
				<listItem :list ="listCatchData[index]" :load="load[index]" @loadMore="loadMore" @follow = "follow"></listItem>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		props:{
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			tabIndex: {
				type:Number,
				default:0
			}
		},
		data() {
			return {
				swiperHeight:0,
				list:[],
				listCatchData:{},
				load:{},
				pageSize:10
			};
		},
		components:{
			listItem
		},
		watch:{
			tab(newVal){
				// console.log(newVal)
				if(newVal.length === 0) return
				this.getList(this.tabIndex)
			}
		},
		created() {
			const {screenHeight} = uni.getSystemInfoSync()
			this.swiperHeight = screenHeight
		},
		methods:{
			loadMore() {
				if (this.load[this.tabIndex].loading === 'noMore') return
				this.load[this.tabIndex].page++
				this.getList(this.tabIndex)
			},
			follow() {
				this.getList(this.tabIndex)
			},
			change(e){
				// console.log(e)
				const {current} = e.detail  //切换索引号
				this.$emit('change',current)
				// console.log(this.tab[current].name)
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}
				
			},
			getList(current){
				// console.log(this.tab)
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				
				this.$api.get_list({
					name: this.tab[current].name,
					page:this.load[current].page,
					pageSize:this.pageSize
				}).then(res=>{
					// console.log(res)
					const {data} = res
					// this.list = data
					// this.listCatchData[current] = data
					if (data.length === 0) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load, current, oldLoad)
						// 强制渲染页面
						this.$forceUpdate()
						return
					}
					
					let oldList = this.listCatchData[current] || []
					oldList.push(...data.reverse())
					this.$set(this.listCatchData,current,oldList)
				})
			}
		}
	}
</script>

<style lang="scss">
</style>
