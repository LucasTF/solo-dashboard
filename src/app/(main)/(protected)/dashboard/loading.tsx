import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <main className="h-full flex justify-center items-center">
      <Spinner size="lg" />
    </main>
  );
}
