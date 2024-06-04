<template>
    <div class="purchaseStorage">

        <el-button type="primary" :icon="Plus" @click="addLine">新增</el-button>
        <el-button @click="removeAll()">清除所有</el-button>

        <!-- 可编辑表格 -->
        <el-table :data="testDatas" border style="width: 100%" max-height="70vh">
            <!-- 额外添加的编号项（可删除） -->
            <el-table-column v-if="columnList.length > 0" type="index" :label="'编号'" :width="50"></el-table-column>
            <!-- 自定义表项 -->
            <el-table-column v-for="column in columnList" :key="column.prop">
                <!-- 自定义表头 -->
                <template #header>
                    <!-- 段落：show为true -->
                    <p v-show="column.show" @dblclick="column.show = false">
                        {{ column.label }}
                        <i class="el-icon-edit-outline" @click="column.show = false"></i>
                    </p>
                    <!-- 输入框：show为false -->
                    <el-input v-show="!column.show" v-model="column.label" @blur="column.show = true">
                    </el-input>
                </template>

                <!-- 自定义表项/单元格内容 -->
                <template #default="scope">
                    <!-- 双击文字或点击修改图标以更改"show"属性 -->
                    <!-- scope.row为元数据，column.col为该列的'键' -->
                    <p v-show="scope.row[column.prop].show && (scope.row.operation.id)"
                        @dblclick="scope.row[column.prop].show = false" @click="remove(scope.row.id)">
                        {{ scope.row[column.prop].content }}//{{ scope.row.operation.id }}
                        <i class="el-icon-edit-outline" @click="scope.row[column.prop].show = false" />
                    </p>
                    <p v-show="scope.row[column.prop].show && !(scope.row.operation.id)"
                        @dblclick="scope.row[column.prop].show = false" @click="remove(scope.row.id)">
                        {{ scope.row[column.prop].content }}////{{ scope.row.operation.id }}
                        <i class="el-icon-edit-outline" @click="scope.row[column.prop].show = false" />
                    </p>
                    <!-- 失去焦点时更改"show"属性，显示文本 -->
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" v-show="!scope.row[column.prop].show"
                        v-model="scope.row[column.prop].content" @blur="scope.row[column.prop].show = true" />
                </template>
            </el-table-column>
        </el-table>





    </div>
</template>

<script lang="ts" setup>

import { ref } from 'vue'
import { ElTable } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

const removeAll = () => {
    testDatas.value = []
}

const remove = (id: number) => {
    console.log("id", id)
}

var id = 1

//对话框
const addLine = () => {
    testDatas.value.push({
        operation: {
            content: "删除", show: true, id: ++id
        },
        boss: { content: "", show: true },
        No: { content: " ", show: true },
        info: { content: "", show: true },
        date: { content: "", show: true },
        person: { content: "", show: true },
        number: { content: 0, show: true },
        total: { content: 0, show: true },
        tax: { content: 0, show: true },
        pricing: { content: 0, show: true },
        state: { content: '未审核', show: true },
        id: ++id
    },)
}




// 表项（头），以键(prop)值(label)存储表头，值可改变，键不变用以绑定数据
const columnList = ref([
    { prop: "operation", label: '操作', show: true },
    { prop: "boss", label: '供应商', show: true },
    { prop: "No", label: '单号编号', show: true },
    { prop: "info", label: '商品信息', show: true },
    { prop: "date", label: '单据日期', show: true },
    { prop: "person", label: '操作员', show: true },
    { prop: "number", label: '数量', show: true },
    { prop: "total", label: '金额合计', show: true },
    { prop: "tax", label: '含税合计', show: true },
    { prop: "pricing", label: '支付定金', show: true },
    { prop: "state", label: '状态', show: true },
]);
// 数据
const testDatas = ref([
    {
        operation: { content: " 删除", show: true, id },
        boss: { content: "cat ke", show: true },
        No: { content: " KGMH0000004618", show: true },
        info: { content: "这是一件很有用的商品信息", show: true },
        date: { content: "2023-05-16", show: true },
        person: { content: "kemi", show: true },
        number: { content: 1, show: true },
        total: { content: 0, show: true },
        tax: { content: 0, show: true },
        pricing: { content: 0, show: true },
        state: { content: '通过', show: true },
        id
    },


])











</script>
<style lang="less">
.purchaseStorage {
    height: 100%;
    // margin-left: 200px;
    // word-wrap: break-word;
}
</style>
<!-- element-plus -->
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
