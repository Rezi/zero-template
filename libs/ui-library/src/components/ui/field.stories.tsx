import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "./field";
import { Input } from "./input";

const meta = {
  title: "Components/Field",
  component: Field,
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

const w80 = css({ w: "80" });

export const Default: Story = {
  render: () => (
    <Field className={w80}>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input id="email" type="email" placeholder="you@example.com" />
      <FieldDescription>We'll never share your email with anyone.</FieldDescription>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field className={w80} data-invalid="true">
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input id="password" type="password" aria-invalid defaultValue="123" />
      <FieldError>Password must be at least 8 characters.</FieldError>
    </Field>
  ),
};

export const FieldSetGroup: Story = {
  render: () => (
    <FieldSet className={w80}>
      <FieldLegend>Shipping address</FieldLegend>
      <FieldDescription>Where should we send your order?</FieldDescription>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="street">Street</FieldLabel>
          <Input id="street" placeholder="123 Main St" />
        </Field>
        <Field>
          <FieldLabel htmlFor="city">City</FieldLabel>
          <Input id="city" placeholder="Springfield" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
};
