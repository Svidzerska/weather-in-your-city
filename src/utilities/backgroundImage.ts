export const backgroundChange = (): string | undefined => {
  let date: Date = new Date();
  let month: number = date.getMonth();
  switch (month) {
    case 11:
    case 0:
    case 1:
      return "winter";

    case 8:
    case 9:
    case 10:
      return "autumn";

    case 5:
    case 6:
    case 7:
      return "summer";

    case 2:
    case 3:
    case 4:
      return "spring";
  }
};
