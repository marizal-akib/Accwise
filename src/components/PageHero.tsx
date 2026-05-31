import { AnimatedWaveDivider } from "@/components/AnimatedWaveDivider";

type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  image?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "simple" | "image";
};

export function PageHero({
  title,
  description,
  eyebrow,
  image,
  actions,
  children,
  variant = "simple",
}: PageHeroProps) {
  if (variant === "image") {
    return (
      <section
        className="relative flex min-h-[570px] items-center overflow-hidden bg-accwise-navy bg-cover bg-center px-5 pb-28 pt-32 text-white sm:min-h-[620px] sm:px-6 lg:px-8"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(22,37,66,0.92), rgba(33,75,112,0.68), rgba(22,37,66,0.5)), url(${image})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(47,111,53,0.3),transparent_28%)]" />
        <div className="relative mx-auto w-full max-w-6xl">
          {eyebrow ? (
            <p className="inline-flex rounded-full border border-white/16 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/76 backdrop-blur">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.03] text-white sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76 sm:text-xl sm:leading-9">
            {description}
          </p>
          {actions ? (
            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              {actions}
            </div>
          ) : null}
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
        <AnimatedWaveDivider variant="white" />
      </section>
    );
  }

  return (
    <section className="bg-accwise-offwhite/55">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-16 sm:px-6 lg:grid-cols-[1fr_0.7fr] lg:px-8 lg:py-20">
        <div>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-accwise-navy sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-accwise-charcoal/80">
            {description}
          </p>
        </div>
        {children ? (
          <div className="rounded-lg border border-accwise-border bg-white p-5 shadow-sm">
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
