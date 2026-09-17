import Link from "next/link";
import { Facebook, Linkedin, Github, MessageCircle, ArrowUpRight } from "lucide-react";
import { site, nav } from "@/lib/data/site";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";

const socials = [
  { href: site.social.facebook, icon: Facebook, label: "Facebook" },
  { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: site.social.discord, icon: MessageCircle, label: "Discord" },
  { href: site.social.github, icon: Github, label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="content-shell py-20 md:py-28">
        <Reveal className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="text-sm text-accent">Let&rsquo;s build something</p>
            <h2 className="mt-4 text-5xl sm:text-6xl md:text-7xl font-display font-semibold text-balance">
              Have a project in mind? Let&rsquo;s talk.
            </h2>
            <MagneticButton>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02]"
              >
                Start the conversation
                <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-faint mb-4">Navigate</p>
              <ul className="space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-fg-dim hover:text-fg transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-faint mb-4">Contact</p>
              <ul className="space-y-2.5 text-sm text-fg-dim">
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-fg transition-colors">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phone}`} className="hover:text-fg transition-colors">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="text-faint">{site.address.locality}, {site.address.country}</li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs uppercase tracking-wide text-faint mb-4">Follow</p>
              <ul className="flex gap-2">
                {socials.map(({ href, icon: Icon, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line-strong text-fg-dim transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-faint sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.</p>
          <p>Designed &amp; engineered in {site.address.locality}, {site.address.country}.</p>
        </div>
      </div>
    </footer>
  );
}
