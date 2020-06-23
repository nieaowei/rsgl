<template>
    <el-container>
        <el-header>
            <el-menu
                    :default-active="activeIndex"
                    @select="handleSelect"
                    mode="horizontal"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                <el-menu-item index="1">人员信息管理</el-menu-item>
                <el-menu-item index="2">部门管理</el-menu-item>
                <el-menu-item index="3">人员调动管理</el-menu-item>
                <el-menu-item index="4">劳资管理</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <component v-bind:is="currentView"></component>
        </el-main>
    </el-container>
</template>

<script>
import Salary from "@/components/Home/Salary";
import Pepole from "@/components/Home/Pepole";
import Department from "@/components/Home/Department";
import Mobilize from "@/components/Home/Mobilize";

export default {
    name: "Index",
    data() {
        return {
            ccc:[null,Pepole,Department,Mobilize,Salary],
            activeIndex:'1',
            currentView: Pepole
        }
    },
    methods:{
        handleSelect(key, keyPath){
            console.log(key,keyPath)
            this.currentView = this.ccc[key]
        }
    }
}
</script>

<style scoped>
.el-menu {

}
</style>
