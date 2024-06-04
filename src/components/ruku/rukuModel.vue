<template>
  <el-button type="primary" @click="dialogVisible = true">
    新增行
  </el-button>
  <el-dialog v-model="dialogVisible" title="出库单" width="70%" align-center :before-close="handleClose" :show-close="false">
    <template #footer>
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item label="客户" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="序号" prop="xuhao">
          <el-input v-model="ruleForm.xuhao" />
        </el-form-item>
        <el-form-item label="品名" prop="pinming">
          <el-input v-model="ruleForm.pinming" />
        </el-form-item>
        <el-form-item label="成色" prop="chengse">
          <el-input v-model="ruleForm.chengse" />
        </el-form-item>
        <el-form-item label="克重" prop="kezhong">
          <el-input v-model="ruleForm.kezhong" />
        </el-form-item>
        <el-form-item label="单价" prop="danjia">
          <el-input v-model="ruleForm.danjia" />
        </el-form-item>
        <el-form-item label="附加" prop="fujia">
          <el-input v-model="ruleForm.fujia" />
        </el-form-item>
        <el-form-item label="金额" prop="jine">
          <el-input v-model="ruleForm.jine" />
        </el-form-item>
        <el-form-item label="件数" prop="jianshu">
          <el-input v-model="ruleForm.jianshu" />
        </el-form-item>
        <el-form-item label="件数附加" prop="jianshuadd">
          <el-input v-model="ruleForm.jianshuadd" />
        </el-form-item>
        <el-form-item label="备注/毛重" prop="beizhu">
          <el-input v-model="ruleForm.beizhu" />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
        <span class="dialog-footer">
          <el-popconfirm confirm-button-text="确定" cancel-button-text="返回" :icon="InfoFilled" icon-color="#626AEF"
            title="你确定不保存吗" @confirm="confirmEvent" @cancel="cancelEvent">
            <template #reference>
              <el-button>取消</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            保存
            <!-- <el-button type="primary" @click="dialogVisible = false"> -->
          </el-button>
        </span>
      </el-form>
    </template>
  </el-dialog>
</template>
  
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { InfoFilled } from '@element-plus/icons-vue'


const dialogVisible = ref(false)
const confirmEvent = () => {
  dialogVisible.value = false

}
const cancelEvent = () => {
  console.log('cancel!')
}
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
interface RuleForm {
  name: string
  xuhao: any
  pinming: any
  chengse: any
  kezhong: any
  danjia: any
  fujia: any
  jine: any
  jianshu: any
  jianshuadd: any
  beizhu: any
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  name: '',
  xuhao: '',
  pinming: '',
  chengse: '',
  kezhong: '',
  danjia: '',
  fujia: '',
  jine: '',
  jianshu: '',
  jianshuadd: '',
  beizhu: '',

})

const rules = reactive<FormRules<RuleForm>>({

  name: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  xuhao: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  pinming: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  chengse: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  kezhong: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  danjia: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  fujia: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  jine: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  jianshu: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  jianshuadd: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],
  beizhu: [
    {
      required: true,
      message: '这是必填的',
      trigger: 'change',
    },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      dialogVisible.value = false

    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}))
</script>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
  