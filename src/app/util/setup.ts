import { CounterContext } from "../app";
import { HSL } from "./color";

export function createDefaultCounterContexts(playerCount: number): CounterContext[] {
    return calculateCounterOffsets(playerCount)
        .map((angle) => ({
            color: { h: angle, s: 60, l: 60 } as HSL,
            start: 0,
            name: ''
        }));
}

/**
 * The aim of this function is to improve readability and spacing of coumters
 * Where possible it should avoid counters at the side of the screen
 * 
 * @param playerCount the number of players
 * @returns an array of angles in degrees for counter positions, with 0 being vertical
 */
export function calculateCounterOffsets(playerCount: number): number[] {
    if (playerCount % 4 == 0) {
        const halfStep = 180 / playerCount;
        return new Array(playerCount)
            .fill(0)
            .map((_, i) => halfStep + (i * 360 / playerCount));
    }
    return new Array(playerCount)
        .fill(0)
        .map((_, i) => i * 360 / playerCount);
}