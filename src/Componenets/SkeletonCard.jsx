import React from "react";

function SkeletonCard({ count = 8 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col rounded-xl overflow-hidden glass-card w-full sm:w-[13.5rem] md:w-[14.5rem] animate-pulse"
        >
          <div className="aspect-[2/3] w-full bg-slate-800/80" />
          <div className="p-3.5 flex flex-col gap-2">
            <div className="h-4 bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-800/60 rounded w-1/2" />
            <div className="flex gap-1 mt-1">
              <div className="h-4 bg-slate-800/50 rounded-full w-12" />
              <div className="h-4 bg-slate-800/50 rounded-full w-14" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default SkeletonCard;
