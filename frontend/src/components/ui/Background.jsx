export default function Background() {
  return (
    <>
      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[300px] bg-violet-700/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="fixed bottom-0 right-1/4 w-[500px] h-[250px] bg-cyan-700/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </>
  );
}