export const tenMinutesFromNow = () => new Date(Date.now() + 10 * 60 * 1000);
export const fiftenMinutesFromNow = () => new Date(Date.now() + 15 * 60 * 1000);
export const thirtyDaysFromNow = () =>
  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
export const ONE_DAY_MS = 24 * 60 * 60 * 1000;
export const fiveMinutesAgo = () => new Date(Date.now() - 5 * 60 * 1000);
