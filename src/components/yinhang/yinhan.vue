<template>
    <div>
        <h1 style="text-align: center;">银行流水</h1>
        <div class="summary">
            <div><strong>总款：</strong> {{ totalPayments }}</div>
            <div><strong>总料库存：</strong> {{ totalMaterials }}</div>
            <div><strong>总货库存：</strong> {{ totalGoods }}</div>
        </div>
        <el-table :data="customers" style="width: 100%" :edit-config="{ trigger: 'click' }" @edit="handleEdit"
            ref="table">
            <el-table-column label="客户名称" prop="name" editable></el-table-column>
            <el-table-column label="来料" prop="materialsIn" editable></el-table-column>
            <el-table-column label="来货" prop="materialsOut" editable></el-table-column>
            <el-table-column label="工费" prop="laborCost" editable></el-table-column>
            <el-table-column label="来款" prop="paymentsIn" editable></el-table-column>
            <el-table-column label="欠款" prop="balanceDue" editable></el-table-column>
            <el-table-column label="欠料" prop="materialsDue" editable></el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="removeCustomer(row)" type="text" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-button @click="showAddDialog" type="primary">添加客户</el-button>
        <el-dialog v-model="dialogVisible" :title="isNewCustomer ? '添加客户' : '编辑客户'" width="30%"
            :close-on-click-modal="false" :close-on-press-escape="false">
            <el-form :model="currentCustomer" label-width="80px">
                <el-form-item label="客户名称" prop="name">
                    <el-input v-model="currentCustomer.name"></el-input>
                </el-form-item>
                <el-form-item label="来料" prop="materialsIn">
                    <el-input-number v-model="currentCustomer.materialsIn" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="来货" prop="materialsOut">
                    <el-input-number v-model="currentCustomer.materialsOut" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="工费" prop="laborCost">
                    <el-input-number v-model="currentCustomer.laborCost" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="来款" prop="paymentsIn">
                    <el-input-number v-model="currentCustomer.paymentsIn" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="欠款" prop="balanceDue">
                    <el-input-number v-model="currentCustomer.balanceDue" :min="0"></el-input-number>
                </el-form-item>
                <el-form-item label="欠料" prop="materialsDue">
                    <el-input-number v-model="currentCustomer.materialsDue" :min="0"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="saveCustomer">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
    name: 'CustomerList',
    setup() {
        const customers = ref([
            { id: 1, name: '客户1', materialsIn: 0, materialsOut: 0, laborCost: 0, paymentsIn: 0, balanceDue: 0, materialsDue: 0 },
            { id: 2, name: '客户2', materialsIn: 0, materialsOut: 0, laborCost: 0, paymentsIn: 0, balanceDue: 0, materialsDue: 0 }
        ]);

        const dialogVisible = ref(false);
        const isNewCustomer = ref(true);
        const currentCustomer = ref({});

        const totalPayments = computed(() => {
            return customers.value.reduce((total, customer) => total + customer.balanceDue, 0);
        });

        const totalMaterials = computed(() => {
            return customers.value.reduce((total, customer) => total + customer.materialsIn, 0);
        });

        const totalGoods = computed(() => {
            return customers.value.reduce((total, customer) => total + customer.materialsOut, 0);
        });

        const showAddDialog = () => {
            isNewCustomer.value = true;
            currentCustomer.value = {
                name: '',
                materialsIn: 0,
                materialsOut: 0,
                laborCost: 0,
                paymentsIn: 0,
                balanceDue: 0,
                materialsDue: 0
            };
            dialogVisible.value = true;
        };

        const saveCustomer = () => {
            if (isNewCustomer.value) {
                const newId = customers.value.length > 0 ? customers.value[customers.value.length - 1].id + 1 : 1;
                customers.value.push({ id: newId, ...currentCustomer.value });
            }
            dialogVisible.value = false;
        };

        const removeCustomer = (customer) => {
            const index = customers.value.indexOf(customer);
            if (index !== -1) {
                customers.value.splice(index, 1);
            }
        };

        const handleEdit = ({ row }) => {
            console.log('保存客户信息', row);
        };

        return {
            customers,
            dialogVisible,
            isNewCustomer,
            currentCustomer,
            showAddDialog,
            saveCustomer,
            removeCustomer,
            totalPayments,
            totalMaterials,
            totalGoods,
            handleEdit
        };
    }
};
</script>

<style>
.summary {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    padding: 10px 20px;
}
</style>