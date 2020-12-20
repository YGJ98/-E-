'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		avatarUrl,
		nickName,
		sex,
		signature
	} = event
	let userId = Math.random().toString(12).substr(5,12)
	let user = {
		Followers_ids: [],
		POMS: '未婚',
		article_ids: [],
		author_name: nickName,
		avatar: avatarUrl,
		signature: signature,
		constellation:'',
		explain:'',
		fans_count: 0,
		gender: sex,
		id: userId,
		professional:'',
		refs_count: 0,
		status: "normal",
		thumbs_down_article_ids:[],
		thumbs_up_article_ids: []


	}
	await db.collection('user').add(user)
	
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功'
	}
};
