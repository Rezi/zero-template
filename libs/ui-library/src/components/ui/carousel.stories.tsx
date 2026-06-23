import type { Meta, StoryObj } from "@storybook/react-vite";
import { css } from "@zero-app/styled-system/css";

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@zero-app/ui-library";

const meta = {
  title: "Components/Carousel",
  component: Carousel,
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
  },
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const slides = [1, 2, 3, 4, 5];

const px12 = css({ px: "12" });
const cardContentSquare = css({
  display: "flex",
  aspectRatio: "square",
  alignItems: "center",
  justifyContent: "center",
  p: "6",
});

export const Default: Story = {
  render: (args) => (
    <div className={px12}>
      <Carousel {...args} className={css({ w: "64" })}>
        <CarouselContent>
          {slides.map((n) => (
            <CarouselItem key={n}>
              <Card>
                <CardContent className={cardContentSquare}>
                  <span className={css({ fontSize: "4xl", fontWeight: "semibold" })}>{n}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const MultipleItems: Story = {
  render: (args) => (
    <div className={px12}>
      <Carousel {...args} opts={{ align: "start" }} className={css({ w: "80" })}>
        <CarouselContent>
          {slides.map((n) => (
            <CarouselItem key={n} className={css({ flexBasis: "33.333333%" })}>
              <Card>
                <CardContent className={cardContentSquare}>
                  <span className={css({ fontSize: "2xl", fontWeight: "semibold" })}>{n}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className={css({ py: "12" })}>
      <Carousel {...args} className={css({ w: "64" })}>
        <CarouselContent className={css({ h: "64" })}>
          {slides.map((n) => (
            <CarouselItem key={n} className={css({ flexBasis: "50%" })}>
              <Card>
                <CardContent
                  className={css({
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: "6",
                  })}
                >
                  <span className={css({ fontSize: "3xl", fontWeight: "semibold" })}>{n}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
