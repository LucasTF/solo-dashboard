import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <main className="h-full md:h-screen flex justify-center items-center">
      <Spinner size="lg" />
    </main>
  );
}
