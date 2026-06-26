import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import type { DateRange } from "react-day-picker";
import { css } from "@zero-app/styled-system/css";

import { Calendar } from "./calendar";

const bordered = css({ rounded: "2xl", borderWidth: "1px" });

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} className={bordered} />;
  },
};

export const Range: Story = {
  render: () => {
    const [range, setRange] = React.useState<DateRange | undefined>(() => {
      const from = new Date();
      const to = new Date();
      to.setDate(to.getDate() + 5);
      return { from, to };
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        className={bordered}
      />
    );
  },
};

export const WithDropdowns: Story = {
  render: () => {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        className={bordered}
      />
    );
  },
};
