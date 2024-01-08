export const calculateVariation = (currentPrice: number, lastPrice: number) => {
  if (lastPrice === 0 || lastPrice === undefined || lastPrice === null)
    return 0;

  if (currentPrice === lastPrice) return 0;

  return ((currentPrice - lastPrice) / lastPrice) * 100;
};
