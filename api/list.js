import $http from './http.js';

// 标签
export const get_label = (data) =>{
	return $http({
		url:'get_label',
		data
	})
}

// 获取列表
export const get_list = (data) =>{
	return $http({
		url: 'get_list',
		data
	})
}

// 关注
export const update_author = (data) => {
	return $http({
		url: 'update_author',
		data
	})
}

// 搜索
export const get_search = (data) => {
	return $http({
		url:'get_search',
		data
	})
}

export const update_thumbs = (data) => {
	return $http({
		url: 'update_thumbs',
		data
	})
}
export const update_thumbs_down = (data) => {
	return $http({
		url: 'update_thumbs_down',
		data
	})
}
// 发布动态
export const update_add = (data) => {
	return $http({
		url: 'update_add',
		data
	})
}

export const set_comment = (data) => {
	return $http({
		url: 'set_comment',
		data
	})
}
export const get_comment = (data) =>{
	return $http({
		url: 'get_comment',
		data
	})
}


export const get_follow = (data) => {
	return $http({
		url:'get_follow',
		data
	})
}

export const get_user = (data) => {
	return $http({
		url:'get_user',
		data
	})
}

// 我的文章
export const my_article = (data) => {
	return $http({
		url: 'my-article'
	})
}

// 删除登录
export const clear_login = (data) => {
	return $http({
		url: 'clear_login'
	})
}

// 反馈
export const feedback = (data) => {
	return $http({
		url: 'feedback',
		data
	})
}