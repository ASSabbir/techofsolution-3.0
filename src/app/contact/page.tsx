import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import FlightPath from "@/components/FlightPath";
import FloatingGlow from "@/components/FloatingGlow";
import { site } from "@/lib/data/site";
import ContactMap from "@/components/ContactMap";

export const metadata: Metadata = {
  title: "Contact Us — Start Your Project",
  description:
    "Get in touch with TechOf Solution to discuss your website, software or AI/ML project. We typically respond within 24 hours.",
  alternates: { canonical: "/contact" },
};

const details = [
  { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: site.phoneDisplay, href: `tel:${site.phone}` },
  { icon: MapPin, label: `${site.address.locality}, ${site.address.country}`, href: undefined },
];

export default function ContactPage() {
  return (
    <section className="section-light">
      <PageHeader
        eyebrow="Contact"
        title="Let's discuss your project."
        description="Tell us what you're building. We'll reply within 24 hours with next steps."
      />

      <section className="content-shell relative grid gap-12 overflow-hidden pb-24 md:grid-cols-[1fr_1.3fr] md:pb-32">
        {/* <FloatingGlow className="left-[-10%] top-10 h-72 w-72" /> */}

        <Reveal className="relative space-y-8">
          <div className="space-y-4">
            {details.map(({ icon: Icon, label, href }) =>
              href ? (
                <a key={label} href={href} className="flex items-center gap-3 text-fg-dim transition-colors hover:text-fg">
                  <Icon size={18} className="text-accent" />
                  {label}
                </a>
              ) : (
                <p key={label} className="flex items-center gap-3 text-fg-dim">
                  <Icon size={18} className="text-accent" />
                  {label}
                </p>
              )
            )}
          </div>
          <ContactMap
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d948.7973103248668!2d90.37275936277577!3d23.753752488542258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf0014bff83d%3A0x4f67a47d68e4fb73!2sLabcom%20Technology!5e0!3m2!1sen!2sbd!4v1789083475852!5m2!1sen!2sbd"
            className="h-64 md:h-80"
          />
        </Reveal>

        <Reveal className="relative">
          <ContactForm />
        </Reveal>
      </section>
    </section>
  );
}
