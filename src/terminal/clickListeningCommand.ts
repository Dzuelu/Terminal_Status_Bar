let countClicks: number = 0;
let timoutDisposal: NodeJS.Timeout = null; // eslint-disable-line @typescript-eslint/no-unused-vars

interface HandleTerminals {
  delete: (id: number) => void;
  show: (id: number) => void;
}

export const clickListeningCommand = (handleTerminals: HandleTerminals, id: number) => {
  countClicks += 1;
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
