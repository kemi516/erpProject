<template>
    <el-button type="primary" @click="insert">新增</el-button>
    <!--  显示用户信息-->
    <el-table :data="filterTableData" style="width: 100%" height=80vh>
        <el-table-column fixed label="id" prop="id" />
        <el-table-column label="username" prop="username" />
        <el-table-column label="password" prop="password" />
        <el-table-column label="age" prop="age" />
        <el-table-column label="address" prop="address" />
        <el-table-column label="pawdCode" prop="pawdCode" />
        <el-table-column label="email" prop="email" />
        <el-table-column label="role" prop="role" />
        <el-table-column align="right">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
            <template #default="scope">
                <div v-if="scope.row.username != 'admin'">
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
import FormModals from "../../components/FormModal.vue";
// 显示用户信息
import { getUserAll, DeleteUser, alls } from '@/axios/api';
import { computed, onBeforeMount, ref } from 'vue'
let judge = ref(false)
const search = ref('11')
interface User {
    address: string
    age: number,
    email: string,
    id: number,
    password: string
    pawdCode: string
    role: string
    username: string
}
const insert = () => {
    dialogTableVisible.value = true;
    judge.value = true
}

const userD = async () => {
    tableData = (await getUserAll()).data.data
    search.value = ''
}
onBeforeMount(() => {
    userD()
});
// 过滤
let filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value || data.username.toLowerCase().includes(search.value.toLowerCase())
    )

)
// 用户信息，默认
let tableData: User[] = [
    {
        address: '广东',
        age: 20,
        email: "000",
        id: 6,
        password: "admin",
        pawdCode: "000000",
        role: "管理员",
        username: "admin"
    }
]
import { ElMessage } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'
import FormModal from '@/components/FormModal.vue';
//user删用户信息
const confirmEvent = (row: User) => {
    // console.log('confirm!', row)
    DeleteUser(row.username)
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
let dialogTableVisible = ref(false)
const rowData = ref('')
const handleEdit = (rows: User) => {
    dialogTableVisible.value = true
    rowData.value = rows
    // console.log(row)
}


</script>
<style scoped></style>

  