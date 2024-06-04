<template>
    <!-- <div @click="dialogTableVisible = true">ddd</div> -->
    <div>
        <!-- 改用户信息 -->
        <div>
            <el-dialog v-model="dialogTableVisible" title="user info" :close-on-click-modal=false>
                <!-- form -->
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                    :size="formSize" status-icon>
                    <el-form-item label="username" prop="username">
                        <el-input v-model="ruleForm.username" disabled />
                    </el-form-item>
                    <el-form-item label="password" prop="password">
                        <el-input v-model="ruleForm.password" />
                    </el-form-item>
                    <el-form-item label="age" prop="age">
                        <el-input v-model="ruleForm.age" />
                    </el-form-item>
                    <el-form-item label="pawdCode" prop="pawdCode">
                        <el-input v-model="ruleForm.pawdCode" />
                    </el-form-item>
                    <el-form-item label="address" prop="address">
                        <el-input v-model="ruleForm.address" />
                    </el-form-item>
                    <el-form-item label="email" prop="email">
                        <el-input v-model="ruleForm.email" />
                    </el-form-item>
                    <el-form-item label="role" prop="role">
                        <el-select v-model="ruleForm.role" placeholder="role">
                            <el-option label="超级会员" value="超级会员" />
                            <el-option label="普通用户" value="普通用户" />
                        </el-select>
                    </el-form-item>
                    <el-form-item label="Activity time" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker v-model="ruleForm.date1" type="date" label="Pick a date"
                                    placeholder="Pick a date" style="width: 100%" />
                            </el-form-item>
                        </el-col>
                        <el-col class="text-center" :span="2">
                            <span class="text-gray-500">-</span>
                        </el-col>
                        <el-col :span="11">
                            <el-form-item prop="date2">
                                <el-time-picker v-model="ruleForm.date2" label="Pick a time" placeholder="Pick a time"
                                    style="width: 100%" />
                            </el-form-item>
                        </el-col>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            Create
                        </el-button>
                        <el-button @click="quxiao">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">

//更新用户信息
import { reactive, ref, defineProps, } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

// 接收父组件传递过来的值
const props = defineProps(['dialogTableVisible', 'rowData', 'judge'])
interface RuleForm {
    username: string
    password: string
    age: number
    pawdCode: string
    address: string
    email: string
    role: string,
    date1: string,
    date2: string
}
const dialogTableVisible = ref(false)
const quxiao = () => {
    dialogTableVisible.value = false;
    setTimeout(() => {
        location.reload();
    }, 1500);
}
dialogTableVisible.value = props.dialogTableVisible
const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive<RuleForm>({
    username: '',
    password: '',
    email: '',
    age: 18,
    pawdCode: '000000',
    address: '广东',
    role: '普通用户',
    date1: '',
    date2: ''
})

/* // form重置
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
} */
//form验证
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
    ],
    password: [
        {
            required: true,
            message: '请输入密码',
            trigger: 'change',
        },
        { min: 3, max: 20, message: 'Length should be 3 to 20', trigger: 'blur' },
    ],
    age: [
        {
            required: true,
            message: '请输入年龄',
            trigger: 'change',
        },
        // { min: 1, max: 2, message: 'Length should be 1 to 2', trigger: 'blur' },

    ],
    date1: [
        {
            type: 'date',
            required: false,
            message: 'Please pick a date',
            trigger: 'change',
        },
    ],
    date2: [
        {
            type: 'date',
            required: false,
            message: 'Please pick a time',
            trigger: 'change',
        },
    ],

    pawdCode: [
        {
            required: false,
            message: 'Please select activity pawdCode',
            trigger: 'change',
        },
    ],
    address: [
        {
            required: false,
            message: 'Please select activity address',
            trigger: 'change',
        },
    ],
    email: [
        {
            required: true,
            message: 'Please select activity email',
            trigger: 'change',
        },
    ],
    role: [
        {
            required: true,
            message: 'Please pick a role',
            trigger: 'change',
        },
    ],

})


import { insertUser, updatetUser } from "@/axios/api";
////////////////
// form提交、取消
//提交

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {

            if (props.judge) {
                // console.log(ruleForm);

                insertUser(ruleForm)

            } else {
                updatetUser(props.rowData)
            }

            console.log(valid, 'submit!xxx', props.rowData)

            ElMessage({
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
            setTimeout(() => {
                location.reload();//////////
            }, 1500);
        } else {
            console.log('数据没填', fields)
        }
    })
}

if (props.judge) {
    console.log("judge")
} else {
    ruleForm = props.rowData

}
</script>

<style scoped>
.el-button--text {
    margin-right: 15px;
}

.el-select {
    width: 300px;
}

.el-input {
    width: 300px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>