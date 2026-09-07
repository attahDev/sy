export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0D1B3E]">
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#FFD700]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#FFD700] [animation-delay:0.15s]" />
        <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#FFD700] [animation-delay:0.3s]" />
      </div>
    </div>
  );
}