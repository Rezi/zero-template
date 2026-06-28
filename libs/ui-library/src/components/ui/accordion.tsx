import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { accordion } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={clsx(accordion().root, className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={clsx(accordion().item, className)}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className={accordion().header}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={clsx(accordion().trigger, className)}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className={accordion().triggerIconDown}
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className={accordion().triggerIconUp}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={accordion().contentPanel}
      {...props}
    >
      <div className={clsx(accordion().contentInner, className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
