export default function AmbientGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-[-10%] top-1/2 h-[70%] w-[55%] -translate-y-1/2 blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(200,155,74,0.08) 0%, rgba(200,155,74,0.03) 35%, transparent 70%)",
      }}
    />
  );
}