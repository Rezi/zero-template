import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { css } from "@zero-app/styled-system/css";

import { clsx } from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const accordionStyles = css({
  display: "flex",
  w: "full",
  flexDirection: "column",
  overflow: "hidden",
  rounded: "2xl",
  borderWidth: "1px",
});

const accordionItemStyles = css({
  "&:not(:last-child)": { borderBottomWidth: "1px" },
  "&:where([data-state='open'], [data-open]:not([data-open='false']))": { bg: "muted/50" },
});

const accordionHeaderStyles = css({ display: "flex" });

const accordionTriggerStyles = css({
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
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",
  outline: "none",
  _hover: { textDecoration: "underline" },
  "&[aria-disabled='true']": { pointerEvents: "none", opacity: "0.5" },
  "& [data-slot='accordion-trigger-icon']": {
    ml: "auto",
    size: "4",
    color: "muted.foreground",
  },
});

const accordionTriggerIconDownStyles = css({
  pointerEvents: "none",
  flexShrink: "0",
  "[data-slot='accordion-trigger'][aria-expanded='true'] &": { display: "none" },
});

const accordionTriggerIconUpStyles = css({
  pointerEvents: "none",
  display: "none",
  flexShrink: "0",
  "[data-slot='accordion-trigger'][aria-expanded='true'] &": { display: "inline" },
});

const accordionContentPanelStyles = css({
  overflow: "hidden",
  px: "4",
  fontSize: "sm",
  "&[data-open]": {
    animationName: "accordionDown",
    animationDuration: "0.2s",
    animationTimingFunction: "ease-out",
  },
  "&[data-closed]": {
    animationName: "accordionUp",
    animationDuration: "0.2s",
    animationTimingFunction: "ease-out",
  },
});

const accordionContentInnerStyles = css({
  height: "var(--accordion-panel-height)",
  pt: "0",
  pb: "4",
  "&[data-ending-style]": { height: "0" },
  "&[data-starting-style]": { height: "0" },
  "& a": { textDecoration: "underline", textUnderlineOffset: "3px" },
  "& a:hover": { color: "foreground" },
  "& p:not(:last-child)": { mb: "4" },
});

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={clsx(accordionStyles, className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={clsx(accordionItemStyles, className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className={accordionHeaderStyles}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={clsx(accordionTriggerStyles, className)}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className={accordionTriggerIconDownStyles}
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className={accordionTriggerIconUpStyles}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={accordionContentPanelStyles}
      {...props}
    >
      <div className={clsx(accordionContentInnerStyles, className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
