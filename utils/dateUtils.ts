export const getYesterday = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  return yesterday;
}

export const getDateInFuture = (days: number) => {
  if (!Number.isInteger(days) || days < 0) {
    throw Error("Invalid input. Please provide a non-negative integer.");
  }

  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + days);

  return futureDate;
}
