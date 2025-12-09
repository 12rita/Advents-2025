import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";

type Point = { x: number, y: number };
type Border = { [key: string]: number[] };

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

const makeBorder = (input: string[]) => {

    const x: Border = {};
    const y: Border = {};

    for (let i = 0; i < input.length; i++) {
        const [x1, y1] = input[i].split(',').map(el => +el);
        let [x2, y2] = [0, 0];
        if (i === input.length - 1) {
            [x2, y2] = input[0].split(',').map(el => +el);
        } else
            [x2, y2] = input[i + 1].split(',').map(el => +el);

        for (let i = Math.min(y1, y2); i < Math.max(y1, y2) + 1; i++) {
            for (let j = Math.min(x1, x2); j < Math.max(x1, x2) + 1; j++) {

                if (!x[j]) x[j] = [];
                x[j].push(i);

                if (!y[i]) y[i] = [];
                y[i].push(j);

            }
        }
    }


    return {x, y};
}

const checkAvailable = (point1: Point, point2: Point, abs: Border, ord: Border) => {

    const points = [];
    for (let i = Math.min(point1.y, point2.y); i < Math.max(point1.y, point2.y) + 1; i++) {
        points.push({x: point1.x, y: i});
        points.push({x: point2.x, y: i});
    }
    for (let i = Math.min(point1.x, point2.x); i < Math.max(point1.x, point2.x) + 1; i++) {
        points.push({y: point1.y, x: i});
        points.push({y: point2.y, x: i});
    }

    return points.every((point) => {
        let down = false;
        let up = false;
        let left = false;
        let right = false;

        if (!abs[point.x] || !ord[point.y]) return false;
        if (abs[point.x].find(el => el <= point.y)) up = true;
        if (abs[point.x].find(el => el >= point.y)) down = true;
        if (ord[point.y].find(el => el <= point.x)) left = true;
        if (ord[point.y].find(el => el >= point.x)) right = true;

        return down && up && left && right;
    })


}


const findResult2 = (input: string[], x: Border, y: Border) => {

    let max = 0;
    for (let i = 0; i < input.length; i++) {

        for (let j = i + 1; j < input.length; j++) {

            const [x1, y1] = input[i].split(',').map(el => +el);
            const [x2, y2] = input[j].split(',').map(el => +el);
            const isAvailable = checkAvailable({x: x1, y: y1}, {x: x2, y: y2}, x, y);
            if (isAvailable) {

                const S = (Math.abs(y2 - (y1)) + 1) * (Math.abs(x2 - (x1)) + 1);

                max = Math.max(max, S);
            }

        }
    }
    return max;
}
const data = prepareInput(input);
const {x, y} = makeBorder(data);

console.log(findResult2(data, x, y));

