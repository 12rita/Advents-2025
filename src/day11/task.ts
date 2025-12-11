import {example, example2, input} from "./input";
import {prepareInput} from "../../utils/prepareInput";


type List = { [key: string]: string[] };

type Cache = { [key: string]: number };

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

const dfs = (vertex: string, list: List, path: string[], cache: Cache): number => {
    const key = `${vertex}_${path.includes('dac')}_${path.includes('fft')}`
    if (key in cache) {
        return cache[key]
    }

    if (vertex === 'out') {
        return path.includes('dac') && path.includes('fft') ? 1 : 0;
    }

    const res = list[vertex].reduce((acc, child) => {
        return acc + dfs(child, list, [...path, child], cache);
    }, 0)

    cache[key] = res;
    return res;
};

const findResult2 = (list: List) => {
    return dfs('svr', list, ['svr'], {});
}


const list = processInput(prepareInput(input));

console.log(findResult2(list));
