import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";


const isAccessible = (point: { x: number; y: number }, array: string[][]) => {
    const neighbours = [{x: -1, y: -1}, {x: 0, y: -1}, {x: 1, y: -1}, {x: -1, y: 0}, {x: 1, y: 0}, {x: -1, y: 1}, {
        x: 0,
        y: 1
    }, {x: 1, y: 1}];

    let neighboursCount = 0;
    for (let i = 0; i < neighbours.length; i++) {
        const newX = point.x + neighbours[i].x;
        const newY = point.y + neighbours[i].y;
        if (array[newY] && array[newY][newX] && array[newY][newX] === '@') {
            neighboursCount++;
            if (neighboursCount === 4) return false
        }
    }
    return true
}

const findResult = (input: string[][]) => {
    return input.reduce((acc, item, i, arr) => {
        return acc + item.reduce((acc, itm, j) => {
            if (itm === '@')
                return acc + (isAccessible({x: j, y: i}, arr) ? 1 : 0)
            return acc;
        }, 0)
    }, 0);
}

const removeAccessible = (input: string[][]) => {
    const inputCopy = [...input.map((item) => [...item])];
    let changesCount = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === '@' && isAccessible({x: j, y: i}, input)) {
                inputCopy[i][j] = '.';
                changesCount++;
            }

        }
    }
    return {array: inputCopy, changesCount}
}

const findResult2 = (input: string[][]) => {
    let hasChanges = true;
    let arr = input;
    let total = 0;
    while (hasChanges) {
        const {changesCount, array} = removeAccessible(arr);
        if (changesCount === 0) hasChanges = false;
        arr = array;
        total += changesCount;
    }
    return total
}

// console.log(findResult2(prepareArrayInput(example)));
console.log(findResult2(prepareArrayInput(input)));


