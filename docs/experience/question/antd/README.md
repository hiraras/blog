# antd 使用经验

## 表单布局可以有帮助的操作：

1. noStyle 属性 表现为普通的表单元素没有 margin 等，会覆盖 label
2. ProForm.Item ProFormGroup 联合使用
3. style 属性
4. ProFormGroup 的 grid 属性 : 去除 gap
5. 使用 addonAfter 属性: 添加到后边
6. 一些表单组件如 Select 里的 optins 如果只是要选择后提交，而不需要根据选择源数据里拿到其他参数可以考虑把请求写在 requst 参数里边

例如：

```JSX
<ProFormTreeSelect
    name="catId"
    label="指标所属目录"
    width="md"
    request={async () => {
        return (await CatalogAPI.getTree()).data;
    }}
    rules={[{ required: true }]}
    fieldProps={{
        fieldNames: {
            label: 'catName',
            value: 'id',
            children: 'children',
        },
    }}
/>
```
