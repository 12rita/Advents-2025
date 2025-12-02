import {example, input} from "./input";


const findResult = (input: string) => {
    return input.split(",").reduce((acc, item) => {
        return acc + processRange(item);
    }, 0);
}

const processRange = (input: string) => {
    let [start, end] = input.split('-').map(item => +item);
    let sum = 0;

    while (start <= end) {
        const sStart = String(start);
        const isInvalid = checkInvalid(sStart);
        if (isInvalid) sum += start;

        start++;
    }
    return sum;

}

const checkInvalid = (input: string) => {
    // console.log({input})
    for (let i = 1; i < input.length; i++) {
        const firstPart = input.substring(0, i);
        const partLength = input.length / i;
        if (partLength % 1 !== 0) continue;

        let isInvalid = true;
        for (let j = 0; j < input.length-i+1; j+=i) {
            const part = input.substring(j, j + i);
            if (part !== firstPart) {
                isInvalid = false;
                break;
            }
        }
        if (isInvalid) return true;

    }
    return false;
}

// console.log(findResult(example));
console.log(findResult(input));


