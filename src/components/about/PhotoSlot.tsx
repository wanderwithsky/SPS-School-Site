import { cn } from "@/lib/utils";

/**
 * Elegant placeholder for future school photography.
 * To use a real photo later, pass `src` — nothing else needs to change.
 */
export function PhotoSlot({
  label,
  className,
  src,
  alt,
  ratio = "aspect-[4/3]",
}: {
  label: string;
  className?: string;
  src?: string;
  alt?: string;
  ratio?: string;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-secondary",
        ratio,
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt={alt ?? label}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder for ${label.toLowerCase()} photograph`}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,color-mix(in_oklab,var(--secondary)_88%,var(--primary)_12%),var(--secondary))] p-6 text-center"
        >
          <span
            aria-hidden="true"
            className="absolute inset-3 rounded-xl border border-dashed border-accent/40"
          />
          <span className="font-serif text-2xl text-primary/40">SPS</span>
          <span className="text-[11px] font-semibold tracking-[0.3em] text-muted-foreground uppercase">
            {label}
          </span>
          <span className="text-[10px] tracking-[0.22em] text-muted-foreground/70 uppercase">
            Photo coming soon
          </span>
        </div>
      )}
    </div>
  );
}
