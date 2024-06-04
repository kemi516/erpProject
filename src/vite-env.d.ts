/// <reference types="vite/client" />
//出现路径导出找不到模块时使用即申明vue是个模块
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}