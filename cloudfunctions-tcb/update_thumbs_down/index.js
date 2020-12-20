'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	const user = await db.collection('user').doc(user_id).get()
	const thumbs_down_article_ids = user.data[0].thumbs_down_article_ids
	let thumbs_down = null
	if(thumbs_down_article_ids.includes(article_id)) {
		return{
			code:200,
			msg: '请手下留情'
		}
	} else {
		thumbs_down = dbCmd.addToSet(article_id)
	}
	await db.collection('user').doc(user_id).update({
		thumbs_down_article_ids: thumbs_down
	})
	await db.collection('article_id').doc(article_id).update({
		down_count: dbCmd.inc(1)
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功'
	}
};
