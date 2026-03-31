"use client";

export type IntroCelebrationBannerProps = {
  colors?: string[];
};

export function IntroCelebrationBanner({ colors }: IntroCelebrationBannerProps) {
  const swatches = colors?.length
    ? colors
    : ["#ef4444", "#f97316", "#fbbf24", "#22c55e", "#3b82f6"];

  return (
    <div className="relative flex items-center justify-center scale-75 sm:scale-100">
      <div className="flex gap-0.5 sm:gap-1">
        {swatches.map((color, index) => (
          <span
            key={`${color}-${index}`}
            className="block h-3 sm:h-4 w-5 sm:w-7 origin-top skew-y-[12deg] rounded-b-sm"
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-3 sm:top-4 h-[1px] sm:h-[2px] bg-slate-300/60" />
    </div>
  );
}
