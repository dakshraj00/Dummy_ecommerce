import { API } from "../../utils/api";

export default function AppHeader() {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400 mb-1">
          ⬡ nerf_ecom / command center
        </p>
        <h1 className="text-5xl font-black tracking-tight leading-none">
          MAZE
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-rose-400 to-violet-400">
            {" "}OPS
          </span>
        </h1>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1">
        <p className="text-[10px] text-white/20 tracking-widest uppercase">Backend</p>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-semibold">FastAPI · {API}</span>
        </div>
      </div>
    </div>
  );
}