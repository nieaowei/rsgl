import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import Register from "@/components/Register";
import Index from "@/components/Home/Index";
import Pepole from "@/components/Home/Pepole";
Vue.use(Router)
export default new Router(
    {
        mode:'history',
        routes:[
            {
                name:"login",
                path:'/',
                component:Login
            },
            {
                name:"login",
                path:'/login',
                component:Login
            },
            {
                name:"register",
                path: '/register',
                component: Register
            },
            {
                name:"index",
                path: '/index',
                component: Index
            },
            {
                name:'test',
                path: '/test',
                component: Pepole
            }
        ]
    }
)
