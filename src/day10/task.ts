import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";

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

        return acc + minPressesBFS(target, buttonsVec);

    },0)
}

const minPressesBFS = (target: number[], buttons: number[][]): number => {
    const numCounters = target.length;
    const startState = new Array(numCounters).fill(0);
    const targetKey = target.join(',');
    const visited = new Set<string>();
    const queue: [number[], number][] = [[startState, 0]]; // [current_state, presses]
    visited.add(startState.join(','));
    while (queue.length > 0) {
        const [current, presses] = queue.shift()!;
        const currentKey = current.join(',');
        if (currentKey === targetKey) {
            return presses;
        }
        // Try pressing each button
        for (const button of buttons) {
            const nextState = [...current];
            for (const counter of button) {
                nextState[counter] += 1;
                // Optional: Early prune if any counter exceeds target (heuristic, but may not always help)
                if (nextState[counter] > target[counter]) break;
            }
            const nextKey = nextState.join(',');
            if (!visited.has(nextKey)) {
                visited.add(nextKey);
                queue.push([nextState, presses + 1]);
            }
        }
    }
    return -1; // Unreachable (shouldn't happen in examples)

}
console.log(findResult2(prepareInput(input)));

