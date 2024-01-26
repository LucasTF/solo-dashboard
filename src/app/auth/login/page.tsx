export default function Login() {
  return (
    <div className="w-screen h-screen flex justify-center bg-sky-900">
      <main className="md:w-96 my-auto bg-slate-200 rounded-md shadow-xl">
        <div className="text-center mb-4 border-b-2 border-solid border-slate-300 px-8 py-4">
          <h1 className="font-bold text-4xl">Solo</h1>
          <p>Login</p>
        </div>
        <form className="flex flex-col gap-2 px-8 pt-4 pb-8">
          <label htmlFor="emailField">Email</label>
          <input className="rounded-md p-2" id="emailField" type="text" />

          <label htmlFor="passwordField">Senha</label>
          <input className="rounded-md p-2" id="passwordField" type="text" />

          <button
            className="bg-sky-900 text-white p-2 rounded-md mt-4 hover:bg-sky-800"
            type="button"
          >
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}
