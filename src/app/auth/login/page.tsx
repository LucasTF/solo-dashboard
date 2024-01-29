import Image from "next/image";
import {
  EnvelopeIcon,
  KeyIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  return (
    <div className="w-screen h-screen flex justify-center bg-sky-900">
      <main className="md:w-96 my-auto bg-slate-200 rounded-md shadow-xl">
        <div className="bg-slate-300 text-center mb-4 border-b-2 border-solid border-slate-400 px-8 py-4 rounded-t-md">
          <Image
            src="/img/solo-logo.png"
            alt="Solo"
            width="128"
            height="128"
            className="mx-auto my-2"
            priority
          />
          <h3 className="font-bold">Bem-Vindo</h3>
        </div>

        <form className="flex flex-col gap-2 px-8 pt-4 pb-8">
          <label htmlFor="emailField" className="font-bold flex gap-2">
            <EnvelopeIcon className="w-5 h-5" />
            <span>Email</span>
          </label>
          <input className="rounded-md p-2" id="emailField" type="email" />

          <label htmlFor="passwordField" className="font-bold mt-4 flex gap-2">
            <KeyIcon className="w-5 h-5" />
            <span>Senha</span>
          </label>
          <input
            className="rounded-md p-2"
            id="passwordField"
            type="password"
          />

          <button
            className="bg-sky-900 text-white p-4 rounded-md flex justify-center gap-2 mt-4 ease-in-out duration-300 hover:bg-sky-800"
            type="button"
          >
            <LockOpenIcon className="w-5 h-5" />
            <span className="font-bold">Entrar</span>
          </button>
        </form>
      </main>
    </div>
  );
}
