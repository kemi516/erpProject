<template>
    <!-- <div @click="dialogTableVisible = true">ddd</div> -->
    <div>
        <!-- 改用户信息 -->
        <div>
            <el-dialog v-model="dialogTableVisible" title="user info" :close-on-click-modal=false>
                <!-- form -->
                <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
                    :size="formSize" status-icon>
                    <el-form-item label="id" prop="id">

                        <el-input v-model="ruleForm.id" disabled />
                    </el-form-item>
                    <el-form-item label="content" prop="content">
                        <el-input v-model="ruleForm.content" />
                    </el-form-item>
                    <el-form-item label="answer" prop="answer">
                        <el-input v-model="ruleForm.answer" />
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
    answer: string
    content: string
    id: string

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
    id: '',
    content: '我是谁？',
    answer: '我是管理员'

})
//form验证
const rules = reactive<FormRules<RuleForm>>({
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    answer: [
        {
            required: true,
            message: '请输入答案',
            trigger: 'change',
        },
    ],


})


import { inserRiddle, updatetRiddle } from "@/axios/api";
////////////////
// form提交、取消
//提交

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {

            if (props.judge) {
                // console.log(ruleForm);

                inserRiddle(ruleForm)

            } else {
                updatetRiddle(props.rowData)
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