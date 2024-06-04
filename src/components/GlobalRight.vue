<template>
    <div class="globalright" :class="shows">

        <RouterView />

    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// const count = ref(['nc', 'nc', 'nc', 'nc', 'nc'])

//监听窗口变化
const Lshow = ref(true)
const Lhidden = ref(false)
const shows = ref({
    Lshow, Lhidden
})
const { body } = document
window.addEventListener('resize', () => {
    if (body.getBoundingClientRect().width <= 768) { Lshow.value = false; Lhidden.value = true }
    else {
        Lshow.value = true; Lhidden.value = false
    }
})

</script>
<style lang="less">
.globalright {

    margin-top: 60px;
    word-wrap: break-word;
}

.Lshow {
    margin-left: 200px;
}

.Lhidden {
    margin-left: 64px;
}
</style>