import type { HTMLAttributes, PropsWithChildren } from "react";
import { FOOD_ICONS, type FType } from "~/features/food/utils/foodStyleIcons";

type SelectProps = {
  defaultOpt?: FType;
};

type ISelectFoodTypeProps = PropsWithChildren<
  SelectProps & HTMLAttributes<HTMLDivElement>
>;

export function SelectFoodType({
  defaultOpt,
  className,
}: ISelectFoodTypeProps) {
  return (
    <div
      className={
        className ?? "flex w-full max-w-xs items-center justify-evenly"
      }
    >
      {[...FOOD_ICONS.keys()].map((opt: FType) => (
        <label htmlFor={`type-${opt}`} key={`type-${opt}`}>
          <input
            id={`type-${opt}`}
            type="radio"
            value={opt}
            name="type"
            defaultChecked={defaultOpt === opt}
          />
          {FOOD_ICONS.get(opt)}
        </label>
      ))}
    </div>
  );
}
