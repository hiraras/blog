## IndexedDB 使用例子

```TypeScript
const request = window.indexedDB.open(dbName);
request.onsuccess = (e: any) => {
    console.log(2);
    const db = e.target.result;
    const addRequest = db.transaction([tableName], 'readwrite').objectStore(tableName).add(data);

    addRequest.onsuccess = callback;

    addRequest.onerror = (e) => {
        console.log('error:', e);
    };

    // console.log(db.objectStoreNames.contains(tableName));
    // const objStore = db.createObjectStore(tableName);
    // objStore.transaction.oncomplete = (e) => {
    //     console.log('complete');
    // };
    // if (!db.objectStoreNames.contains(tableName)) {
    //     db.createObjectStore(tableName);
    // }
    // db.transaction([tableName], 'readwrite').objectStore(tableName).add(data)
};
request.onupgradeneeded = (e: any) => {
    const db = e.target.result;
    db.createObjectStore(tableName, { keyPath: 'id' });
    if (!db.objectStoreNames.contains(tableName)) {
        const objStore = db.createObjectStore(tableName, { keyPath: 'id' });
        objStore.createIndex('id', 'id', { unique: true });
    }
};

```
