import {example, example2, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";
import solver from 'javascript-lp-solver';

type List = { [key: string]: string[] };

interface NodeClass {
    next: any;
    prev: any;
    head: any;
}

class Node implements NodeClass {
    head: any;
    next: any;
    prev: any;

    constructor(props: NodeClass) {
        this.next = props.next;
        this.prev = props.prev;
        this.head = props.head;
    }


}

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

    if (list[vertex].includes('out')) {
        if (path.includes('dac') && path.includes('fft'))
            return 1;
        return 0;
    }

    return list[vertex].reduce((acc, child) => acc + dfs(child, list, [...path, child]), 0)

}

const findResult2 = (list:List) => {
    return dfs('svr', list, ['svr']);
}

const list = processInput(prepareInput(input));

console.log(findResult2(list));

