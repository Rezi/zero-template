import * as React from "react";
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from "react-day-picker";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
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

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar",
        css({
          bg: "background",
          p: "3",
          "--cell-radius": "var(--radius-2xl)",
          "--cell-size": "--spacing(8)",
          '&:is([data-slot="card-content"] *)': { bg: "transparent" },
          '&:is([data-slot="popover-content"] *)': { bg: "transparent" },
        }),
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn(css({ width: "fit-content" }), defaultClassNames.root),
        months: cn(
          css({
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "4",
            "@media (min-width: 768px)": { flexDirection: "row" },
          }),
          defaultClassNames.months,
        ),
        month: cn(
          css({
            display: "flex",
            width: "full",
            flexDirection: "column",
            gap: "4",
          }),
          defaultClassNames.month,
        ),
        nav: cn(
          css({
            position: "absolute",
            insetX: "0",
            top: "0",
            display: "flex",
            width: "full",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1",
          }),
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          css({
            width: "var(--cell-size)",
            height: "var(--cell-size)",
            p: "0",
            userSelect: "none",
            _ariaDisabled: { opacity: 0.5 },
          }),
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          css({
            width: "var(--cell-size)",
            height: "var(--cell-size)",
            p: "0",
            userSelect: "none",
            _ariaDisabled: { opacity: 0.5 },
          }),
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          css({
            display: "flex",
            height: "var(--cell-size)",
            width: "full",
            alignItems: "center",
            justifyContent: "center",
            px: "var(--cell-size)",
          }),
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          css({
            display: "flex",
            height: "var(--cell-size)",
            width: "full",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5",
            fontSize: "sm",
            fontWeight: "medium",
          }),
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          css({
            position: "relative",
            borderRadius: "var(--cell-radius)",
          }),
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          css({
            position: "absolute",
            inset: "0",
            bg: "popover",
            opacity: 0,
          }),
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          css({
            fontWeight: "medium",
            userSelect: "none",
            ...(captionLayout === "label"
              ? {
                  fontSize: "sm",
                }
              : {
                  display: "flex",
                  alignItems: "center",
                  gap: "1",
                  borderRadius: "var(--cell-radius)",
                  fontSize: "sm",
                  "& > svg": {
                    width: "3.5",
                    height: "3.5",
                    color: "muted-foreground",
                  },
                }),
          }),
          defaultClassNames.caption_label,
        ),
        month_grid: css({ width: "full", borderCollapse: "collapse" }),
        weekdays: cn(css({ display: "flex" }), defaultClassNames.weekdays),
        weekday: cn(
          css({
            flex: "1",
            borderRadius: "var(--cell-radius)",
            fontSize: "0.8rem",
            fontWeight: "normal",
            color: "muted-foreground",
            userSelect: "none",
          }),
          defaultClassNames.weekday,
        ),
        week: cn(
          css({
            mt: "2",
            display: "flex",
            width: "full",
          }),
          defaultClassNames.week,
        ),
        week_number_header: cn(
          css({
            width: "var(--cell-size)",
            userSelect: "none",
          }),
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          css({
            fontSize: "0.8rem",
            color: "muted-foreground",
            userSelect: "none",
          }),
          defaultClassNames.week_number,
        ),
        day: cn(
          cx(
            "group/day",
            css({
              position: "relative",
              aspectRatio: "1 / 1",
              height: "full",
              width: "full",
              borderRadius: "var(--cell-radius)",
              p: "0",
              textAlign: "center",
              userSelect: "none",
              "&:last-child[data-selected=true] button": {
                borderTopRightRadius: "var(--cell-radius)",
                borderBottomRightRadius: "var(--cell-radius)",
              },
              ...(props.showWeekNumber
                ? {
                    "&:nth-child(2)[data-selected=true] button": {
                      borderTopLeftRadius: "var(--cell-radius)",
                      borderBottomLeftRadius: "var(--cell-radius)",
                    },
                  }
                : {
                    "&:first-child[data-selected=true] button": {
                      borderTopLeftRadius: "var(--cell-radius)",
                      borderBottomLeftRadius: "var(--cell-radius)",
                    },
                  }),
            }),
          ),
          defaultClassNames.day,
        ),
        range_start: cn(
          css({
            position: "relative",
            isolation: "isolate",
            zIndex: 0,
            borderTopLeftRadius: "var(--cell-radius)",
            borderBottomLeftRadius: "var(--cell-radius)",
            bg: "muted",
            _after: {
              content: '""',
              position: "absolute",
              insetY: "0",
              right: "0",
              width: "4",
              bg: "muted",
            },
          }),
          defaultClassNames.range_start,
        ),
        range_middle: cn(css({ borderRadius: "0" }), defaultClassNames.range_middle),
        range_end: cn(
          css({
            position: "relative",
            isolation: "isolate",
            zIndex: 0,
            borderTopRightRadius: "var(--cell-radius)",
            borderBottomRightRadius: "var(--cell-radius)",
            bg: "muted",
            _after: {
              content: '""',
              position: "absolute",
              insetY: "0",
              left: "0",
              width: "4",
              bg: "muted",
            },
          }),
          defaultClassNames.range_end,
        ),
        today: cn(
          css({
            borderRadius: "var(--cell-radius)",
            bg: "muted",
            color: "foreground",
            '&[data-selected="true"]': { borderRadius: "0" },
          }),
          defaultClassNames.today,
        ),
        outside: cn(
          css({
            color: "muted-foreground",
            _ariaSelected: { color: "muted-foreground" },
          }),
          defaultClassNames.outside,
        ),
        disabled: cn(
          css({
            color: "muted-foreground",
            opacity: 0.5,
          }),
          defaultClassNames.disabled,
        ),
        hidden: cn(css({ visibility: "hidden" }), defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={cn(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon
                className={cn(css({ width: "4", height: "4" }), className)}
                {...props}
              />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn(css({ width: "4", height: "4" }), className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon
              className={cn(css({ width: "4", height: "4" }), className)}
              {...props}
            />
          );
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div
                className={css({
                  display: "flex",
                  width: "var(--cell-size)",
                  height: "var(--cell-size)",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                })}
              >
                {children}
              </div>
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
      className={cn(
        css({
          position: "relative",
          isolation: "isolate",
          zIndex: 10,
          display: "flex",
          aspectRatio: "1 / 1",
          width: "full",
          height: "auto",
          minWidth: "var(--cell-size)",
          flexDirection: "column",
          gap: "1",
          borderWidth: "0",
          lineHeight: "none",
          fontWeight: "normal",
          '.group\/day[data-focused="true"] &': {
            position: "relative",
            zIndex: 10,
            borderColor: "ring",
            boxShadow: "0 0 0 3px color-mix(in oklch, var(--ring) 50%, transparent)",
          },
          '&[data-range-end="true"]': {
            borderRadius: "var(--cell-radius)",
            borderTopRightRadius: "var(--cell-radius)",
            borderBottomRightRadius: "var(--cell-radius)",
            bg: "primary",
            color: "primary-foreground",
          },
          '&[data-range-middle="true"]': {
            borderRadius: "0",
            bg: "muted",
            color: "foreground",
          },
          '&[data-range-start="true"]': {
            borderRadius: "var(--cell-radius)",
            borderTopLeftRadius: "var(--cell-radius)",
            borderBottomLeftRadius: "var(--cell-radius)",
            bg: "primary",
            color: "primary-foreground",
          },
          '&[data-selected-single="true"]': {
            bg: "primary",
            color: "primary-foreground",
          },
          _dark: {
            _hover: {
              color: "foreground",
            },
          },
          "& > span": {
            fontSize: "xs",
            opacity: 0.7,
          },
        }),
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
