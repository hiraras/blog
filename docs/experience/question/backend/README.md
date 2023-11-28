# 中后台

## 中后台前端工作量构成？

表单 45% 状态管理，多表单交互 --- 低代码
流程图 15% 数据管理，查 api
table 10% 条件过滤部分，数值展示 --- 低代码
图表 10% 数据转换，查 api
其他（微前端、权限、路由、全局状态管理等）20%

权限

页面权限 ---- 路由

元素权限 ---- 容易造成组件与业务的耦合

1. 组件状态在 props 传入的时候体现，而不是把权限判断放到组件内部
2. 使用 hooks、高阶组件的方式集中管理权限控制 --- 权限规则发生变化时，可以集中处理