"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import photoMe from "../../photo-me.jpg";

const paragraphs = [
  "I am a backend developer with a strong focus on distributed systems and high-performance engines. Over the past several years, I worked at Huawei for 5.5 years, contributing to backend infrastructure and systems that supported real-world products used by many people.",
  "During my time at Huawei, my work was delivered across multiple products, including the Xiaoyi AI agent on Huawei smartphones and Petal Search. These experiences helped me build deep expertise in scalable backend architecture, performance optimization, and reliable system design. I enjoy solving complex engineering problems and building systems that are efficient, robust, and impactful.",
  "Outside of work, I am passionate about baking and enjoy making delicious treats such as Hokkaido milk bread, pineapple buns, and many other baked goods. I also do vlogging, where I share moments from my life, personal experiences, and things I learn along the way. For me, technology, creativity, and storytelling are all important parts of who I am.",
];

const socialLinks = [
  {
    name: "Email",
    href: "mailto:patrick_lsy@foxmail.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-.4 4.25-7.07 5.3a.88.88 0 0 1-1.06 0L4.4 8.25 5.6 6.65 12 11.45l6.4-4.8 1.2 1.6Z"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/patrick-liu-62a4363b0/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45Z"
        />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/patrickinggg",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.91c-2.78.62-3.37-1.22-3.37-1.22-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.85.09-.66.35-1.12.63-1.37-2.22-.26-4.55-1.14-4.55-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.32 9.32 0 0 1 12 6.95c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.8-4.57 5.05.36.32.68.95.68 1.92v2.81c0 .28.18.6.69.5A10.21 10.21 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
        />
      </svg>
    ),
  },
  {
    name: "CV",
    href: "/CV.pdf",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          fill="currentColor"
          d="M6 2h8l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm7 1.5V8h4.5L13 3.5ZM8 12h8v-1.5H8V12Zm0 3h8v-1.5H8V15Zm0 3h5v-1.5H8V18Z"
        />
      </svg>
    ),
  },
  {
    name: "Rednote",
    href: "https://www.xiaohongshu.com/user/profile/55b8c974c2bdeb5f90129f24",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <rect width="20" height="20" x="2" y="2" rx="5" fill="currentColor" />
        <text
          x="12"
          y="15.5"
          textAnchor="middle"
          className="fill-white text-[8px] font-bold"
        >
          RED
        </text>
      </svg>
    ),
  },
];

export default function Home() {
  const [activeParagraph, setActiveParagraph] = useState(0);
  const [mobileSection, setMobileSection] = useState(0);
  const paragraphRefs = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartY = useRef<number | null>(null);
  const wheelLocked = useRef(false);
  const mobileSectionCount = paragraphs.length + 1;

  const goToMobileSection = (direction: 1 | -1) => {
    setMobileSection((current) =>
      Math.min(Math.max(current + direction, 0), mobileSectionCount - 1),
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveParagraph(Number(visibleEntry.target.getAttribute("data-index")));
        }
      },
      { threshold: 0.6 },
    );

    paragraphRefs.current.forEach((paragraph) => {
      if (paragraph) observer.observe(paragraph);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <main
        className="photo-panel relative h-[100dvh] overflow-hidden font-sans text-zinc-950 md:hidden"
        onWheel={(event) => {
          if (wheelLocked.current || Math.abs(event.deltaY) < 30) return;

          wheelLocked.current = true;
          goToMobileSection(event.deltaY > 0 ? 1 : -1);

          window.setTimeout(() => {
            wheelLocked.current = false;
          }, 700);
        }}
        onTouchStart={(event) => {
          touchStartY.current = event.touches[0].clientY;
        }}
        onTouchEnd={(event) => {
          if (touchStartY.current === null) return;

          const distance = touchStartY.current - event.changedTouches[0].clientY;

          if (Math.abs(distance) > 45) {
            goToMobileSection(distance > 0 ? 1 : -1);
          }

          touchStartY.current = null;
        }}
      >
        <section
          className={`absolute inset-0 flex flex-col items-center justify-center gap-12 p-8 transition-opacity duration-700 ${
            mobileSection === 0 ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <div className="relative z-20 w-full max-w-xs -translate-y-10">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
              Shuye Liu / Patrick
            </p>
            <h1 className="mt-2 text-5xl font-bold tracking-tight text-zinc-950">
              Shuye Liu
            </h1>
          </div>

          <Image
            src={photoMe}
            alt="Photo of Shuye Liu"
            className="relative z-10 h-auto w-full max-w-xs -translate-y-6 object-contain shadow-xl"
            priority
          />
        </section>

        {paragraphs.map((paragraph, index) => (
          <section
            key={index}
            className={`absolute inset-0 z-10 flex items-center px-6 pb-32 pt-28 transition-opacity duration-700 ${
              mobileSection === index + 1
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <p className="text-xl leading-relaxed text-zinc-700">{paragraph}</p>
          </section>
        ))}

        {mobileSection < mobileSectionCount - 1 && (
          <div
            className="breathing-arrow pointer-events-none fixed bottom-24 left-1/2 z-30 -translate-x-1/2 text-zinc-600/60"
            aria-hidden="true"
          >
            <svg viewBox="0 0 40 32" className="h-10 w-14" fill="none">
              <path
                d="M5 8l15 8 15-8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.25"
              />
              <path
                d="M5 13l15 8 15-8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.5"
              />
              <path
                d="M5 18l15 8 15-8"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.85"
              />
            </svg>
          </div>
        )}

        <nav
          className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3"
          aria-label="Social links"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              aria-label={link.name}
              className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-zinc-950 hover:shadow-md"
            >
              {link.icon}
              <span className="pointer-events-none absolute bottom-14 whitespace-nowrap rounded-full bg-zinc-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:-translate-y-1 group-hover:opacity-100">
                {link.name}
              </span>
            </a>
          ))}
        </nav>

        <div className="fixed right-4 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
          {Array.from({ length: mobileSectionCount }).map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 rounded-full transition-all ${
                mobileSection === index ? "scale-125 bg-zinc-950" : "bg-zinc-300"
              }`}
              aria-label={`Section ${index + 1}`}
            />
          ))}
        </div>
      </main>

      <main className="subtle-pattern hidden h-screen overflow-hidden font-sans text-zinc-950 md:flex md:flex-row">
        <section className="photo-panel relative flex w-2/5 items-center justify-center p-8">
          <Image
            src={photoMe}
            alt="Photo of Shuye Liu"
            className="relative z-10 h-auto w-full max-w-sm object-contain shadow-xl"
            priority
          />
        </section>

        <section className="relative w-3/5 overflow-y-scroll scroll-smooth snap-y snap-mandatory">
          <nav className="fixed right-12 top-10 z-30 flex gap-3" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={link.name}
                className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200/80 bg-white/70 text-zinc-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:text-zinc-950 hover:shadow-md"
              >
                {link.icon}
                <span className="pointer-events-none absolute top-14 whitespace-nowrap rounded-full bg-zinc-950 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition duration-200 group-hover:translate-y-1 group-hover:opacity-100">
                  {link.name}
                </span>
              </a>
            ))}
          </nav>

          <div className="sticky top-0 z-10 px-12 pb-8 pt-40">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
              Shuye Liu / Patrick
            </p>
            <h1 className="mt-2 text-5xl font-bold tracking-tight">Shuye Liu</h1>
          </div>

          <div className="fixed right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3">
            {paragraphs.map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 rounded-full transition-all ${
                  activeParagraph === index
                    ? "scale-125 bg-zinc-950"
                    : "bg-zinc-300"
                }`}
                aria-label={`Paragraph ${index + 1}`}
              />
            ))}
          </div>

          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              ref={(element) => {
                paragraphRefs.current[index] = element;
              }}
              data-index={index}
              className="flex min-h-screen snap-start items-center px-12 pt-32"
            >
              <p className="max-w-3xl -translate-y-16 text-2xl leading-relaxed text-zinc-700">
                {paragraph}
              </p>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
