'use strict';
const db = uniCloud.database()
const $= db.command.aggregate
exports.main = async (event, context) => {
	const {
		nickName
	} = event
	const user =  await db.collection('user')
	 .aggregate()
	 .match({
		 author_name: nickName
	 })
	 .end()
	//返回数据给客户端
	return {
		code: 200,
		msg:'数据获取成功',
		data: user.data
	}
};
