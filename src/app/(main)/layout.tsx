import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={
          inter.className +
          " " +
          "bg-gradient-to-b from-sky-700 from-10% via-sky-800 via-30% to-sky-900 to-50%"
        }
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
