import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { uiSwitch as switchRecipeFn } from "@zero-app/styled-system/recipes";

import { clsx } from "clsx";

function Switch({
  className,
  size = "default",
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: "sm" | "default";
}) {
  const styles = switchRecipeFn();
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={clsx("peer", styles.root, className)}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" className={styles.thumb} />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
