import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		historyList: uni.getStorageSync('__history') || [],
		userinfo:uni.getStorageSync('userinfo') || {}
	},
	mutations:{
		// 搜索页
		SET_HISTORY_LIST(state,history) {
			state.historyList = history
		},
		CLEAR_HISTORY_LIST(state) {
			state.historyList = []
		},
		// 用户
		SET_USER_INFO(state,user){
			state.userinfo = user
		},
		CLEAR_USER_INFO(state) {
			state.userinfo = {}
		}
	},
	actions:{
		// 搜索页
		set_history({commit,state},history) {
			let list = state.historyList
			list.unshift(history)
			uni.setStorageSync("__history",list)
			commit('SET_HISTORY_LIST',list)
		},
		clear_history({commit}) {
			uni.removeStorageSync("__history")
			commit('CLEAR_HISTORY_LIST')
		},
		// 用户
		set_userinfo({commit},user){
			uni.setStorageSync("userinfo",user)
			commit('SET_USER_INFO',user)
		},
		clear_userinfo({commit}) {
			uni.removeStorageSync("userinfo")
			commit('CLEAR_USER_INFO')
		}
	}
})
export default store