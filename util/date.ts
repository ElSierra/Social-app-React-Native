export const dateAgo = (date: Date) => {
  const currentDatetime = new Date();

  const timeDifference = currentDatetime.getTime() - date.getTime();

  const minutesAgo = Math.floor(timeDifference / (1000 * 60));
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const secondsAgo = Math.floor(timeDifference / 1000);
  let result;

  if (secondsAgo < 60) {
    result = `${secondsAgo}s`;
  } else if (minutesAgo < 60) {
    result = `${minutesAgo}m`;
  } else if (hoursAgo < 24) {
    result = `${hoursAgo}h`;
  } else {
    result = `${daysAgo}d`;
  }

  return result;
};

export const dateFormatted = (date: Date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date
    .getFullYear()
    .toString()
    .slice(-2)}, ${formatAMPM()}`;

  return formattedDate;

  function formatAMPM() {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours %= 12;
    hours = hours || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes.toString();
    return `${hours}:${minutesStr} ${ampm}`;
  }
};

export function formatDateForChat(inputDateStr: string) {
  const inputDate = new Date(inputDateStr);
  const currentDate = new Date();

  // Check if the input date is today
  if (
    inputDate.getDate() === currentDate.getDate() &&
    inputDate.getMonth() === currentDate.getMonth() &&
    inputDate.getFullYear() === currentDate.getFullYear()
  ) {
    // If it's today, format as HH:mm
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // If it's not today, format as dd/mm HH:mm
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    return `${day}/${month} ${hours}:${minutes}`;
  }
}
