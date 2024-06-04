<template>
    <el-table :data="tableData" border>
        <el-table-column prop="OrderNumber" label="单号" width="180"></el-table-column>
        <el-table-column prop="date" label="日期" width="140"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="CustomerName" label="客户姓名"></el-table-column>
        <el-table-column prop="Number" label="序号" width="60"></el-table-column>
        <el-table-column prop="ProductName" label="品名"></el-table-column>
        <el-table-column prop="weight" label="重量" width="80"></el-table-column>
        <el-table-column prop="unitPrice" label="单价" width="80"></el-table-column>
        <el-table-column prop="additional" label="单价附加" width="100"></el-table-column>
        <el-table-column prop="money" label="金额" width="100"></el-table-column>
        <el-table-column prop="notes" label="备注"></el-table-column>
        <el-table-column prop="type" label="单据类型"></el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                // 这里可以添加数据
                {
                    OrderNumber: "CK20240425234325",
                    date: "2024年04月25日",
                    time: "23:43:25",
                    CustomerName: "工厂",
                    Number: "1",
                    ProductName: "硬金饰品",
                    weight: "1000",
                    unitPrice: "1000",
                    additional: "8",
                    money: "2000000",
                    notes: "1",
                    type: "入库",
                }
            ],
        };
    },
};
</script>
