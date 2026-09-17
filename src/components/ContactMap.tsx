export default function ContactMap({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-line ${className}`}
    >
      <iframe
        title="Our location"
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: 280 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}