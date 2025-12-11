import {example, example2, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";


type List = { [key: string]: string[] };

const processInput = (input: string[]) => {
    const list: List = {};
    input.forEach(line => {
        const [start, ways] = line.split(': ');
        list[start] = ways.split(' ');
    })
    return list;
}

const bfs = (list: List) => {
    const queue = [];
    queue.push('you');
    let sum = 0;
    while (queue.length > 0) {
        const vertex = queue.shift() as string;
        if (vertex !== 'out') {
            queue.push(...list[vertex]);
        } else sum++;
    }
    return sum
}

const dfs = (vertex: string, list: List, path: string[]): number => {
    if (vertex === 'out') {
        // Check if 'dac' and 'fft' are in the path
        if (path.includes('dac') && path.includes('fft')) {
            return 1;
        }
        return 0;
    }
    let count = 0;
    for (const child of list[vertex] || []) {
        if (child === 'svr') continue; // Don't revisit start
        if (path.includes(child)) continue; // Don't revisit any small cave
        // Recurse
        count += dfs(child, list, [...path, child]);
    }
    return count;
};

const findResult2 = (list: List): number => {
    let count = 0;
    const stack: { vertex: string; path: string[] }[] = [{ vertex: 'svr', path: ['svr'] }];
    while (stack.length > 0) {
        const { vertex, path } = stack.pop()!;
        if (vertex === 'out') {
            if (path.includes('dac') && path.includes('fft')) {
                count++;
                // Optional: console.log(`Valid path: [${path.join(',')}]`);
            }
            continue;
        }
        for (const child of list[vertex] || []) {
            if (child === 'svr') continue; // Don't revisit start
            if (path.includes(child)) continue; // Don't revisit any small cave
            // Add to stack
            stack.push({ vertex: child, path: [...path, child] });
        }
    }
    return count;
};
// const findResult2 = (list: List) => {
//     return dfs('svr', list, ['svr']);
// }

const list = processInput(prepareInput(input));

console.log(findResult2(list));

