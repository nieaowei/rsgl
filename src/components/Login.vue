<template>
    <div class="main">
        <el-row :gutter="10" class="top">
            <el-col :sm="5">
                <div class="grid-content side"></div>
            </el-col>
            <el-col :sm="14">
                <el-card :body-style="{ padding: '0px' }">
                    <el-row>
                        <el-col :sm="12">
                            <el-image
                                    style="width: 100%; height: 100%;"
                                    src="/login-side.jpeg"
                                    fit="fill"></el-image>
                        </el-col>
                        <el-col :sm="12">
                            <h2>管理员登录</h2>
                            <el-form label-width="100px" :model="loginForm" style="margin-right: 10px">
                                <el-form-item label="账号：">
                                    <el-input type="text" autofocus v-model="loginForm.username"></el-input>
                                </el-form-item>
                                <el-form-item label="密码：">
                                    <el-input type="password" v-model="loginForm.password"></el-input>
                                </el-form-item>
                            </el-form>
                            <el-button type="success" v-on:click="login">登录</el-button>
                            <br/>

                            <el-link style="margin-right:10px;margin-top: 20px;float: right" type="success"
                                     href="/register">账号注册
                            </el-link>
                        </el-col>
                    </el-row>
                </el-card>
                <div style="margin-top: 100px;">
                    <span style="color: aliceblue;">
                        By 102江鹏
                    </span>
                </div>

            </el-col>
            <el-col :sm="5">
                <div class="grid-content side"></div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            loginForm: {
                username: '',
                password: ''
            },
        }
    },
    methods: {
        login() {
            this.$axios.post(
                    "api/user/login",
                    {
                        username: this.loginForm.username,
                        password: this.loginForm.password,
                    },
                    {
                        timeout: 10000
                    }
            ).then(
                    suc => {
                        if (suc.data.status === 0) {
                            //todo
                            alert("登录成功")
                            this.$router.push("/index")
                        } else {
                            alert(suc.data.msg)
                        }
                    }
            ).catch(
                    reason => {
                        //todo
                        alert(reason)
                    }
            )
        }
    }
}
</script>

<style scoped>
.main {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right, #13d73d, #126728);
}

.top {
    margin-top: 8%;
}

.el-col {
    border-radius: 4px;
}

.side {
    position: relative;
    /*background: #e5e9f2;*/
    height: 100px;
}

.el-form {
    margin-top: 20%;
}


</style>
