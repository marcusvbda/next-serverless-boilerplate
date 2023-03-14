export const formatDate = (date: string) => {
  let dt = new Date(date);
  let day: any = dt.getDate();
  day = day < 10 ? `0${day}` : day;
  let month: any = Number(dt.getMonth() + 1);
  month = month < 10 ? `0${month}` : month;
  let year = dt.getFullYear();
  return `${day}/${month}/${year}`;
}