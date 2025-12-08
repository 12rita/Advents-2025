import {example, input} from "./input";
import {prepareInput} from "../../utils/prepareInput";

type Point = { x: number; y: number; z: number };

type ListItem = { dist: number, a: string, b: string };
type Circuits = { [key: string]: boolean }[];

const findDist = (a: string, b: string) => {
    const [x1, y1, z1] = a.split(',').map(Number);
    const [x2, y2, z2] = b.split(',').map(Number);

    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2) + Math.pow((z1 - z2), 2));
}

const getList = (input: string[]) => {
    const list: ListItem[] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {

            list.push({dist: findDist(input[i], input[j]), a: input[i], b: input[j]});
        }

    }
    return list.sort((a, b) => b.dist - a.dist);
}

const makingCircuit = (shortestDist: ListItem, circuits: Circuits, singleNum: number) => {

    const existedCircuitA = circuits.findIndex((circuit) => circuit[shortestDist.a]);
    const existedCircuitB = circuits.findIndex((circuit) => circuit[shortestDist.b]);

    if (existedCircuitA === -1 && existedCircuitB === -1) {
        const newCircuit = {[shortestDist.a]: true, [shortestDist.b]: true};
        singleNum -= 2;
        circuits.push(newCircuit);
    } else if (existedCircuitA !== -1 && existedCircuitB !== -1 && existedCircuitA === existedCircuitB) {


    } else if (existedCircuitA !== -1 && existedCircuitB !== -1 && existedCircuitA !== existedCircuitB) {
        circuits[existedCircuitA] = {...circuits[existedCircuitB], ...circuits[existedCircuitA]};
        circuits.splice(existedCircuitB, 1);

    } else if (existedCircuitA === -1 && existedCircuitB !== -1) {
        circuits[existedCircuitB][shortestDist.a] = true;
        singleNum--;
    } else if (existedCircuitA !== -1 && existedCircuitB === -1) {
        circuits[existedCircuitA][shortestDist.b] = true;
        singleNum--;
    }

    return {newSingleNum: singleNum, circuits}
}

const connectingJukeboxes = (input: string[], rounds: number) => {
    const list = getList(input);

    const circuits: { [key: string]: boolean }[] = [];
    let singleNum = input.length;
    let last: ListItem | undefined;
    for (let i = 0; i < rounds; i++) {
        last = list.pop();
        if (!last) return;
        const {newSingleNum} = makingCircuit(last, circuits, singleNum);
        singleNum = newSingleNum;
    }

    const [f, s, t] = circuits.map((circuit) => Object.keys(circuit).length).sort((a, b) => b - a);

    return f * s * t;

}

const connectingJukeboxes2 = (input: string[], rounds: number) => {
    const list = getList(input);

    const circuits: { [key: string]: boolean }[] = [];
    let singleNum = input.length;
    let last: ListItem | undefined;
    while (!(circuits.length === 1 && singleNum === 0)) {
        last = list.pop();
        if (!last) return;
        const {newSingleNum} = makingCircuit(last, circuits, singleNum);
        singleNum = newSingleNum;
    }

    if (!last) return;
    const [x1] = last.a.split(',');
    const [x2] = last.b.split(',');

    return (+x1)*(+x2);

}

const data = prepareInput(input)
console.log(connectingJukeboxes2(data, 1000));

