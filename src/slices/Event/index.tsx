import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicImage, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Event`.
 */
export type EventProps = SliceComponentProps<Content.EventSlice>;

/**
 * Component for "Event" Slices.
 */
const Event: FC<EventProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >

      <h1>{slice.primary.title}</h1>
      <pre>
        {JSON.stringify(slice, null, 2)}
      </pre>
      <PrismicImage field={slice.primary.image} />
    </section>
  );
};

export default Event;
