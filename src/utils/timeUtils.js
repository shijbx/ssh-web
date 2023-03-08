import dayjs from "dayjs";

// "08:00" -> Date
export const time2date = (durationStr) => {
  const duration = durationStr.split(":");
  const [hour, minute] = duration;
  const time = dayjs();
  const res = time.set("hour", hour).set("minute", minute);
  return res.toDate();
};
