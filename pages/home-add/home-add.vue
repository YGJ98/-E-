<template>
	<view>
		<add-bar @submit="submit" @back ="back">
			<view class="Privacy" @click="Privacy">
				<view>{{tabList[tabStatus]}}</view>
				<uni-icons type="arrowdown" size="18" color="#666" class="clone" />
			</view>
		</add-bar>
		<view class="text-content">
			<textarea placeholder="说一句吧~~" maxlength="200" class="TextSub" v-model="text"/>
		</view>
		<update-img @update="update" @tab="tab" :updateList="updateList" :updateVideo="updateVideo"></update-img>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				tabList:['所有人可见', '自己可见'],
				updateList: [],
				updateVideo: [],
				list:[],
				tabStatus:0,
				text:'',
				classify:'',
				name:'情感',
				type:'',
				length:''
			}
		},
		created() {
			const aaa = uni.getStorageSync('aaa')
			this.text = aaa.text
			
		},
		methods: {
			Privacy() {
				uni.showActionSheet({
					itemList: this.tabList,
					success: (res)=> {
						this.tabStatus = res.tapIndex
					}
				})
			},
			tab(name){
				// console.log(name)
				this.name = name
			},
			back() {
				let uList = null
				let type = null
				if(this.type === 'image') {
					uList = this.updateList,
					type = this.type
				} else {
					uList = this.updateVideo
					type = this.type
				}
				let article = {
					text:this.text,
					VI: {
						uList,
						type
					}
				}
				if(this.text === undefined && this.updateList.length ==0 && this.updateVideo.length ==0) {
					uni.showModal({
						title:'是否退出',
						success: (res) => {
							if(res.confirm) {
								uni.switchTab({
									url:'/pages/index/index'
								})
							}
						}
					})
				} else {
					uni.showModal({
						title:'是否保存为草稿',
						confirmText:'保留',
						cancelText:'不保留',
						success: (res) => {
							if(res.confirm) {
								uni.setStorageSync('aaa',article)
								console.log(article)
								uni.switchTab({
									url:'/pages/index/index'
								})
							} else if(res.cancel) {
								uni.clearStorageSync('aaa',article)
								uni.switchTab({
									url:'/pages/index/index'
								})
							}
						}
					})
				}
			},
			update(){
				if(!this.isType) {
					uni.chooseMedia({
						count: 9,
						mediaType: ['image', 'video'],
						sourceType: ['album', 'camera'],
						maxDuration: 30,
						sizeType: 'compressed',
						camera: 'back',
						success: (res) => {
							// console.log(res)
							const {
								tempFiles
							} = res
							this.type = res.type,
							this.length = res.tempFiles.length
							if (res.type === 'image') {
								tempFiles.map(item => this.updateList.unshift(item.tempFilePath))
								
								// console.log(this.updateList)
							} else if (res.type === 'video') {
								tempFiles.map(item => this.updateVideo.push(item.tempFilePath))
								// console.log(this.updateVideo)
							}
						}
					})
					this.isType = true
				} else if(this.type === 'image') {
					uni.chooseImage({
						count: 9 - this.length,
						success: (res) => {
							// console.log(res.tempFilePaths)
							this.updateList = [...this.updateList,...res.tempFilePaths]
							let compressList = []
							this.updateList.map(item =>{
								uni.compressImage({
									src: item,
									quality:70,
									success: (res) => {
										// console.log(res.tempFilePath)
										
										compressList.push(res.tempFilePath)
									}
								})
							})
							this.updateList = compressList
							console.log(this.updateList)
						}
					})
				}
			},
			submit() {
				if(this.text.length === 0) {
					uni.showToast({
						title:'请输入内容',
						icon:'none'
					})
				}else if(this.text.length <5) {
					uni.showToast({
						title:'文字少于5个字',
						icon:'none'
					})
				} else {
					let uList = null
					let b = ''
					if(this.type === 'image') {
						uList = this.updateList
						b = '.jpg'
					} else {
						uList = this.updateVideo
						b = '.mp4'
					}
					uList.map(item => {
						let a = Math.random().toString().substr(3,6)
						uniCloud.uploadFile({
							filePath:item,
							cloudPath: a + b,
							success: (res) => {
								// console.log(res)
								uniCloud.getTempFileURL({
									fileList:[res.fileID]
								}).then(res=>{
									// console.log(res.fileList)
									res.fileList.map(item=>this.list.push(item.tempFileURL))
									console.log(this.list)
								})
							}
						})
					})
					setTimeout(()=>{
						this.update_add()
						uni.switchTab({
							url:'/pages/index/index',
						})
						uni.showToast({
							title:'上传成功'
						})
						
					},3000)
				}
			},
			update_add() {
				let list
				this.$api.update_add({
					classify:this.name,
					text:this.text,
					cover: this.list,
					mode:this.type
				}).then(res=>{
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.Privacy {
		display: flex;
		justify-content: center;
		.clone {
			padding-top: 3px;
			padding-left: 5px;
		}
	}
	.text-content{
		padding: 10px;
		padding-top: 20px;
		.TextSub{
			width: 100%;
		}
	}
</style>
