'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		text,
		cover,
		classify,
		mode
	} = event
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	let AId = Math.random().toString().substr(3,6)
	let authorObj = {
		id: AId,
		author_name:user.author_name,
		author:{
			avatar: user.avatar,
			id: user.id,
			status:"normal"
		},
		classify:classify,
		comments_count:0,
		content:{
			text:text,
			cover:cover
		},
		create_time: new Date().getTime(),
		down_count:0,
		up_count:0,
		forward_count:0,
		mode:mode,
		comments:[]
	}
	await db.collection('article').add(authorObj)
	await db.collection('user').doc(user_id).update({
		article_ids: dbCmd.push(AId)
	})
	//返回数据给客户端
	return {
		code:200,
		msg:'数据添加成功'
	}
};

function getId(length) {
	return Math.random().toString(10).substr(3,length)
}