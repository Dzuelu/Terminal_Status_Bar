"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let countClicks = 0;
let timoutDisposal = null;
exports.clickListeningCommand = (handleTerminals, id) => {
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
//# sourceMappingURL=clickListeningCommand.js.map