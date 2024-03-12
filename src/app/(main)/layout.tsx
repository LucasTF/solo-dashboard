import { Inter } from "next/font/google";
import "react-toastify/dist/ReactToastify.css";
import "../globals.css";
import { ToastContainer } from "react-toastify";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export default function MainAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className + " " + "bg-slate-200 dark:bg-gray-900"}>
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
