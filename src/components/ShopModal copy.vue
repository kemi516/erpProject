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
                        <!-- <el-upload :action="`${baseUrl}/shopList`" class="avatar-uploader" :show-file-list="true"
                            name="image" :auto-upload="false" ref="uploadRef" :on-exceed="handleExceed" :limit="1"
                            :before-upload="beforeAvatarUpload" :data="uploadSub" method="post" v-if="judge">
                            <img v-if="imageUrl" :src="file.url" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                        <el-upload :action="`${baseUrl}/shopList`" class="avatar-uploader" :show-file-list="true"
                            name="image" :auto-upload="false" ref="uploadRef" :on-exceed="handleExceed" :limit="1"
                            :before-upload="beforeAvatarUpload" :data="uploadSub" method="put" v-else>
                            <img v-if="ruleForm.image" :src="` ${baseUrl + ruleForm.image}`" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">

                                <Plus />
                            </el-icon>
                        </el-upload> -->

                        <!-- 自定义缩略图 -->
                        <div>
                            <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1"
                                :on-exceed="handleExceeds" ref="uploadRefs" name="image" v-if="judge"
                                :on-change="handleChange">
                                <template #file="{ file }">
                                    <el-icon>
                                        <Plus />
                                    </el-icon>
                                    <div>
                                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                        <span class="el-upload-list__item-actions">
                                            <span class="el-upload-list__item-preview"
                                                @click="handlePictureCardPreview(file)">
                                                <el-icon><zoom-in /></el-icon>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                @click="handleDownload(file)">
                                                <el-icon>
                                                    <Download />
                                                </el-icon>
                                            </span>
                                            <span v-if="!disabled" class="el-upload-list__item-delete"
                                                @click="handleRemove(file)">
                                                <el-icon>
                                                    <Delete />
                                                </el-icon>
                                            </span>
                                        </span>
                                    </div>
                                </template>
                            </el-upload>
                            <!-- gaai -->
                            <el-upload action="#" class="avatar-uploader" :show-file-list="true" name="image"
                                :auto-upload="false" ref="uploadRefs" :on-exceed="handleExceeds" :limit="1"
                                :data="uploadSub" method="put" v-else>
                                <img v-if="ruleForm.image" :src="` ${baseUrl + ruleForm.image}`" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon">

                                    <Plus />
                                </el-icon>
                            </el-upload>

                            <el-dialog v-model="dialogVisible">
                                <img w-full :src="dialogImageUrl" alt="Preview Image" />
                            </el-dialog>
                        </div>

                        <!--  -->






                    </el-form-item>

                    <!-- 提交 -->
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
const baseUrl = "http://localhost:8081";

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


// 上传图片
import { Plus } from '@element-plus/icons-vue'


import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const uploadRefs = ref<UploadInstance>()

//覆盖文件
const handleExceeds: UploadProps['onExceed'] = (files) => {
    uploadRefs.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    uploadRefs.value!.handleStart(file)
    // console.log("files", files);
}
// form默认值
let ruleForm = reactive<RuleForm>({
    id: '',
    title: 'kemi',
    content: '20',
    price: '250',
    image: uploadRefs.value

})

if (props.judge) {
    console.log("judge")
} else {
    ruleForm = props.rowData


}
let uploadSub = computed(() => {
    return { id: ruleForm.id, title: ruleForm.title, content: ruleForm.content, price: ruleForm.price, image: ruleForm.image }
})


const imageUrl = ref('')

//图片上传时
/* const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
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
} */


// form提交、取消
//提交

const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {

            if (props.judge) {
                console.log("uploadSubuploadSubuploadSubuploadSub");

                inserShop(uploadSub)

            } else {
                updatetShop(props.rowData)
            }

            // console.log(valid, 'submit!xxx', props.rowData)

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
    //   console.log("uploadRef", uploadRef.value);
}

/* const submitUpload = () => {
    uploadRef.value!.submit()
    location.reload();//////////

} */


//自定义缩略图
import { Delete, Download, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile } from 'element-plus'
import { inserShop, updatetShop } from '@/axios/api';

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (file: UploadFile) => {
    // console.log(file.url)

}

const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!
    dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
    console.log(file)

}

const handleChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    //   fileList.value = fileList.value.slice(-3)
    // console.log(uploadFile.url);

    ruleForm.image = uploadFile.url

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