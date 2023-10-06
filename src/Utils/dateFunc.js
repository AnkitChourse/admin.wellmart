import moment from "moment";

export const formattedDateServer = function (d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return `${day}-${month}-${year}`;
};
export const camelToFlat = (camel) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  let flat = "";

  camelCase.forEach((word) => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return flat;
};

export const SkDate = (SkDate) => {
  return SkDate?.toLocaleDateString("en-GB", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const SkPrice = (SkPrice) => {
  return SkPrice?.toLocaleString("en-US", {
    style: "currency",
    currency: "INR",
  });
};

export function formatDate(timestamp) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  // Check if the targetDate is yesterday
  const isYesterday =
    targetDate.getDate() === currentDate.getDate() - 1 &&
    targetDate.getMonth() === currentDate.getMonth() &&
    targetDate.getFullYear() === currentDate.getFullYear();

  // Get the time in 12-hour format
  const time = targetDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  if (isYesterday) {
    return `Yesterday at ${time}`;
  } else if (targetDate.getDate() === currentDate.getDate()) {
    return `Today at ${time}`;
  } else {
    return `${formattedDateServer(new Date(timestamp))} at ${time}`;
  }
}
