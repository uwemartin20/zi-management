import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/de";

dayjs.extend(relativeTime);
dayjs.locale("de");

export const date = (date) => {
  return dayjs(date).format("D. MMM YYYY");
};

export const time = (date) => {
  return dayjs(date).format("H:mm") + 'h';
};

export const day = (date) => {
  return dayjs(date).format("dddd");
};

export const dateTime = (datetime) => {
  return dayjs(datetime).format("D. MMM YYYY H:mm") + 'h';
};

export const diffForHumans = (datetime, withoutSuffix = false) => {
  return dayjs(datetime).fromNow(withoutSuffix);
};
