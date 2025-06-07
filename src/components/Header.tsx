import { useState } from "react";
import { AsciiText } from "./AsciiText";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "../utils/i18n";

const locales = ["en", "de", "fr", "it"];

export function Header({
  data,
  locale = "en",
  currentPath,
  translations,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  locale?: string;
  currentPath?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  translations?: any;
}) {
  const [menuOpen, setMenuOpen] = useState<boolean | null>(false);
  const [subMenu, setSubMenu] = useState<string | null>(null);
  const t = useTranslations(locale as "en" | "fr" | "it" | "de");
  function handleMenu(val: null | boolean) {
    setMenuOpen(val);

    if (subMenu) {
      setSubMenu(null);
    }
  }

  function handleSubMenu(id: string | null) {
    if (subMenu === id) {
      setSubMenu(null);
    } else {
      setSubMenu(id);
    }
  }

  const menuVariants = {
    initial: {
      height: 0,
    },
    animate: {
      height: "auto",
      transition: {
        duration: 0.3,
        ease: [0.65, 0, 0.35, 1],
        delay: 0.15,
      },
    },
    exit: {
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.65, 0, 0.35, 1],
      },
    },
  };

  return (
    <>
      <div
        onClick={() => {
          handleMenu(false);
          handleSubMenu(null);
        }}
        className={`fixed top-0 left-0 z-[99] h-screen w-screen bg-neutral-200/20 backdrop-blur-lg transition-all duration-300 ${menuOpen || subMenu ? "visibility-visible pointer-events-auto opacity-100" : "visibility-hidden pointer-events-none opacity-0"}`}
      />
      <div className="fixed top-0 left-0 z-[999] w-screen bg-white">
        <div className="container mx-auto flex flex-col items-center justify-between p-4 md:px-6 lg:flex-row">
          <div className="flex w-full items-center justify-between gap-4 lg:w-auto">
            <a
              href={`/${locale}`}
              onClick={() => {
                handleMenu(false);
                handleSubMenu(null);
              }}
            >
              <img
                src="/Logo_swiss_subnet.svg"
                width={100}
                height={29}
                alt="Logo"
                className="w-36 md:w-40 lg:w-44"
              />
            </a>
            <div className="lg:hidden">
              <button
                className="pill"
                onClick={() => {
                  handleMenu(!menuOpen);
                }}
              >
                Menu
              </button>
            </div>
          </div>
          <div
            className={`${menuOpen ? "pointer-events-auto h-[calc(100dvh-4rem)]" : "pointer-events-none h-0"} item-center w-screen overflow-hidden shadow-lg transition-all duration-500 ease-out lg:pointer-events-auto lg:h-auto lg:overflow-visible lg:shadow-none`}
          >
            <div className="flex h-[calc(100dvh-4rem)] flex-col justify-between gap-6 lg:h-auto lg:flex-row lg:justify-end">
              <div className="mt-20 flex flex-col items-center border-b-2 border-black text-3xl font-medium lg:mt-0 lg:flex-row lg:gap-6 lg:border-none lg:font-mono lg:text-sm lg:font-normal lg:uppercase">
                {// eslint-disable-next-line @typescript-eslint/no-explicit-any
                data?.map((item: any, i: number) => {
                  if (item._type === "subMenu") {
                    return (
                      <div
                        key={i}
                        className="w-full border-t-2 border-black lg:w-auto lg:border-none"
                      >
                        <button
                          onClick={() => handleSubMenu(item.title)}
                          className="group flex w-full items-center gap-4 px-4 py-2 md:px-6 md:py-4 lg:w-auto lg:gap-2 lg:px-0 lg:py-0 lg:uppercase"
                        >
                          <span
                            className={`plus bg-black ${subMenu === item.title ? "active" : ""}`}
                          />{" "}
                          <span className="transition-opacity group-hover:opacity-60">
                            {item.title}
                          </span>
                        </button>

                        <AnimatePresence>
                          {subMenu === item.title && (
                            <motion.div
                              variants={menuVariants}
                              initial="initial"
                              animate="animate"
                              exit="exit"
                              className="top-16 left-0 z-10 overflow-hidden lg:absolute lg:w-screen lg:shadow-xl"
                            >
                              <div className={`bg-white`}>
                                <div className="container mx-auto flex flex-col gap-2 px-4 pb-4 md:px-6 lg:flex-row lg:justify-end lg:gap-4 lg:pt-20 lg:pb-8">
                                  {item.menuItems?.map(
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    (subItem: any, index: number) => {
                                      if (subItem._type === "menuItem") {
                                        let href = subItem.link?.url;
                                        let target = "";
                                        let arrowText = "→";

                                        if (
                                          subItem.link?.type === "reference"
                                        ) {
                                          href = `/${subItem.link?.reference?.language ?? "en"}/${subItem.link.reference.slug.current}`;
                                        } else if (
                                          subItem.link?.type === "file"
                                        ) {
                                          href = subItem.link?.file?.asset?.url;
                                          target = "_blank";
                                          arrowText = "↗";
                                        }

                                        return (
                                          <motion.a
                                            className="group grid grow gap-16 bg-neutral-100 px-4 py-2 transition-all hover:bg-neutral-200/60 lg:flex-[0_0_25%] lg:py-4"
                                            key={index}
                                            onClick={() => {
                                              handleMenu(false);
                                              handleSubMenu(null);
                                            }}
                                            href={href}
                                            target={target}
                                          >
                                            {subItem.icon && (
                                              <div className="code hidden text-[.6rem] leading-[1] lg:block">
                                                {/* <code>{subItem.icon?.code}</code> */}
                                                <AsciiText
                                                  classes="text-[.6rem] leading-[1]"
                                                  data={subItem.icon}
                                                  delay={100}
                                                />
                                              </div>
                                            )}
                                            <div className="flex items-end justify-between gap-4 font-mono text-sm uppercase lg:font-sans lg:text-2xl lg:leading-tight lg:font-medium lg:normal-case xl:text-3xl">
                                              {subItem.link?.title}
                                              <span
                                                className={`${subItem.link?.type === "reference" ? "group-hover:translate-x-1" : "group-hover:translate-x-0.5 group-hover:translate-y-[-.112rem]"} transition-all`}
                                              >
                                                {arrowText}
                                              </span>
                                            </div>
                                          </motion.a>
                                        );
                                      } else {
                                        return (
                                          <div
                                            className="order-3 mt-4 flex grow flex-col justify-end gap-2 lg:order-none lg:mt-0 lg:items-start lg:gap-4"
                                            key={index}
                                          >
                                            <span className="max-w-sm font-sans text-sm leading-tight font-medium normal-case opacity-60 lg:text-2xl lg:opacity-100">
                                              {subItem.title}
                                            </span>
                                            <div className="hidden lg:block">
                                              <a
                                                href="https://nft.subnet.ch"
                                                target="_blank"
                                                className={`btn btn-external`}
                                              >
                                                <span className="text pill">
                                                  {t("header.launchApp")}
                                                </span>

                                                <span className="arrow pill"></span>
                                              </a>
                                            </div>
                                            <motion.a
                                              className="group grid grow gap-16 bg-neutral-100 px-4 py-2 transition-all hover:bg-neutral-200/60 lg:hidden"
                                              key={index}
                                              href="https://nft.subnet.ch"
                                              target="_blank"
                                            >
                                              <div className="flex items-end justify-between gap-4 font-mono text-sm uppercase lg:font-sans lg:text-2xl lg:leading-tight lg:font-medium lg:normal-case xl:text-3xl">
                                                {t("header.launchApp")}
                                                <span
                                                  className={`${subItem.link?.type === "reference" ? "group-hover:translate-x-1" : "group-hover:translate-x-0.5 group-hover:translate-y-[-.112rem]"} transition-all`}
                                                >
                                                  ↗
                                                </span>
                                              </div>
                                            </motion.a>
                                          </div>
                                        );
                                      }
                                    },
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  } else {
                    return (
                      <a
                        key={i}
                        onClick={() => {
                          handleMenu(false);
                          handleSubMenu(null);
                        }}
                        href={
                          item.type === "reference"
                            ? `/${item.reference?.language ?? "en"}/${item.reference?.slug?.current}`
                            : item.type === "url"
                              ? item.url
                              : item.file
                        }
                        className={`group flex w-full items-center gap-4 border-t-2 border-black px-4 py-2 whitespace-nowrap md:px-6 md:py-4 lg:w-auto lg:gap-2 lg:border-none lg:px-0 lg:py-0`}
                      >
                        <span
                          className={`${currentPath?.includes(item.reference?.slug?.current) ? "bg-primary" : ""} inline-block h-2 w-2 bg-black transition-all`}
                        />
                        <span className="transition-opacity group-hover:opacity-60">
                          {item.title}
                        </span>
                      </a>
                    );
                  }
                })}
              </div>
              <div className="flex justify-center gap-1 p-4 md:p-6 lg:p-0">
                {locales.map((l, i) => {
                  return (
                    <a
                      key={i}
                      href={translations[l]}
                      className={`${
                        locale === l
                          ? "bg-neutral-200"
                          : "bg-neutral-100 text-neutral-400 hover:bg-neutral-200 hover:text-black"
                      } mono rounded-full px-3 py-2 transition-all`}
                    >
                      {l}
                    </a>
                  );
                })}
                {/* <button className="mono rounded-full bg-neutral-200 px-3 py-2">
                  EN{" "}
                </button>
                <button className="mono group relative rounded-full bg-neutral-100 px-3 py-2 text-neutral-600">
                  FR{" "}
                  <span className="mono absolute top-10 right-0 z-[9999] translate-y-2 rounded bg-black p-2 whitespace-nowrap text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Bientôt disponible!
                  </span>
                </button>
                <button className="mono group relative rounded-full bg-neutral-100 px-3 py-2 text-neutral-600">
                  DE{" "}
                  <span className="mono absolute top-10 right-0 z-[9999] translate-y-2 rounded bg-black p-2 whitespace-nowrap text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Demnächst verfügbar!
                  </span>
                </button>
                <button className="mono group relative rounded-full bg-neutral-100 px-3 py-2 text-neutral-600">
                  IT{" "}
                  <span className="mono absolute top-10 right-0 z-[9999] translate-y-2 rounded bg-black p-2 whitespace-nowrap text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    Prossimamente disponibile!
                  </span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
