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
