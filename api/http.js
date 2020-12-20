import store from '../store/index.js';
export default function $http(option) {
	const {
		url,
		data
	} = option
	// store.state.userInfo._id
	// "38597c165f9fd1fc002c5f317437d885"
	const dataObj = {
		user_id: "38597c165f9fd1fc002c5f317437d885",
		...data
	}
	return new Promise((reslove,reject)=>{
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then(res=>{
			if(res.result.code === 200) {
				reslove(res.result)
			} else{
				reject(res.result)
			}
		}).catch(err=>{
			console.log(err)
		})
	})
}