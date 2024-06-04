<script setup lang="ts">
// router，less ，pinia，axios， element
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  <!--   <KeepAlive>
    <RouterView />
  </KeepAlive> -->
  <router-view v-slot="{ Component }">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style scoped></style>