"use client";

export type IntroCelebrationBannerProps = {
  colors?: string[];
};

export function IntroCelebrationBanner({ colors }: IntroCelebrationBannerProps) {
  const swatches = colors?.length
    ? colors
    : ["#ef4444", "#f97316", "#fbbf24", "#22c55e", "#3b82f6"];

  return (
    <div className="relative flex items-center justify-center">
      <div className="flex gap-1">
        {swatches.map((color, index) => (
          <span
            key={`${color}-${index}`}
            className="block h-4 w-7 origin-top skew-y-[12deg] rounded-b-sm"
            style={{ background: color }}
          />
        ))}
      </div>
      <div className="absolute inset-x-0 top-4 h-[2px] bg-slate-300/60" />
    </div>
  );
}
