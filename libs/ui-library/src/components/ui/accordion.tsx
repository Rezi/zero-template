import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { css, cx } from "@zero-app/styled-system/css";
import { cn } from "../../lib/utils";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(
        css({
          display: "flex",
          width: "full",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: "2xl",
          borderWidth: "1px",
        }),
        className,
      )}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        css({
          "&:not(:last-child)": { borderBottomWidth: "1px" },
          _dataOpen: { bg: "muted/50" },
        }),
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className={css({ display: "flex" })}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          cx(
            "group/accordion-trigger",
            css({
              position: "relative",
              display: "flex",
              flex: "1",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "6",
              borderWidth: "1px",
              borderColor: "transparent",
              p: "4",
              textAlign: "left",
              fontSize: "sm",
              fontWeight: "medium",
              transitionProperty: "all",
              transitionDuration: "150ms",
              transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              outline: "none",
              _hover: { textDecoration: "underline" },
              _ariaDisabled: { pointerEvents: "none", opacity: 0.5 },
              "& * [data-slot='accordion-trigger-icon']": {
                ml: "auto",
                width: "4",
                height: "4",
                color: "muted-foreground",
              },
            }),
          ),
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className={css({
            pointerEvents: "none",
            flexShrink: 0,
            ".group\\/accordion-trigger[aria-expanded='true'] &": { display: "none" },
          })}
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className={css({
            pointerEvents: "none",
            display: "none",
            flexShrink: 0,
            ".group\\/accordion-trigger[aria-expanded='true'] &": { display: "inline" },
          })}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={css({
        overflow: "hidden",
        px: "4",
        fontSize: "sm",
        _dataOpen: { animation: "accordion-down 0.2s ease-out" },
        _dataClosed: { animation: "accordion-up 0.2s ease-in" },
      })}
      {...props}
    >
      <div
        className={cn(
          css({
            height: "var(--accordion-panel-height)",
            pt: "0",
            pb: "4",
            _dataEndingStyle: { height: "0" },
            _dataStartingStyle: { height: "0" },
            "& a": {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              _hover: { color: "foreground" },
            },
            "& p:not(:last-child)": { mb: "4" },
          }),
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
