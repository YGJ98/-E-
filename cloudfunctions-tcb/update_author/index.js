'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		author_id
	}  = event
	const user = await db.collection('user').doc(user_id).get()
	const Followers_ids = user.data[0].Followers_ids
	let likeObj = {}
	let label ={}
	if(Followers_ids.includes(author_id)) {
		likeObj = dbCmd.pull(author_id)
		label = dbCmd.pop()
	} else {
		likeObj = dbCmd.addToSet(author_id)
		label = dbCmd.push('关注')
	}
	await db.collection('user').doc(user_id).update({
		Followers_ids: likeObj
	})
	await db.collection('article').doc(article_id).update({
		classify:label
	})
	//返回数据给客户端
	return {
		code:200,
		msg:'数据请求成功',
		data:user.data
	}
};
