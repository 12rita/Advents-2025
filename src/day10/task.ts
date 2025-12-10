import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";
import solver from 'javascript-lp-solver';


const minPresses = (target: number[], buttons: number[][]): number => {
    const n = target.length; // Number of lights
    const k = buttons.length; // Number of buttons
    let minPresses = Infinity;
    // Brute-force all subsets using bit masks (0 to 2^k - 1)
    for (let mask = 0; mask < (1 << k); mask++) {
        const current = new Array(n).fill(0); // Start with all lights off
        let pressCount = 0;
        // Apply each button in the subset (where bit is set)
        for (let i = 0; i < k; i++) {
            if (mask & (1 << i)) { // If button i is in subset
                pressCount++;
                for (const light of buttons[i]) {
                    current[light] ^= 1; // Toggle the light
                }
            }
        }
        // Check if current matches target
        if (current.every((val, idx) => val === target[idx])) {
            minPresses = Math.min(minPresses, pressCount);
        }
    }
    return minPresses === Infinity ? -1 : minPresses; // -1 if impossible (though examples are solvable)
}

const findResult = (input: string[]) => {
    return input.reduce((acc, item) => {
        let [lights, ...buttons] = item.split(' ');
        buttons.pop();
        const lightsArr = lights.split('');


        lightsArr.pop();
        lightsArr.shift();

        const lightsVec = lightsArr.map(el => el === '#' ? 1 : 0);
        const buttonsVec = buttons.map(button => button.substring(1, button.length - 1).split(',').map(el => +el));

        return acc + minPresses(lightsVec, buttonsVec);

    },0)
}

const findResult2 = (input: string[]) => {
    return input.reduce((acc, item) => {
        let [lights, ...buttons] = item.split(' ');
        const targetStr = buttons.pop() ?? '';


        const target = targetStr.substring(1, targetStr.length-1).split(',').map(el => +el);
        const buttonsVec = buttons.map(button => button.substring(1, button.length - 1).split(',').map(el => +el));

        return acc + minPressesILP(target, buttonsVec);

    },0)
}


function minPressesILP(target: number[], buttons: number[][]): number {
    const m = target.length;
    const n = buttons.length;
    const model = {
        optimize: 'total', // Minimize sum(x)
        opType: 'min',
        constraints: {} as any,
        variables: {} as any,
        ints: {} as any,
    };
    // Constraints: Ax = b (one per counter)
    for (let i = 0; i < m; i++) {
        model.constraints[`c${i}`] = { equal: target[i] };
    }
    // Variables: x_j for each button, with coefficients for constraints
    for (let j = 0; j < n; j++) {
        model.variables[`x${j}`] = { total: 1 }; // Minimize sum
        model.ints[`x${j}`] = 1; // Integer
        for (let i = 0; i < m; i++) {
            if (buttons[j].includes(i)) {
                model.variables[`x${j}`][`c${i}`] = 1;
            }
        }
    }
    const result = solver.Solve(model);
    return result.feasible ? result.result : -1;
}



console.log(findResult2(prepareInput(input)));

