'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id,
		content,
	    comment_id = '',
		reply_id = "",
		is_reply = false
	} = event
	let user = await db.collection('user').doc(user_id).get()
	user = user.data[0]
	const article = await db.collection('article').doc(article_id).get()
	const comments = article.data[0].comments
	// console.log(JSON.stringify(comments))
	let commentObj = {
		comment_id: genID(5),
		comment_content: content,
		create_time: new Date().getTime(),
		is_reply:is_reply,
		author: {
			author_id: user._id,
			author_name: user.author_name,
			avatar: user.avatar,
		},
		replys: []
	}
	if (comment_id === '') {
		commentObj.replys = []
		commentObj = dbCmd.unshift(commentObj)
	} else {
		let commentIndex = comments.findIndex(item => item.comment_id === comment_id)	
		let commentAuthor = ''
		if(is_reply){
			commentAuthor = comments[commentIndex].replys.find(item=>item.comment_id === reply_id)
		}else{
			commentAuthor = comments.find(item => item.comment_id === comment_id)
		}
		commentAuthor = commentAuthor.author.author_name
		commentObj.to = commentAuthor

		commentObj = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}
	}
	await db.collection('article').doc(article_id).update({
		comments: commentObj
	})
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
	}
};

function genID(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
