import { createPinia } from "pinia";
import persis from "pinia-plugin-persistedstate"; // 数据持久化插件

// 创建pinia实例
const pinia = createPinia();
// 注册持久化插件
pinia.use(persis);

export default pinia;
export * from "./modules/user";
export * from "./modules/consult";
