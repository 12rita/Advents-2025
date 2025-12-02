import {example, example2, input} from "./input";
import {prepareInput} from "../../utils/prepareInput";



const calculateZeros = (input: string[]) => {
    let current = 50;
    let zeros = 0;
    input.forEach(item => {
        const number = +item.substring(1);

        const newNum =  number % 100;
        const prevSign = Math.sign(current);

        current += (item[0] === 'L' ? -newNum : +newNum);


        const sign = Math.sign(current);
        const zeroToZero = Math.abs(prevSign) === Math.abs(sign) && Math.abs(prevSign) === 0;
        const rounds =  Math.floor(number / 100)  - (zeroToZero ? 1 : 0);
        const crossZero = prevSign !== sign && sign !== 0 && sign !== -0 && prevSign !== 0 && prevSign !== -0 ? 1 : 0;

        const addRounds = current % 100 === 0 ? 0 : Math.floor(Math.abs(current) / 100);
        current = current % 100;
        zeros += rounds + crossZero + addRounds;
        if (current === 0 ) zeros += 1;

    })
    return zeros;
}

console.log(calculateZeros(prepareInput(example)))
console.log(calculateZeros(prepareInput(input)));
