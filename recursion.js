
const sumOf = (list) => {
    if (list.length === 1) 
        return list[0]
    else
        return list[0] + sumOf(list.slice(1)) 
}

const list = [2,4,6,8,10];

console.log(sumOf(list));