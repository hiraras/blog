## 数组的所有排列

```JavaScript
const test = (nums) => {
    const results = [];
    const gen = (current) => {
        if (current.length === nums.length) {
            results.push(current);
            return;
        }
        nums.forEach(n => {
            if (!current.includes(n)) {
                gen([...current, n])
            }
        })
    }
    gen([])
    return results;
}
console.log(test([1,2,3]))

```
