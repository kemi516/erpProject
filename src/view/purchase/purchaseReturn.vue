<template>
  <div class="return">
    采购退货
  </div>
</template>
 
<script setup>
import { ref } from "vue";

const title = ref('Hello');

const arr = ref([{
  shopName: '潭村',
  shopID: '123'
},
{
  shopName: '杨基',
  shopID: '456'
}
]);

const shopAct = ref(0);

const goodNameList = ref([{
  goodName: '奶茶',
  goodID: '1',
  isActive: 0
},
{
  goodName: '奶茶',
  goodID: '1',
  isActive: 1
},
{
  goodName: '奶茶',
  goodID: '1',
  isActive: 0
}
]);


const getShopName = (item, i) => {
  console.log(i);
  shopAct.value = i;
  item.goodNameList = goodNameList.value;
  console.log("111", item);
  // this.list=item.goodNameList

};
const getGoodName = (index) => {
  // console.log("xxx", goodNameList.value[index].isActive);

  if (goodNameList.value[index].isActive === 1) {
    goodNameList.value[index].isActive = 0
  } else {
    goodNameList.value[index].isActive = 1
  }
}


</script>
 
<style>
.active {
  background-color: skyblue;
}
</style>