<template>
    <el-button type="primary" @click="insert">新增</el-button>
    <!--  显示用户信息-->
    <el-table :data="filterTableData" style="width: 100%" height=80vh>
        <el-table-column fixed label="title" prop="title" />
        <el-table-column label="content" prop="content" />

        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <div>
                    <el-button size="small" @click="handleEdit(scope.row)">
                        <!-- 编辑 -->
                        Edit
                    </el-button>
                    <el-button size="small" type="danger">
                        <!--  弹出是否删除-->
                        <el-popconfirm confirm-button-text="Yes" cancel-button-text="No" :icon="InfoFilled"
                            icon-color="#626AEF" title="Are you sure to delete this?" @confirm="confirmEvent(scope.row)"
                            @cancel="cancelEvent">
                            <template #reference>
                                <el-button>Delete</el-button>
                            </template>
                        </el-popconfirm>
                    </el-button>
                </div>



            </template>
        </el-table-column>
    </el-table>
    <FormModals :dialogTableVisible="dialogTableVisible" :rowData="rowData" v-if="dialogTableVisible" :judge="judge" />
</template>
  
<script lang="ts" setup>
import FormModals from "../../components/JokeModal.vue";
// 显示用户信息
import { geJokeAll, DeleteJoke } from '@/axios/api';
import { computed, onBeforeMount, ref } from 'vue'
const judge = ref(false)
const search = ref('11')
interface User {
    title: string
    content: string,

}
const userD = async () => {
    tableData = (await geJokeAll()).data.data
    search.value = ''
}
onBeforeMount(() => {
    userD()
});
// 过滤
let filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value || data.title.toLowerCase().includes(search.value.toLowerCase())
    )

)
// 用户信息，默认
let tableData: User[] = [
    {
        title: '广东',
        content: '20',

    }
]
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
//user删用户信息
const confirmEvent = (row: User) => {
    // console.log('confirm!', row)
    DeleteJoke(row.title)
    userD()
    setTimeout(() => {
        location.reload();
    }, 1500);
    ElMessage({
        message: 'Congrats, this is a success message.',
        type: 'success',
    })
}
//取消删除
const cancelEvent = () => {
    console.log('cancel!')
    ElMessage.error('取消删除   ')
}
//dialogTableVisible,row
const dialogTableVisible = ref(false)
const rowData = ref('')
const handleEdit = (rows: User) => {
    dialogTableVisible.value = true
    rowData.value = rows
    // console.log(row)
}

const insert = () => {
    dialogTableVisible.value = true;
    judge.value = true
}
</script>
<style scoped></style>

  