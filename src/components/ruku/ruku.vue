<template>
    <div>
        <h1 style="text-align: center;">入库单</h1>
        <div style="display: flex;justify-content: space-around; box-shadow: 0 0 3px gray;">
            <div>
                单号:{{ currentDateTimeDH }}（日期）：{{ currentDateTime }}
            </div>
            <div>
                <span style="color:red;font-weight: bolder;">客户 :</span>
                <!-- 客户列表 -->
                <select v-model="selectedValue">
                    <option :value="i" v-for="i in 5">kemi{{ i }}</option>
                </select>
            </div>
        </div>
        <el-form :model="form" ref="form" label-width="100px">
            <table>
                <thead>
                    <tr>
                        <th v-for="column in columns" :key="column.id">
                            <div v-if="column.id != 5">
                                {{ column.name }}
                            </div>
                        </th>
                        <th>
                            金额
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in rows" :key="row.id">
                        <td v-for="(value, key) in row" :key="key">
                            <!-- 品名列表 -->
                            <select v-if="key == 'name'" v-model="row[key]">
                                <option :value="i" v-for="i in 5">999{{ i }}</option>
                            </select>
                            <div v-if="key == 'price'"></div>
                            <div v-else-if="key == 'name'"></div>
                            <input v-else v-model="row[key]" :placeholder="key" @keyup.enter="stopEditing(row, key)" />
                        </td>
                        <td>
                            {{ priceValue[i] }}
                        </td>
                    </tr>
                </tbody>
            </table>
            <table border style="background-color: pink;">
                <tr>
                    <td>总克重：{{ totalKezhoneValue }} 克</td>
                    <td>总金额：{{ totalpriceValue }} 元</td>
                </tr>
            </table>
            <button @click="add">新增行</button>
            <button @click="remover">移除行</button>
            <!-- 提交到后端 -->
            <el-popconfirm title="确定提交该单吗?" @confirm="confirmEvent">
                <template #reference>
                    <el-button>提交</el-button>
                </template>
            </el-popconfirm>
        </el-form>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus'
export default {
    name: 'EditableTable',

    setup() {
        // 获取时间
        function getCurrentDateTime(data) {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth() + 1;  // 月份是从0开始的，所以需要+1
            const day = now.getDate();
            const hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            // 为了格式美观，可以对月、日、时、分、秒进行补零操作
            const formattedMonth = month < 10 ? '0' + month : month;
            const formattedDay = day < 10 ? '0' + day : day;
            const formattedHours = hours < 10 ? '0' + hours : hours;
            const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
            const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
            if (data) {
                return `${year}年${formattedMonth}月${formattedDay}日${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
            }
            return `${year}${formattedMonth}${formattedDay}${formattedHours}${formattedMinutes}${formattedSeconds}`;
        }
        // 获取时间使用函数
        const currentDateTime = getCurrentDateTime("data");
        const currentDateTimeDH = 'Rk' + getCurrentDateTime();
        //表格序号
        const columns = ref([
            { id: 0, name: '序号' },
            { id: 1, name: '品名' },
            { id: 2, name: '克重' },
            { id: 3, name: '单价' },
            { id: 4, name: '单价附加' },
            { id: 5, name: '金额' },
            { id: 6, name: '备注' },

        ]);
        var i = 1;//序号
        const rows = ref([
            { id: i, name: '', kezhong: '', danjia: '', fujia: '', price: '', notes: "" },
        ]);//表格初始值
        //添加行
        const add = () => {
            rows.value.push({ xuhao: ++i, name: '', kezhong: '', danjia: '', fujia: '', price: '', notes: "" },)
        }
        //移除行
        const remover = () => {
            if (rows.value.length > 1) {
                rows.value.pop()
            }
        }
        //客户选项
        const selectedValue = ref(''); // 使用ref定义一个响应式的数据
        //总克重
        const totalKezhone = () => {
            return rows.value.reduce((acc, curr) => acc + Number(curr.kezhong), 0);
        };
        const totalKezhoneValue = computed(() => {
            return totalKezhone();
        });
        //金额
        const price = () => {
            return rows.value.map(element =>
                ((Number(element.danjia) + Number(element.fujia)) * Number(element.kezhong))
            );
        };
        const priceValue = computed(() => {
            return price();
        });
        //总金额
        const totalprice = () => {
            return priceValue.value.reduce((acc, curr) => acc + Number(curr), 0);
        };
        const totalpriceValue = computed(() => {
            return totalprice();
        });
        // 提交确定框
        const confirmEvent = () => {
            var rowsrules = ""
            rows.value.forEach(element => { // 遍历表格数据，将空值替换为0，避免计算错误。
                if (!element.kezhong) {
                    ElMessage.error('克重不能为空')
                    rowsrules = -1
                    return -1
                } // 检查克重是否为空，如果为空则替换为0。
                if (!element.danjia) {
                    ElMessage.error('单价不能为空')
                    rowsrules = -1
                    return -1
                }
                if (!element.name) {
                    ElMessage.error('品名不能为空')
                    rowsrules = -1
                    return -1
                }
            })
            console.log(rowsrules) // 输出表格数据，检查是否正确。
            if (selectedValue.value && rowsrules != -1) {
                console.log(rows.value.length)
                ElMessage({
                    message: '提交成功',
                    type: 'success',
                })
                console.log("rows:", rows.value, "客户", selectedValue.value, "总克重", totalKezhoneValue.value, "总金额", totalpriceValue.value)
                rows.value = [
                    { id: i, name: '', kezhong: '', danjia: '', fujia: '', price: '' },
                ]; //清空表格数据，避免重复提交
                selectedValue.value = "";//清空客户选项，避免重复提交 

            } else if (!selectedValue.value) {
                ElMessage.error('需要选中客户')
            }
        };
        // 表格验证


        return {
            columns,
            rows,
            add,
            remover,
            currentDateTime,
            currentDateTimeDH,
            selectedValue,
            confirmEvent,
            totalKezhoneValue,
            totalpriceValue,
            priceValue,
        };
    },
};
</script>

<style scoped>
/* 在这里添加一些样式 */
</style>
