import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { button, type ButtonVariantProps } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & ButtonVariantProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={clsx(button({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, button as buttonVariants };
