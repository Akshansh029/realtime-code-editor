import Favicon from "./Favicon";

export default function Logo({ className = "", iconSize = 40 }) {
  return (
    <div className={`flex items-center gap-2 ${className} h-[80px] mb-2`}>
      <Favicon size={iconSize} />
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-white">CodeChime</h1>
        <p className="text-sm text-blue-400 font-mono">
          Code together, build better
        </p>
      </div>
    </div>
  );
}
