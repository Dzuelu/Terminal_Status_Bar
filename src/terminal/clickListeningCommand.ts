import { handleTerminals } from './handleTerminals';
let countClicks: number = 0;
let timoutDisposal: NodeJS.Timeout = null;

export const clickListeningCommand = (handleTerminals: any, id: number) => {
    ++countClicks;
    if (countClicks === 1) {
        handleTerminals.show(id);
        timoutDisposal = setTimeout(() => {
            countClicks = 0;
            timoutDisposal = null;
        }, 650);
    }
    if (countClicks === 3) {
        timoutDisposal = null;
        // three click
        handleTerminals.delete(id);
    }
};