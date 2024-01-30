import Databoard from "@/components/Databoard/Databoard";

export default function Dashboard() {
  return (
    <div className="my-8">
      <h1 className="font-bold text-4xl w-11/12 lg:w-4/5 mx-auto mb-8 text-white">
        Clientes
      </h1>

      <main className="p-8 bg-slate-200 w-11/12 lg:w-4/5 mx-auto rounded-md shadow-lg">
        <Databoard />
      </main>
    </div>
  );
}
