import { type HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

function convertToDateTimeLocalString(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

type DatetimeProps = {
  defaultDate?: Date | null;
} & HTMLProps<HTMLInputElement>;

export const Datetime = ({ defaultDate = null, ...props }: DatetimeProps) => {
  const styles = twMerge("rounded-md border-2 p-1", props.className);
  const defaultVal = defaultDate
    ? convertToDateTimeLocalString(defaultDate)
    : convertToDateTimeLocalString(new Date());

  return (
    <input
      type="datetime-local"
      {...props}
      className={styles}
      defaultValue={defaultVal}
    />
  );
};
