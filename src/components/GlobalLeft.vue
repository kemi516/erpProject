<template>
    <div class="globalLeft">
        <!-- default-active 高亮 -->
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse"
            @select="handleSelect">


            <!-- 使用循环渲染 -->
            <div v-for="item, name in globalData">
                <div v-if="item.items.length == 1">
                    <el-menu-item :index="name">
                        <el-icon>
                            <component :is="item.icon" /> <!-- 导入不同组件 -->
                        </el-icon>
                        <template #title>{{ item.title }}</template>
                    </el-menu-item>
                </div>
                <div v-else>
                    <el-sub-menu :index="name"> <!-- :index是有几个值 -->

                        <template #title>
                            <el-icon>
                                <component :is="item.icon" /> <!-- 导入不同组件 -->
                            </el-icon>

                            <span>{{ item.title }}</span></template>
                        <el-menu-item :index="sonItem.Ename" v-for="sonItem in item.items">{{ sonItem.name
                            }}</el-menu-item>

                    </el-sub-menu>
                </div>
            </div>


        </el-menu>

    </div>
</template>




<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import {
    House,
    Present,
    Histogram,
    Grid,
    Avatar,
    Guide,
    Coin,
    ChromeFilled,
    GoodsFilled,
    User
} from '@element-plus/icons-vue'


//导入路由
import { useRouter } from "vue-router";
const router = useRouter();

// const str = router.currentRoute.value.fullPath.slice(1)
// const index = str.indexOf("/")

const activeIndex = sessionStorage.getItem("activeIndex") || ref('joke')


const isCollapse = ref(false)
// Stopwatch,
//  Chicken, Histogram, PieChart,
// Menu, 
//  Tools,
//数据
const globalData = shallowRef({
    // "home": {
    //     "icon": House,
    //     'title': '首页',
    //     'items': [{ Ename: 'home', name: '首页' }],
    // },
    "chuku": {
        "icon": Guide,
        'title': '出库单',
        'items': [{ Ename: 'chuku', name: '出库单' }],
    },
    "ruku": {
        "icon": Guide,
        'title': '入库单',
        'items': [{ Ename: 'ruku', name: '入库单' }],
    },
    "faliao": {
        "icon": Guide,
        'title': '发料单',
        'items': [{ Ename: 'faliao', name: '发料单' }],
    },
    "ruliao": {
        "icon": Guide,
        'title': '入料单',
        'items': [{ Ename: 'ruliao', name: '入料单' }],
    },
    "huopin": {
        "icon": Histogram,
        'title': '货品出入明细',
        'items': [{ Ename: 'huopin', name: '货品出入明细' }],
    },
    "liaoming": {
        "icon": Histogram,
        'title': '料出入明细',
        'items': [{ Ename: 'liaoming', name: '料出入明细' }],
    },
    "kucun": {
        "icon": Grid,
        'title': '产品库存表',
        'items': [{ Ename: 'kucun', name: '产品库存表' }],
    },
    "kehu": {
        "icon": Avatar,
        'title': '客户汇总',
        'items': [{ Ename: 'kehu', name: '客户汇总' }],
    },
    // "reHhuodan": {
    //     "icon": House,
    //     'title': '重打货单',
    //     'items': [{ Ename: 'reHhuodan', name: '重打货单' }],
    // },
    // "reLiaodan": {
    //     "icon": House,
    //     'title': '重打料单',
    //     'items': [{ Ename: 'reLiaodan', name: '重打料单' }],
    // },
    "shoufu": {
        "icon": Coin,
        'title': '收付款录入',
        'items': [{ Ename: 'shoufu', name: '收付款录入' }],
    },
    "yinhan": {
        "icon": ChromeFilled,
        'title': '银行流水',
        'items': [{ Ename: 'yinhan', name: '银行流水' }],
    },
    // "duizhang": {
    //     "icon": House,
    //     'title': '对账单生成',
    //     'items': [{ Ename: 'duizhang', name: '对账单生成' }],
    // },
    // "tiexi": {
    //     "icon": House,
    //     'title': '贴明细',
    //     'items': [{ Ename: 'tiexi', name: '贴明细' }],
    // },
    // "lirun": {
    //     "icon": House,
    //     'title': '混合总汇（算利润）',
    //     'items': [{ Ename: 'lirun', name: '混合总汇（算利润）' }],
    // },
    // "ykJoke": {
    //     "icon": Present,
    //     'title': 'yk管理',
    //     'items': [{ Ename: 'joke', name: '爆笑来袭' }, { Ename: 'riddle', name: '猜谜语' },],
    // },
    "userControl": {
        "icon": User,
        'title': '用户管理',
        'items': [{ Ename: 'userInfo', name: '用户信息' }],
    },
    // "shopping": {
    //     "icon": GoodsFilled,
    //     'title': '商品管理',
    //     'items': [{ Ename: 'shopInfo', name: '商品信息' }],
    // },

    /*    "retail": {
           "icon": Present,
           'title': '零售管理',
           'items': [['reRemoval', '零售出库'], ['reReturn', '零售退货'],],
       },
       "purchase": {
           "icon": Paperclip,
           'title': '采购管理',
           'items': [['puOrder', '采购订单'], ['puStorage', '采购入库'], ['puReturn', '采购退货'],],
       },
       "sell": {
           "icon": ShoppingTrolley,
           'title': '销售管理',
           'items': [['sellOrder', '销售订单'], ['sellRemoval', '销售出库'], ['sellReturn', '销售退货'],],
       },
       "store": {
           "icon": Refrigerator,
           'title': '仓库管理',
           'items': [['stStorage', '其他入库'], ['stReturn', '其他出库'],],
       },
       "finance": {
           "icon": CreditCard,
           'title': '财务管理',
           'items': [['fiStorage', '收入单'], ['fiReturn', '支出单'],],
       },
       */


})


/* //监听窗口变化
const { body } = document
window.addEventListener('resize', () => {
    if (body.getBoundingClientRect().width <= 768) { isCollapse.value = true }
    else {
        isCollapse.value = false
    }
}) */

//侧边菜单点击回调
const handleSelect = (key: string, keyPath: string[]) => {
    // console.log("xx", activeIndex, 'keu', key)
    sessionStorage.setItem("activeIndex", key)
    router.push(`/${keyPath[0]}/${key}`)
}
</script>

<style lang="less">
.globalLeft {
    width: 200px;
    margin-top: 60px;
    word-wrap: break-word;
    background-color: aqua;
    position: absolute;
    z-index: 3;
}
</style>

<!-- element-ui -->
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: calc(100vh - 60px);
    overflow: auto;
    /* background-color: rgb(192, 238, 255); */
    /* min-height: 400px; */
}

.el-menu-vertical-demo:not(.el-menu--collapse)::-webkit-scrollbar {
    width: 0px;
    height: 0px;
}
</style>