'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id
	} = event
	let user = await  db.collection('user').doc(user_id).get()
	user = user.data[0]
	const list = await db.collection('article')
	.aggregate()
	.match({
		id: dbCmd.in(user.article_ids)
	})
	.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
