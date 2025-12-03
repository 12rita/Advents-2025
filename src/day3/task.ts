import {example, input} from "./input";
import {prepareInput} from "../../utils/prepareInput";



const findJoltage_old = (input: string) => { //new version is applicable for both cases

  let left = 0;
  let leftIdx = -1;
  let right = 0;
  for (let i = 0; i < input.length; i++) {
      if (+input[i] > left) {
          left = +input[i];
          leftIdx = i;
      }
  }
  if (leftIdx < input.length-1) {
      for (let i = leftIdx + 1; i < input.length; i++) {
          if (+input[i] > right) {
              right = +input[i];
          }
      }
  }
  else {
      right = left;
      left = 0;
      for (let i = 0; i < input.length-1; i++) {
          if (+input[i] > left) {
              left = +input[i];
              leftIdx = i;
          }
      }
  }

  return +`${left}${right}`;
}

const findJoltage = (input: string, length: number) => {
    const digits = [];
    let max = 0;
    let start = -1;

    while (digits.length < length) {
        const restDigits = length - digits.length;
        for (let i = start+1; i < input.length-restDigits+1; i++) {
            if (+input[i] > max) {
                max = +input[i];
                start = i;
            }
        }
        digits.push(max);
        max = 0;
    }

    return +(digits.join(''));
}

const findResult = (input: string[], length: number) => {
    return input.reduce((acc, item)=>acc+findJoltage(item, length),0);
}

console.log(findResult(prepareInput(example),12));
console.log(findResult(prepareInput(input), 12));


