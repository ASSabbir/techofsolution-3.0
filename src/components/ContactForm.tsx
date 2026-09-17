"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6 rounded-lg border border-line bg-surface p-8 sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-muted">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="w-full rounded-md border border-line-strong bg-ink px-4 py-3.5 text-fg placeholder-faint outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,155,74,0.15)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-muted">
            Your email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full rounded-md border border-line-strong bg-ink px-4 py-3.5 text-fg placeholder-faint outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,155,74,0.15)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-muted">
          Project description
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, timeline and goals..."
          className="w-full resize-none rounded-md border border-line-strong bg-ink px-4 py-3.5 text-fg placeholder-faint outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(200,155,74,0.15)]"
        />
      </div>

      <MagneticButton strength={0.25} className="w-fit">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          {status !== "sending" && <ArrowUpRight size={16} />}
        </button>
      </MagneticButton>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm text-signal">
          <CheckCircle2 size={16} /> Thanks — we&rsquo;ll get back to you within 24 hours.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm text-red-400">
          <AlertCircle size={16} /> Something went wrong. Please email us directly instead.
        </p>
      )}
    </form>
  );
}
