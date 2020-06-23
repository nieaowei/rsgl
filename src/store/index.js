import Vue from 'vue'
import Vuex from 'vuex'
import module_Login from "@/store/modules/Login";
import module_Index from "@/store/modules/Index";


Vue.use(Vuex);

const store = new Vuex.Store(
    {
        modules: {
            Login: module_Login,
            Index: module_Index
        },
        state: {},
        mutations: {},
        actions: {
            // eslint-disable-next-line no-unused-vars
            successNotify({commit}, vue, msg) {
                vue.$notify({
                    type: "success",
                    message: msg
                })
            },
            // eslint-disable-next-line no-unused-vars
            failNotify({commit}, vue, msg) {
                vue.$notify({
                    type: "error",
                    message: msg
                })
            }
        }
    },
)

export default store;
