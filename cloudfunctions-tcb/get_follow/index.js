'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const list  = await db.collection('article')
	.aggregate()
	.match({
		classify:'关注'
	})
	.end()
	return {
		code:200,
		data: list.data
	}
};
