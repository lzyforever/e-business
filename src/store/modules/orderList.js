import Vue from 'vue'   //导入vue,使用vue-resource来进行发送http请求

//状态集
const state = {
    orderList : [],
    params : {}
}

const getters = {
    /*orderList : function(state) {
        return state.orderList
    }*/ //简写以下
    getOrderList : state => state.orderList
}

//action是可以进行异步操作的
const actions = {
    //通过api异步来获取orderList
    fetchOrderList ({commit, state}) {  //通过es6的解构赋值
        Vue.http.post('/api/getOrderList', state.params)
        .then((res)=>{
            //state.orderList = res.data.list
            //state.total = res.data.total
            //直接进行赋值，不太规范，一般做法是通过commit调用mutations当中的方法，进行操作
            commit('updateOrderList', res.data.list)
        },(err)=>{

        })
    }
}

//mutations当中是同步操作的
const mutations = {
    updateOrderList (state, payLoad) { //第一个参数是sate,第二个参数是赋值的，传入的
        state.orderList = payLoad
    },
    updateParams (state, {key, val}) {
        state.params[key] = val
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}