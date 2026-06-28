import * as React from "react";
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from "react-day-picker";
import { calendar, type CalendarVariantProps } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
import { Button, buttonVariants } from "./button";
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from "lucide-react";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  locale,
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();
  const slots = calendar({
    captionLayout: captionLayout as CalendarVariantProps["captionLayout"],
    showWeekNumber: props.showWeekNumber,
  });

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx("group/calendar", slots.container, className)}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: clsx(slots.root, defaultClassNames.root),
        months: clsx(slots.months, defaultClassNames.months),
        month: clsx(slots.month, defaultClassNames.month),
        nav: clsx(slots.nav, defaultClassNames.nav),
        button_previous: clsx(
          buttonVariants({ variant: buttonVariant }),
          slots.buttonPrevious,
          defaultClassNames.button_previous,
        ),
        button_next: clsx(
          buttonVariants({ variant: buttonVariant }),
          slots.buttonNext,
          defaultClassNames.button_next,
        ),
        month_caption: clsx(slots.monthCaption, defaultClassNames.month_caption),
        dropdowns: clsx(slots.dropdowns, defaultClassNames.dropdowns),
        dropdown_root: clsx(slots.dropdownRoot, defaultClassNames.dropdown_root),
        dropdown: clsx(slots.dropdown, defaultClassNames.dropdown),
        caption_label: clsx(slots.captionLabel, defaultClassNames.caption_label),
        month_grid: slots.monthGrid,
        weekdays: clsx(slots.weekdays, defaultClassNames.weekdays),
        weekday: clsx(slots.weekday, defaultClassNames.weekday),
        week: clsx(slots.week, defaultClassNames.week),
        week_number_header: clsx(slots.weekNumberHeader, defaultClassNames.week_number_header),
        week_number: clsx(slots.weekNumber, defaultClassNames.week_number),
        day: clsx("group/day", slots.day, defaultClassNames.day),
        range_start: clsx(slots.rangeStart, defaultClassNames.range_start),
        range_middle: clsx(slots.rangeMiddle, defaultClassNames.range_middle),
        range_end: clsx(slots.rangeEnd, defaultClassNames.range_end),
        today: clsx(slots.today, defaultClassNames.today),
        outside: clsx(slots.outside, defaultClassNames.outside),
        disabled: clsx(slots.disabled, defaultClassNames.disabled),
        hidden: clsx(slots.hidden, defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={clsx(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={clsx(slots.chevron, className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={clsx(slots.chevron, className)} {...props} />;
          }

          return <ChevronDownIcon className={clsx(slots.chevron, className)} {...props} />;
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className={slots.weekNumberCell}>{children}</div>
            </td>
          );
        },
        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  locale,
  ...props
}: React.ComponentProps<typeof DayButton> & { locale?: Partial<Locale> }) {
  const defaultClassNames = getDefaultClassNames();
  const slots = calendar();

  const ref = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString(locale?.code)}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={clsx(slots.dayButton, defaultClassNames.day, className)}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
