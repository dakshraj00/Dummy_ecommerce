
export default function Spinner({ className = "w-4 h-4 border-black/30 border-t-black" }) {
  return (
    <span className={`rounded-full border-2 animate-spin inline-block ${className}`} />
  );
}