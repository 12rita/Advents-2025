import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";

const transpose = (input: string[][]) => {
    const transposed: string[][] = [];
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            if (!transposed[j]) transposed[j] = [];
            transposed[j][i] = input[i][j];
        }
    }
    return transposed
}

const processInput = (input: string) => {
    const arr: string[][] = input.split('\n').map((line) => line.split(/\s+/).filter(item => !!item));

    return transpose(arr);
}

const processInput2 = (input: string) => {
    const arr = input.split('\n');
    const firstLine = arr[0];
    const matrix: string[][] = [];
    let start = 0;
    for (let i = 0; i < firstLine.length; i++) {
        if (firstLine[i] === ' ') {
            let allSpace = true;
            for (let j = 0; j < arr.length; j++) {
                if (arr[j][i] !== ' ') allSpace = false;
            }
            if (allSpace) {
                for (let j = 0; j < arr.length; j++) {
                    if (!matrix[j]) matrix[j] = [];
                    matrix[j].push(arr[j].substring(start, i));
                }
                start = i + 1;
            }
        }
    }
    for (let j = 0; j < arr.length; j++) { //для последнего рядя
        if (!matrix[j]) matrix[j] = [];
        matrix[j].push(arr[j].substring(start));
    }

    return transpose(matrix);

}


const findResult = (arr: string[][]) => {
    return arr.reduce((acc, line) => {
        const sign = line[line.length - 1];
        line.pop();
        return acc + line.reduce((acc, num) => {
            return sign === '*' ? (+acc) * (+num) : (+acc) + (+num);
        })
    }, 0)
}

const findResult2 = (arr: string[][]) => {
    return arr.reduce((acc, line) => {
        let max = 0;
        const sign = line[line.length - 1].trim();
        line.pop();
        for (let i = 0; i < line.length; i++) {
            if (line[i].length > max) max = line[i].length;
        }
        const newNums = [];


        for (let j = 0; j < max; j++) {
            newNums.push(line.map(item => item[j] ?? '').join(''));
        }

        return acc + newNums.reduce((acc, item) => {
            return sign === '*' ? +acc * +item : +acc + +item;
        })

    }, 0)
}

const data = processInput2(input)
console.log(findResult2(data));

