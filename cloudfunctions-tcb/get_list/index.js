'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		name,
		page = 1,
		pageSize = 10
	} = event
	let matchObj = {}
	if(name !=='推荐') {
		matchObj = {
			classify:name
		}
	}
	
	let user = await  db.collection('user').doc(user_id).get()
	user = user.data[0]
	
	// const list = await db.collection('article').get()
	const list = await db.collection('article')
	.aggregate()
	.addFields({
		is_author: $.in(['$author.id',user.Followers_ids]),
		is_thumbs_up: $.in(['$_id',user.thumbs_up_article_ids]),
		is_thumbs_down: $.in(['$_id',user.thumbs_down_article_ids])
	})
	.match(matchObj)
	.skip(pageSize * (page - 1))
	.limit(pageSize) 
	.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
