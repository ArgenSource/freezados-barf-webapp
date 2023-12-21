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

export const Datetime = (props: HTMLProps<HTMLInputElement>) => {
  const styles = twMerge("rounded-md border-2 p-1", props.className);

  return (
    <input
      type="datetime-local"
      {...props}
      className={styles}
      defaultValue={convertToDateTimeLocalString(new Date())}
    />
  );
};
