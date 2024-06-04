<template>
  <div class="login">
    <div class="container">
      <h1>登录</h1>
      <div class="dl">
        <div><input type="text" v-model="name" placeholder="请输入用户名" /></div>
        <div>
          <input type="password" v-model="pawd" placeholder="请输入密码" />
        </div>
      </div>
      <input class="button" type="button" @click="dl(name, pawd)" value="登录" />
    </div>
  </div>
</template>

<script setup>
import { computed } from '@vue/reactivity';
import { ref, reactive } from 'vue'
import { getLogin } from "@/axios/api.ts"
import { useRouter, useRoute, onBeforeRouteUpdate } from "vue-router";


const router = useRouter();
const name = ref('');
const pawd = ref('');
const dl = (name, pawd) => {
  if (name && pawd) {
    getLogin(name, pawd).then((res) => {
      // console.log(res.data)
      if (res.data.code == 200) {
        // router.replace({ path: '/home' });
        sessionStorage.setItem("loginPlag", true)
        // console.log("login", router.currentRoute.value.query.redirect)
        router.push(router.currentRoute.value.query.redirect)


      } else {
        alert('账号或密码错误，请重新输入')
      }
    });
  } else {
    alert('账号或密码不能为空');
  }
}
</script>



<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

}

.container {
  width: 400px;
  margin: auto;
  background: whitesmoke;
  border-radius: 10px;
  padding: 10px;

  h1 {
    text-align: center;
    margin-bottom: 0;
  }

  input {
    border: 0;
    -moz-outline-radius: 50px;
  }

  .dl {
    input {
      box-sizing: border-box;
      padding: 18px;
      margin: 18px 0;
      border-radius: 50px;
      width: 100%;

      /*   &::-webkit-input-placeholder {
        // font-size: 4px;
      } */
    }

    position:relative;

    .yz {
      position: absolute;
      right: 16px;
      bottom: 36px;
      color: #7575A1;
      // font-size: 4px;
    }
  }

  .button {
    box-sizing: border-box;
    padding: 18px;
    margin: 18px 0;
    border-radius: 50px;
    width: 100%;
    background-color: #1B6EF366;
  }

  .fs {
    text-align: center;

    .type {
      margin-bottom: 22px;
    }
  }
}
</style>
