<template>
  <div class="global">
    <!-- 抽屉按钮开关 -->
    <el-button type="primary" @click="drawer = true" v-if="false">
      <svg viewBox="64 64 896 896" data-icon="menu-unfold" width="1em" height="1em" fill="currentColor" aria-hidden="true"
        focusable="false" class="">
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z">
        </path>
      </svg>
    </el-button>

    <!-- 抽屉模块 -->
    <el-drawer v-model="drawer" :direction="direction" :show-close="showClose" size="200px">
      <template #default>
        <!-- 内容 -->
        <div>
          <el-radio v-model="radio1" label="Option 1" size="large">Option 1</el-radio>
          <el-radio v-model="radio1" label="Option 2" size="large">Option 2</el-radio>
        </div>
      </template>
    </el-drawer>
    <!-- nav -->
    <div class="nav">
      <el-menu background-color="#1890FF" text-color="white" active-text-color="white" class="el-menu-demo"
        mode="horizontal" :ellipsis="false" @select="handleSelect">
        <el-menu-item index="0" disabled>KEMI-ERP</el-menu-item>
        <div class="flex-grow" />
        <div class="dis">
          <!-- <el-menu-item index="1" disabled>欢迎您 {{ name }}</el-menu-item> -->
        </div>
        <el-sub-menu index="2">
          <template #title>
            <img src="/public/image/yk.png" alt="logo" style="width: 30px;">
            管理员</template>
          <el-menu-item index="2-2" @click="exitLogin">退出登录</el-menu-item>

        </el-sub-menu>
      </el-menu>
    </div>

    <!-- left componetent -->
    <GlobalLeft />

    <!-- Right componetent -->
    <GlobalRight />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

//
const drawer = ref(false)
const direction = ref('ltr')//开启方向
const showClose = ref(false)//关闭按钮
const radio1 = ref('Option 1')
// const name = ref('管理员')
//左边部分
import GlobalLeft from '@/components/GlobalLeft.vue'
import GlobalRight from '@/components/GlobalRight.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

//nav
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const exitLogin = () => {
  ElMessageBox.confirm(
    '是否退出登录?',
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      sessionStorage.removeItem('loginPlag')
      ElMessage({
        type: 'success',
        message: '已退出登录',
      })
      setTimeout(() => {
        location.reload();
      }, 600);
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消退出登录',
      })
    })
}


</script>
<!-- elemente-ui -->
<style>
.flex-grow {
  flex-grow: 1;

}

.dis {
  position: relative;
  z-index: 999;
  left: -20%;
}
</style>

<style lang="less" scoped>
.global {
  width: 100%;
  overflow: auto;
}

.nav {
  height: 60px;
  position: fixed;
  width: 100%;
  z-index: 999;

  :deep(.el-menu-item.is-disabled) {
    opacity: 1.25;

    cursor: default;
    background: 0 0 !important;
  }
}
</style>