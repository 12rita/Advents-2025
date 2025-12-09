import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";

type Point = { x: number, y: number };

const findResult = (input: string[]) => {
    let max = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const [x1, y1] = input[i].split(',');
            const [x2, y2] = input[j].split(',');

            const S = (Math.abs(+y2 - (+y1)) + 1) * (Math.abs(+x2 - (+x1)) + 1);
            max = Math.max(max, S);
        }
    }
    return max
}

const makeArr = (input: string[]) => {
    const arr: string[] = [];
    let maxX = 0, maxY = 0;

    input.forEach(item => {
        const [x, y] = item.split(',');
        maxX = Math.max(maxX, +x);
        maxY = Math.max(maxY, +y)
    });

    for (let i = 0; i < maxY + 1; i++) {
        arr[i] = '.'.repeat(maxX);
    }


    input.forEach(item => {
        const [x, y] = item.split(',');

        arr[y] = arr[y].substring(0, +x) + '#' + arr[y].substring(+x + 1);

    })


    for (let i = 0; i < input.length; i++) {
        const [x1, y1] = input[i].split(',');
        let [x2, y2] = [0, 0];
        if (i === input.length - 1) {
            [x2, y2] = input[0].split(',');
        } else
            [x2, y2] = input[i + 1].split(',');

        for (let i = Math.min(+y1, +y2); i < Math.max(+y1, +y2) + 1; i++) {
            for (let j = Math.min(+x1, +x2); j < Math.max(+x1, +x2) + 1; j++) {
                arr[i] = arr[i].substring(0, j) + 'X' + arr[i].substring(j + 1);

            }
        }
    }

    arr.forEach((item, idx) => {
        arr[idx] = item.substring(0, item.indexOf('X')) + 'X'.repeat(item.lastIndexOf('X') - item.indexOf('X')) + item.substring(item.lastIndexOf('X'));
    })


    return arr;
}

const checkAvailable = (point1: Point, point2: Point, input: string[]) => {
    let down = false;
    let up = false;
    let left = false;
    let right = false;
    const points = [point1, point2, {x: point1.x, y: point2.y}, {x: point1.x, y: point1.y}];
    return points.every((point) => {
        input.forEach((item) => {
                const [x, y] = item.split(',');
                if (+y < point.y) up = true;
                if (+y > point.y) down = true;
                if (+x > point.x) right = true;
                if (+x < point.x) left = true;
            }
        )
        return down && up && left && right;
    })


}


const findResult2 = (input: string[]) => {

    let max = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const [x1, y1] = input[i].split(',');
            const [x2, y2] = input[j].split(',');
            const isAvailable = checkAvailable({x: +x1, y: +y1}, {x: +x2, y: +y2}, input);
            if (isAvailable) {
                const S = (Math.abs(+y2 - (+y1)) + 1) * (Math.abs(+x2 - (+x1)) + 1);
                max = Math.max(max, S);
            }

        }
    }
    return max;
}
const data = prepareInput(input);
// const arr = makeArr(data);
// console.log(arr);
console.log(findResult2(data));

