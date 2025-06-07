"use client";
import { PortableText } from "@portabletext/react";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "./Link.astro";
import { AsciiText } from "./AsciiText";
import type { PortableTextBlock } from "sanity";

interface Item {
  title: string;
  text: PortableTextBlock;
  iconText?: { code: string };
}

interface SectionProps {
  data: {
    layout: "cards" | "rows";
    title?: string;
    headline?: string;
    text?: PortableTextBlock;
    items: Item[];
    link?: {
      url: string;
      label: string;
    };
  };
}

const SectionCardsDefault: React.FC<SectionProps> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    dragFree: false,
    align: "start",
  });

  const [hasPrev, setHasPrev] = useState(false);
  const [hasNext, setHasNext] = useState(false);

  const updateButtons = useCallback(() => {
    if (!emblaApi) return;
    setHasPrev(emblaApi.canScrollPrev());
    setHasNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", updateButtons);
    updateButtons();
  }, [emblaApi, updateButtons]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="overflow-hidden">
      <div className="grid gap-4 overflow-visible lg:gap-8">
        <div className="container mx-auto flex flex-col items-start gap-2 px-4 md:px-6">
          {data.title && <h3 className="mono opacity-50">{data.title}</h3>}
          {data.headline && <h4 className="t-2">{data.headline}</h4>}
        </div>

        <div className="container mx-auto grid gap-y-8 lg:grid-cols-4">
          {data.text && (
            <div className="relative z-10 flex flex-col justify-between gap-6 bg-white px-4 md:px-6">
              <div className="max-w-lg">
                <PortableText value={data?.text} />
                {data.link && <Link classes="mt-4" link={data.link} />}
              </div>
              <div className="hidden lg:block">
                <Navigation
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                  scrollPrev={scrollPrev}
                  scrollNext={scrollNext}
                />
              </div>
            </div>
          )}

          <div
            className={`relative lg:col-span-3 ${data.text ? "lg:col-span-3" : "lg:col-span-4"} overflow-hidden`}
          >
            <div className="embla" ref={emblaRef}>
              <div className="embla__container flex">
                {data.items?.map((item, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col gap-12 p-4 md:p-6 lg:gap-16 ${
                      index % 2 === 0
                        ? "bg-neutral-200/60"
                        : "bg-neutral-200/30"
                    } flex-[0_0_100%] sm:flex-[0_0_50%] ${data.text ? "md:flex-[0_0_33.33%]" : "lg:flex-[0_0_25%]"}`}
                  >
                    {item.iconText && (
                      <div className="code max-w-32 text-[.6rem] leading-[1]">
                        {/* <code className="">{item.iconText?.code}</code> */}
                        <AsciiText
                          classes="text-[.6rem] leading-[1]"
                          data={item.iconText}
                          delay={100}
                        />
                      </div>
                    )}
                    <div
                      className={`${item.iconText ? "" : "flex flex-col justify-between gap-32"}`}
                    >
                      <span className="mono flex items-center gap-2">
                        <span className="bg-primary block h-2 w-2" />
                        {(index + 1).toLocaleString("en-US", {
                          minimumIntegerDigits: 2,
                          useGrouping: false,
                        })}
                      </span>
                      <div>
                        <h3 className="t-3 mt-2">{item.title}</h3>
                        <div className="mt-4">
                          <PortableText value={item.text} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`mt-4 px-4 md:px-6 ${data.text ? "lg:hidden" : ""}`}
              >
                <Navigation
                  hasPrev={hasPrev}
                  hasNext={hasNext}
                  scrollPrev={scrollPrev}
                  scrollNext={scrollNext}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionCardsDefault;

function Navigation({
  hasPrev,
  hasNext,
  scrollNext,
  scrollPrev,
}: {
  hasPrev: boolean;
  hasNext: boolean;
  scrollPrev: () => void | undefined;
  scrollNext: () => void | undefined;
}) {
  return (
    <div>
      {hasPrev || hasNext ? (
        <div className="flex items-center gap-1 pb-1">
          <button
            className="pill h-8 w-8 cursor-pointer disabled:cursor-default disabled:opacity-30"
            onClick={scrollPrev}
            disabled={!hasPrev}
          >
            ←
          </button>

          <button
            className="pill h-8 w-8 cursor-pointer disabled:cursor-default disabled:opacity-30"
            onClick={scrollNext}
            disabled={!hasNext}
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
