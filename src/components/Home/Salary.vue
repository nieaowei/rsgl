<template>
    <div>
        <div style="z-index:3;float: right;position: relative">
            <el-button style="margin-left: 5px" @click="addNewTab">薪资分配</el-button>
            <el-input style="margin-left:5px;margin-bottom: 1px;width: 300px" placeholder="请输入内容"
                      v-model="searchContext" suffix-icon="el-icon-search" class="input-with-select">
            </el-input>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" @tab-remove="removeTab" @tab-click="clickTab">
            <el-tab-pane label="薪资变动历史">
                <el-table stripe
                          :data="tableData"
                          height="520px"
                          style="width: 100%">
                    <el-table-column
                            fixed
                            prop="id"
                            label="编号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="eno"
                            label="员工编号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="员工姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="newSalary"
                            label="新的薪资"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="oldSalary"
                            label="旧的薪资"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="变动时间"
                    >
                    </el-table-column>

                </el-table>
            </el-tab-pane>
            <el-tab-pane
                    :key="item.name"
                    v-for="(item) in editableTabs"
                    :label="item.title"
                    :name="item.name"
                    closable

            >
                <div v-if="item.type==='newDoc'" style="margin-left: 30%;width: 400px;text-align: center">
                    <el-form label-position="left" label-width="100px" v-model="item.form">
                        <el-form-item label="员工编号：">
                            <el-input v-model="item.form.eno"></el-input>
                        </el-form-item>
                        <el-form-item label="薪资：">
                            <el-input v-model="item.form.salary"></el-input>
                        </el-form-item>
                        <el-button v-if="item.action==='new'" v-on:click="commit(item)">提交</el-button>
                        <el-button v-if="item.action==='edit'" v-on:click="updateDoc(item)">提交</el-button>
                    </el-form>
                </div>

            </el-tab-pane>
        </el-tabs>
        <div style="margin-top: 100px;">
                    <span style="color: black;">
                        By 124黄树杰
                    </span>
        </div>
    </div>

</template>

<script>
import constant from "../../constant";

export default {
    name: "Salary",
    data() {
        return {
            departList:[],
            dataList:  [],
            searchContext: '',
            editableTabsValue: '0',
            editableTabs: [],
            tabIndex: 0,
            curTab: 0,
            imageUrl: ''
        }
    },
    computed: {
        tableData() {
            if (this.searchContext) {
                return this.dataList.filter(
                        value => {
                            return Object.keys(value).some(key => {
                                        // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置，如果没有找到就返回-1；
                                        // 该方法对大小写敏感！所以之前需要toLowerCase()方法将所有查询到内容变为小写。
                                        return String(value[key]).toLowerCase().indexOf(this.searchContext) > -1
                                    }
                            )
                        }
                )
            }
            console.log(this.dataList)
            return this.dataList;
        }
    },
    methods: {

        clickTab(tab) {
            console.log('click')
            console.log(tab.index)
            console.log(this.editableTabsValue)
            this.curTab = tab.index
        },
        // eslint-disable-next-line no-unused-vars
        commit(item) {
            this.$axios.post(
                    "api/employeeSalary/update",
                    {
                        eno: item.form.eno,
                        salary: item.form.salary,
                    },
                    {
                        timeout: 10000
                    }
            ).then(
                    value => {
                        if (value.data.status === 0) {
                            // var index = this.dataList.indexOf(data.row)
                            // this.dataList.splice(index, 1)
                            this.removeTab(item.name)
                            this.$notify({
                                type: "success",
                                message: value.data.msg,
                                position: constant.NOTIFY_POS,
                            })

                        }
                        if (value.data.status === 3) {
                            this.$router.push("/login")
                            this.$notify({
                                type: "success",
                                message: value.data.msg,
                                position: constant.NOTIFY_POS,
                            })
                        }
                    }
            ).catch(
                    reason => {
                        this.$notify({
                            type: "success",
                            message: reason,
                            position: constant.NOTIFY_POS,
                        })
                    }
            )
        },
        removeTab(name) {
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            console.log('remove qian :', this.curTab)

            tabs.forEach((tab, index) => {
                if (tab.name === name) {
                    if (activeName === name) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        if (nextTab) {
                            activeName = nextTab.name;
                            if (nextTab === tabs[index + 1]) {
                                this.curTab = index + 1;
                            } else {
                                this.curTab = index;
                            }
                        }
                    } else {
                        if (this.curTab > index + 1) {
                            this.curTab--
                        }
                    }
                }

            });

            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== name);
            if (this.editableTabs.length === 0) {
                this.editableTabsValue = '0'
                this.curTab = 0;
            }
            console.log('remove hou :', this.curTab)
        },
        addNewTab() {
            let newTabName = ++this.tabIndex + '';
            this.editableTabs.push({
                title: '人员调动',
                name: newTabName,
                type: 'newDoc',
                action: 'new',
                form: {
                    eno: '',
                    salary: ''
                }
            });
            // this.curTab++;
            this.curTab = this.editableTabs.length;
            this.editableTabsValue = newTabName;
            console.log("new tab :", this.curTab)
            console.log(this.tabIndex)
            console.log(this.editableTabsValue)
            console.log(this.editableTabs)
        },
    },
    async created() {
        this.$axios.get(
                "api/employeeSalary/selectAll",
                {
                    timeout: 10000
                }
        ).then(
                value => {
                    if (value.data.status === 0) {
                        this.dataList = value.data.data.map((value) => {
                            return {
                                id: value.id,
                                eno: value.eno,
                                oldSalary: value.oldSalary,
                                newSalary: value.newSalary,
                                name: value.name,
                                createTime: value.createTime.split('T')[0]
                            }
                        })
                    }

                }
        ).catch(
                reason => {
                    alert(reason)
                    this.$router.push("/login")
                }
        )

        // this.dataList = this.dataList

    }
}
</script>

<style scoped>
.el-tabs {
    background: transparent;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.el-tabs {
    background: transparent;
}

</style>
