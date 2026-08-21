import { nav, socials, studio } from "@/data/studio";
import { ArrowLink, LineReveal } from "./primitives";

export function Footer() {
  return (
    <footer className="grain border-t border-border px-5 pb-10 pt-24 sm:px-8 lg:px-14">
      <h2 className="display-xl text-[16vw] leading-[0.84] lg:text-[11vw]">
        <LineReveal lines={[<>Let's make</>, <>something</>, <>
          <span className="text-accent">good.</span>
        </>]} />
      </h2>

      <div className="mt-12 border-b border-border pb-12">
        <ArrowLink href="#contact" variant="outline">
          Start a project
        </ArrowLink>
      </div>

      <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <nav aria-label="Footer">
          <h3 className="label-meta">Menu</h3>
          <ul className="mt-4 space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  data-cursor="link"
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="label-meta">Elsewhere</h3>
          <ul className="mt-4 space-y-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor="link"
                  className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="label-meta">Contact</h3>
          <a
            href={`mailto:${studio.email}`}
            data-cursor="link"
            className="link-underline mt-4 inline-block text-sm text-accent"
          >
            {studio.email}
          </a>
        </div>

        <div>
          <h3 className="label-meta">Location</h3>
          <p className="mt-4 text-sm text-muted-foreground">{studio.location}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <p className="label-meta">
          © {studio.year} {studio.fullName}
        </p>
        <p className="label-meta">Built with intention.</p>
      </div>
    </footer>
  );
}
