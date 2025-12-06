import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";

type Range = { start: number; end: number }

const processRanges = (input: string) => {
    const [ranges, ids] = input.split("\n\n");
    const sortedRanges = ranges.split('\n').map(item => {
        const [start, end] = item.split("-");
        return {start: +start, end: +end};
    }).sort((a, b) => {

        return a.start - b.start
    });
    return {ranges: sortedRanges, ids: ids.split('\n')};
}

const findResult = (ranges: Range[], ids: string[]) => {
    return ids.reduce((acc, item) => {
        return acc + checkFresh(ranges, +item);
    }, 0)
}

const checkFresh = (arr: Range[], target: number) => {
    let start = 0;
    while (!!arr[start]?.start && arr[start].start <= target) {
        if (arr[start].end >= target) return 1;
        start++
    }
    return 0
}

function binarySearch(arr: Range[], target: number): number {
    let left = 0;
    let right = arr.length - 1;
    console.log({target, ranges})
    while (left <= right) {

        const mid = Math.floor((left + right) / 2);
        console.log({s: arr[left], m: arr[mid], e: arr[right]});
        if (+arr[mid].start === target) {
            return 1;
        } else if (+arr[mid].start <= target) {
            if (+arr[mid].end >= target) {
                return 1;
            }
            left = mid + 1; // Search right half
        } else {
            right = mid - 1; // Search left half
        }
    }
    return 0; // Target not found
}

const findResult2 = (input: Range[]) => {
    const newRanges: Range[] = [];

    input.forEach(item => {
        if (newRanges.length === 0) newRanges.push(item);
        let hasChanges = false;
        for (let i = 0; i < newRanges.length; i++) {

            if (newRanges[i].start <= item.start && newRanges[i].end >= item.start) {
                newRanges[i] = {start: newRanges[i].start, end: Math.max(item.end, newRanges[i].end)};
                hasChanges = true;
                return;
            } else if (newRanges[i].start <= item.end && newRanges[i].end >= item.end) {
                newRanges[i] = {start: Math.min(newRanges[i].start, item.start), end: newRanges[i].end};
                hasChanges = true;
                return;
            }
        }
        if (!hasChanges) newRanges.push(item);

    })
    return newRanges.reduce((acc, item) => {
        return acc + (item.end - item.start + 1)
    }, 0)
}

//730 - too low
// const {ranges, ids} = processRanges(example);
const {ranges, ids} = processRanges(input);
console.log(findResult2(ranges));

