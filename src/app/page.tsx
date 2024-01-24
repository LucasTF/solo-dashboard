import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import Pagination from "@/components/Pagination/Pagination";

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />

      <main className="">
        <h1 className="font-bold text-4xl w-4/5 mx-auto my-4">Clientes</h1>
        <section className="p-8 bg-slate-200 w-4/5 mx-auto rounded-md">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full p-4 rounded-md"
          />
          <div className="overflow-x-auto">
            <table className="w-full max-w-full">
              <thead>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Col 1
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Col 2
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                >
                  Col 3
                </th>
              </thead>
              <tbody>
                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800 hover:bg-gray-200 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border-r-[1px] border-solid border-slate-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque corporis sapiente dolor eius fuga quos harum maxime
                    non natus temporibus!
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    Lorem ipsum dolor sit amet.
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border-r-[1px] border-solid border-slate-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque corporis sapiente dolor eius fuga quos harum maxime
                    non natus temporibus!
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    Lorem ipsum dolor sit amet.
                  </td>
                </tr>
                <tr className="odd:bg-white even:bg-gray-100 dark:odd:bg-slate-900 dark:even:bg-slate-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200 border-r-[1px] border-solid border-slate-200">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Itaque corporis sapiente dolor eius fuga quos harum maxime
                    non natus temporibus!
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                    Lorem ipsum dolor sit amet.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Pagination />

          <div className="flex flex-row-reverse">
            <button
              type="button"
              className="bg-green-700 hover:bg-green-600 font-semibold text-white p-4 rounded-md"
            >
              + Nova Inserção
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
