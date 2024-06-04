<template>
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
                    <el-form-item label="title" prop="title" v-if="judge">
                        <el-input v-model="ruleForm.title" />
                    </el-form-item>
                    <el-form-item label="title" prop="title" v-else>
                        <el-input v-model="ruleForm.title" disabled />
                    </el-form-item>
                    <el-form-item label="content" prop="content">

                        <el-input v-model="ruleForm.content" />
                    </el-form-item>
                    <el-form-item label="price" prop="price">

                        <el-input v-model="ruleForm.price" />
                    </el-form-item>
                    <el-form-item label="image" prop="image">

                        <!-- <el-input v-model="ruleForm.image" /> -->
                        <!-- 上传图片 -->
                        <el-upload :action="`${baseUrl}/shopList`" class="avatar-uploader" :show-file-list="false"
                            name="image" :auto-upload="false" ref="uploadRef" :on-exceed="handleExceed" :limit="1"
                            :before-upload="beforeAvatarUpload" :data="uploadSub" method="post" v-if="judge"
                            :on-change="handleChange">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                        <el-upload :action="`${baseUrl}/shopList`" class="avatar-uploader" :show-file-list="false"
                            name="image" :auto-upload="false" ref="uploadRef" :on-exceed="handleExceed" :limit="1"
                            :before-upload="beforeAvatarUpload" :data="uploadSub" method="put" :on-change="handleChange"
                            v-else>
                            <img v-if="imageUrl" :src="imageUrl" class="avatar" />

                            <img v-else :src="` ${baseUrl + ruleForm.image}`" class="avatar" />

                        </el-upload>

                    </el-form-item>

                    <!-- 提交 -->
                    <el-form-item>
                        <el-button type="primary" @click="submitUpload()">
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
const baseUrl = "https://kemi.loca.lt";

//更新用户信息
import { reactive, ref, defineProps, computed, } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

// 接收父组件传递过来的值
const props = defineProps(['dialogTableVisible', 'rowData', 'judge'])
interface RuleForm {
    id: string
    title: string,
    content: string
    price: string,
    image: string

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



//form验证
const rules = reactive<FormRules<RuleForm>>({
    id: [
        { required: false, message: 'id', trigger: 'blur' },
    ],
    title: [
        {
            required: true,
            message: '请输入标题',
            trigger: 'change',
        },
    ],
    content: [
        { required: true, message: '请输入内容', trigger: 'blur' },
    ],
    price: [
        {
            required: true,
            message: '请输入价格',
            trigger: 'change',
        },
    ],
    image: [
        { required: true, message: '请输入图片路径', trigger: 'blur' },
    ],



})


import { inserShop, updatetShop } from "@/axios/api";
////////////////



// 上传图片
import { Plus } from '@element-plus/icons-vue'


import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import { fileURLToPath } from 'url';

const uploadRef = ref<UploadInstance>()

//覆盖文件
const handleExceed: UploadProps['onExceed'] = (files) => {
    uploadRef.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRef.value!.handleStart(file)


}
let ruleForm = reactive<RuleForm>({
    id: '',
    title: 'kemi',
    content: '20',
    price: '250',
    image: uploadRef.value

})

if (props.judge) {
    console.log("judge")
} else {
    ruleForm = props.rowData


}
let uploadSub = computed(() => {
    return { id: ruleForm.id, title: ruleForm.title, content: ruleForm.content, price: ruleForm.price }
})


const imageUrl = ref('')

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    //   fileList.value = fileList.value.slice(-3)
    // console.log("uploadFile.url", uploadFile);
    ruleForm.image = ''
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)

    // ruleForm.image = uploadFile.url

}


//图片上传时
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    imageUrl.value = rawFile.name
    console.log("rawFile XXXXX", rawFile.name);

    if (rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}


// form提交、取消
//提交
/*
const submitForm = async (formEl: FormInstance | undefined) => {
   if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
 
            if (props.judge) {
                // console.log(ruleForm);
 
                inserShop(ruleForm)
 
            } else {
                updatetShop(props.rowData)
            }
 
            console.log(valid, 'submit!xxx', props.rowData)
 
            ElMessage({
                message: 'Congrats, this is a success message.',
                type: 'success',
            })
            setTimeout(() => {
                location.reload();//////////
            }, 1000);
        } else {
            console.log('数据没填', fields)
        }
    }) 
  console.log("uploadRef", uploadRef.value);
}
*/
const submitUpload = () => {
    uploadRef.value!.submit()
    setTimeout(() => {
        location.reload();
    }, 1500);//////////

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
<!-- // 上传图片 -->

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>