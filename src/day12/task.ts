//500 - to high
//250 - too low
//375 - too low
//438 ?
//437

import {input} from "./input";

const processInput = (input: string) => {
    const objects = input.split('\n\n');
    const squares = [7, 7, 7, 5, 7, 6]
    const containers = objects.pop() ?? '';

    return containers.split('\n').filter((line) => {
        const [squareLine, numLine] = line.split(': ');
        const [w, l] = squareLine.split('x').map(Number);
        const square = w * l;
        const fit = numLine.split(' ').map(Number).reduce((acc, num, idx)=>{
            return acc - (+num)*squares[idx]
        }, square);

        return fit >= 0;
    }).length

}

const ans = processInput(input);
console.log({ans})
