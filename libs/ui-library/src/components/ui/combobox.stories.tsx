import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { css } from "@zero-app/styled-system/css";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
} from "@zero-app/ui-library";

const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro", "Gatsby"];

const meta = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

const w64 = css({ w: "64" });

export const Default: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select framework..." className={w64} />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>("Astro");
    return (
      <div className={css({ "& > * + *": { mt: "3" } })}>
        <Combobox items={frameworks} value={value} onValueChange={setValue}>
          <ComboboxInput placeholder="Select framework..." className={w64} />
          <ComboboxContent>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            <ComboboxList>
              {(item: string) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
        <p className={css({ fontSize: "sm", color: "muted.foreground" })}>Selected: {value ?? "none"}</p>
      </div>
    );
  },
};

export const Grouped: Story = {
  render: () => (
    <Combobox items={frameworks}>
      <ComboboxInput placeholder="Select framework..." className={w64} />
      <ComboboxContent>
        <ComboboxEmpty>No framework found.</ComboboxEmpty>
        <ComboboxList>
          <ComboboxGroup>
            <ComboboxLabel>Frameworks</ComboboxLabel>
            {frameworks.map((item) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            ))}
          </ComboboxGroup>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
};
