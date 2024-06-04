<template>
    <el-button type="primary" @click="insert">新增</el-button>
    <!--  显示用户信息-->
    <el-table :data="filterTableData" style="width: 100%" height=80vh>
        <el-table-column fixed label="id" prop="id" />
        <el-table-column label="content" prop="content" />
        <el-table-column label="answer" prop="answer" />

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
import FormModals from "../../components/RiddleModal.vue";
// 显示用户信息
import { geRiddleAll, DeleteRiddle } from '@/axios/api';
import { computed, onBeforeMount, ref } from 'vue'
const judge = ref(false)
const search = ref('11')
interface User {
    answer: string
    content: string,
    id: string,

}
//获取所有信息
const userD = async () => {
    tableData = (await geRiddleAll()).data.data
    search.value = ''
}
onBeforeMount(() => {
    userD()
});
// 过滤
let filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value || data.content.toLowerCase().includes(search.value.toLowerCase())
    )

)
// 用户信息，默认
let tableData: User[] = [
    {
        id: '',
        content: '我是谁',
        answer: 'kemi',

    }
]
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
//user删用户信息
const confirmEvent = (row: User) => {
    // console.log('confirm!', row)
    DeleteRiddle(row.id)
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

  