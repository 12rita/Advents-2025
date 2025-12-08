import {example, input} from "./input";
import {prepareArrayInput, prepareInput} from "../../utils/prepareInput";

type Point = { x: number; y: number };
type Cache = { [key: string]: boolean };
type CacheNumeric = { [key: string]: number };
const getKey = (point: Point) => `${point.x},${point.y}`;

const checkUp = (point: Point, arr: string[][], cache: Cache): boolean => {
    const key = getKey(point);

    if (!arr[point.y]?.[point.x]) return false;
    if (arr[point.y][point.x] === 'S') return true
    if (arr[point.y][point.x] === '^' && arr[point.y][point.x - 1] !== '^' && arr[point.y][point.x + 1] !== '^') return false;
    if (arr[point.y][point.x - 1] === '^' || arr[point.y][point.x + 1] === '^') return checkUp({
        x: point.x - 1,
        y: point.y - 1
    }, arr, cache) || checkUp({x: point.x + 1, y: point.y - 1}, arr, cache);
    return checkUp({x: point.x, y: point.y - 1}, arr, cache);

}
const goDown = (point: Point, arr: string[][], cache: Cache): void => {
    if (point.x < 0 || point.x > arr[0].length - 1) return;
    if (point.y > arr.length - 1) return;
    const key = getKey(point)
    const pointSym = arr[point.y][point.x];

    if (pointSym === '.') goDown({x: point.x, y: point.y + 1}, arr, cache);
    if (pointSym === '^') {
        if (key in cache) return;
        cache[key] = true;
        goDown({x: point.x - 1, y: point.y + 1}, arr, cache);
        goDown({
            x: point.x + 1,
            y: point.y + 1
        }, arr, cache)
    }
    return;
}

const goDown2 = (point: Point, arr: string[][], cache: CacheNumeric): number => {
    if (point.x < 0 || point.x > arr[0].length - 1) return 1;
    if (point.y > arr.length - 1) return 1;
    const key = getKey(point)
    const pointSym = arr[point.y][point.x];

    if (pointSym === '.') return goDown2({x: point.x, y: point.y + 1}, arr, cache);
    if (pointSym === '^') {
        if (key in cache) return cache[key];
        const res = goDown2({x: point.x - 1, y: point.y + 1}, arr,  cache) + goDown2({
            x: point.x + 1,
            y: point.y + 1
        }, arr,  cache)
        cache[key] = res;
        return res
    }
    return 0;
}




const findResult1 = (arr: string[][]) => {
    let start = {x: 0, y: 0};
    const cache = {}
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 'S') {
                start.x = j;
                start.y = i;


            }
        }
    }
    goDown({x: start.x, y: start.y + 1}, arr,  cache)
    return Object.keys(cache).length;
}

const findResult2 = (arr: string[][]) => {
    let start = {x: 0, y: 0};
    const cache = {}
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 'S') {
                start.x = j;
                start.y = i;


            }
        }
    }

    return goDown2({x: start.x, y: start.y + 1}, arr,  cache)
}


const data = prepareArrayInput(input)
console.log(findResult2(data));

