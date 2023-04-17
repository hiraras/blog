## VTable

### Table.vue

```Vue
<script setup>
import { computed, toRefs, useSlots, watchEffect } from "vue";
import { store, updateDataSource } from "./store";

const props = defineProps(["dataSource"]);

const slots = useSlots();

const { dataSource, columns } = toRefs(store);

watchEffect(() => {
    updateDataSource(props.dataSource);
});

const keys = computed(() => store.columns.map((item) => item.dataIndex));
</script>

<template>
    <table border>
        <thead>
            <tr>
                <th v-for="item in columns" :key="item.dataIndex">
                    {{ item.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in dataSource" :key="index">
                <td v-for="column in columns" :key="column.dataIndex">
                    {{ item[column.dataIndex] || "-" }}
                </td>
            </tr>
        </tbody>
    </table>
    <div><slot></slot></div>
</template>
```

### TableColumn.vue

```Vue
<script setup>
import { onMounted } from "@vue/runtime-core";
import { insertColumn } from "./store";

const props = defineProps(["title", "dataIndex"]);

onMounted(() => {
    const { title, dataIndex } = props;
    insertColumn({
        title,
        dataIndex,
    });
});
</script>

<template>
    <div></div>
</template>
```

### Store.ts

```Vue
<script setup>
import { onMounted } from "@vue/runtime-core";
import { insertColumn } from "./store";

const props = defineProps(["title", "dataIndex"]);

onMounted(() => {
    const { title, dataIndex } = props;
    insertColumn({
        title,
        dataIndex,
    });
});
</script>

<template>
    <div></div>
</template>
```
