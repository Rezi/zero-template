import * as React from "react";
import { DayPicker, getDefaultClassNames, type DayButton, type Locale } from "react-day-picker";
import { css } from "@zero-app/styled-system/css";

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

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={clsx(
        "group/calendar",
        css({
          bg: "background",
          p: "3",
          "--cell-radius": "var(--radius-2xl)",
          "--cell-size": "calc(var(--spacing, 0.25rem) * 8)",
          "[data-slot=card-content] &": { bg: "transparent" },
          "[data-slot=popover-content] &": { bg: "transparent" },
          "[dir=rtl] &": {
            "& .rdp-button_next > svg": { transform: "rotate(180deg)" },
            "& .rdp-button_previous > svg": { transform: "rotate(180deg)" },
          },
        }),
        className,
      )}
      captionLayout={captionLayout}
      locale={locale}
      formatters={{
        formatMonthDropdown: (date) => date.toLocaleString(locale?.code, { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: clsx(css({ w: "fit" }), defaultClassNames.root),
        months: clsx(
          css({
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "4",
            md: { flexDirection: "row" },
          }),
          defaultClassNames.months,
        ),
        month: clsx(
          css({ display: "flex", w: "full", flexDirection: "column", gap: "4" }),
          defaultClassNames.month,
        ),
        nav: clsx(
          css({
            position: "absolute",
            insetInline: "0",
            top: "0",
            display: "flex",
            w: "full",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1",
          }),
          defaultClassNames.nav,
        ),
        button_previous: clsx(
          buttonVariants({ variant: buttonVariant }),
          css({
            size: "var(--cell-size)",
            p: "0",
            userSelect: "none",
            "&[aria-disabled='true']": { opacity: "0.5" },
          }),
          defaultClassNames.button_previous,
        ),
        button_next: clsx(
          buttonVariants({ variant: buttonVariant }),
          css({
            size: "var(--cell-size)",
            p: "0",
            userSelect: "none",
            "&[aria-disabled='true']": { opacity: "0.5" },
          }),
          defaultClassNames.button_next,
        ),
        month_caption: clsx(
          css({
            display: "flex",
            h: "var(--cell-size)",
            w: "full",
            alignItems: "center",
            justifyContent: "center",
            px: "var(--cell-size)",
          }),
          defaultClassNames.month_caption,
        ),
        dropdowns: clsx(
          css({
            display: "flex",
            h: "var(--cell-size)",
            w: "full",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5",
            fontSize: "sm",
            fontWeight: "medium",
          }),
          defaultClassNames.dropdowns,
        ),
        dropdown_root: clsx(
          css({ position: "relative", borderRadius: "var(--cell-radius)" }),
          defaultClassNames.dropdown_root,
        ),
        dropdown: clsx(
          css({ position: "absolute", inset: "0", bg: "popover", opacity: "0" }),
          defaultClassNames.dropdown,
        ),
        caption_label: clsx(
          css({ fontWeight: "medium", userSelect: "none" }),
          captionLayout === "label"
            ? css({ fontSize: "sm" })
            : css({
                display: "flex",
                alignItems: "center",
                gap: "1",
                borderRadius: "var(--cell-radius)",
                fontSize: "sm",
                "& > svg": { size: "3.5", color: "muted.foreground" },
              }),
          defaultClassNames.caption_label,
        ),
        month_grid: css({ w: "full", borderCollapse: "collapse" }),
        weekdays: clsx(css({ display: "flex" }), defaultClassNames.weekdays),
        weekday: clsx(
          css({
            flex: "1",
            borderRadius: "var(--cell-radius)",
            fontSize: "0.8rem",
            fontWeight: "normal",
            color: "muted.foreground",
            userSelect: "none",
          }),
          defaultClassNames.weekday,
        ),
        week: clsx(css({ mt: "2", display: "flex", w: "full" }), defaultClassNames.week),
        week_number_header: clsx(
          css({ w: "var(--cell-size)", userSelect: "none" }),
          defaultClassNames.week_number_header,
        ),
        week_number: clsx(
          css({ fontSize: "0.8rem", color: "muted.foreground", userSelect: "none" }),
          defaultClassNames.week_number,
        ),
        day: clsx(
          "group/day",
          css({
            position: "relative",
            aspectRatio: "square",
            h: "full",
            w: "full",
            borderRadius: "var(--cell-radius)",
            p: "0",
            textAlign: "center",
            userSelect: "none",
            "&:last-child[data-selected=true] button": {
              borderTopRightRadius: "var(--cell-radius)",
              borderBottomRightRadius: "var(--cell-radius)",
            },
          }),
          props.showWeekNumber
            ? css({
                "&:nth-child(2)[data-selected=true] button": {
                  borderTopLeftRadius: "var(--cell-radius)",
                  borderBottomLeftRadius: "var(--cell-radius)",
                },
              })
            : css({
                "&:first-child[data-selected=true] button": {
                  borderTopLeftRadius: "var(--cell-radius)",
                  borderBottomLeftRadius: "var(--cell-radius)",
                },
              }),
          defaultClassNames.day,
        ),
        range_start: clsx(
          css({
            position: "relative",
            isolation: "isolate",
            zIndex: "0",
            borderTopLeftRadius: "var(--cell-radius)",
            borderBottomLeftRadius: "var(--cell-radius)",
            bg: "muted",
            "&::after": {
              content: '""',
              position: "absolute",
              insetBlock: "0",
              right: "0",
              w: "4",
              bg: "muted",
            },
          }),
          defaultClassNames.range_start,
        ),
        range_middle: clsx(css({ borderRadius: "0" }), defaultClassNames.range_middle),
        range_end: clsx(
          css({
            position: "relative",
            isolation: "isolate",
            zIndex: "0",
            borderTopRightRadius: "var(--cell-radius)",
            borderBottomRightRadius: "var(--cell-radius)",
            bg: "muted",
            "&::after": {
              content: '""',
              position: "absolute",
              insetBlock: "0",
              left: "0",
              w: "4",
              bg: "muted",
            },
          }),
          defaultClassNames.range_end,
        ),
        today: clsx(
          css({
            borderRadius: "var(--cell-radius)",
            bg: "muted",
            color: "foreground",
            "&[data-selected=true]": { borderRadius: "0" },
          }),
          defaultClassNames.today,
        ),
        outside: clsx(
          css({
            color: "muted.foreground",
            "&[aria-selected='true']": { color: "muted.foreground" },
          }),
          defaultClassNames.outside,
        ),
        disabled: clsx(
          css({ color: "muted.foreground", opacity: "0.5" }),
          defaultClassNames.disabled,
        ),
        hidden: clsx(css({ visibility: "hidden" }), defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return <div data-slot="calendar" ref={rootRef} className={clsx(className)} {...props} />;
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return <ChevronLeftIcon className={clsx(css({ size: "4" }), className)} {...props} />;
          }

          if (orientation === "right") {
            return <ChevronRightIcon className={clsx(css({ size: "4" }), className)} {...props} />;
          }

          return <ChevronDownIcon className={clsx(css({ size: "4" }), className)} {...props} />;
        },
        DayButton: ({ ...props }) => <CalendarDayButton locale={locale} {...props} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div
                className={css({
                  display: "flex",
                  size: "var(--cell-size)",
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
      className={clsx(
        css({
          position: "relative",
          isolation: "isolate",
          zIndex: "10",
          display: "flex",
          aspectRatio: "square",
          size: "auto",
          w: "full",
          minW: "var(--cell-size)",
          flexDirection: "column",
          gap: "1",
          borderWidth: "0",
          lineHeight: "none",
          fontWeight: "normal",
          "&[data-range-end=true]": {
            borderRadius: "var(--cell-radius)",
            bg: "primary",
            color: "primary.foreground",
          },
          "&[data-range-middle=true]": { borderRadius: "0", bg: "muted", color: "foreground" },
          "&[data-range-start=true]": {
            borderRadius: "var(--cell-radius)",
            bg: "primary",
            color: "primary.foreground",
          },
          "&[data-selected-single=true]": { bg: "primary", color: "primary.foreground" },
          _dark: { _hover: { color: "foreground" } },
          "& > span": { fontSize: "xs", opacity: "0.7" },
          // Focus ring driven by the `group/day` marker on the ancestor day cell
          // (react-day-picker sets `data-focused` there). Base already supplies
          // position/z-index, so only the ring is needed here.
          ".group\\/day[data-focused='true'] &": {
            borderColor: "ring",
            ringW: "3",
            ringC: "ring/50",
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
