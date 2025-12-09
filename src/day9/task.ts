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
    const arr: string[][] = [];
    let maxX = 0, maxY = 0;

    input.forEach(item => {
        const [x, y] = item.split(',');
        maxX = Math.max(maxX, +x);
        maxY = Math.max(maxY, +y)
    });

    for (let i = 0; i < maxY + 1; i++) {
        for (let j = 0; j < maxX + 1; j++) {
            if (!arr[i]) arr[i] = [];
            arr[i][j] = '.'
        }
    }


    input.forEach(item => {
        const [x, y] = item.split(',');

        arr[y][x] = '#';
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
                arr[i][j] = 'X';
            }
        }
    }


    for (let i = 0; i < arr.length; i++) {
        let start = -1;
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 'X') {
                if (start === -1)
                    start = j;
                else {
                    start = -1;
                    break;
                }
            } else if (arr[i][j] === '.' && start !== -1) {
                arr[i][j] = 'X';
            }

        }
    }

    const coords: { start: number, end: number }[] = [];
    arr.forEach((item, idx) => {
        const line = item.join('');
        coords[idx] = {start: line.indexOf('X'), end: line.lastIndexOf('X')};
    })

    coords.forEach((item, idx) => {
        for (let j = item.start; j < item.end + 1; j++) {
            arr[idx][j] = 'X';
        }
    })

    return arr;
}

const checkAvailable = (point1: Point, point2: Point, arr: string[][]) => {
    for (let i = Math.min(point1.y, point2.y); i < Math.max(point1.y, point2.y) + 1; i++) {
        for (let j = Math.min(point1.x, point2.x); j < Math.max(point1.x, point2.x) + 1; j++) {
            if (arr[i][j] !== 'X') return false;
        }
    }
    return true;
}

const findResult2 = (input: string[], arr: string[][]) => {
    let max = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = i + 1; j < input.length; j++) {
            const [x1, y1] = input[i].split(',');
            const [x2, y2] = input[j].split(',');
            const isAvailable = checkAvailable({x: x1, y: y1}, {x: x2, y: y2}, arr);
            if (isAvailable) {
                const S = (Math.abs(+y2 - (+y1)) + 1) * (Math.abs(+x2 - (+x1)) + 1);
                max = Math.max(max, S);
            }

        }
    }
    return max;
}
const data = prepareInput(input);
const arr = makeArr(data);

console.log(findResult2(data, arr));

