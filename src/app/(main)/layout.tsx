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
      <body
        className={
          inter.className +
          " " +
          "bg-gradient-to-b from-sky-700 dark:from-gray-900 from-10% via-sky-800 dark:via-gray-900 via-30% dark:via-50% to-sky-900 dark:to-gray-900 to-50% dark:to-80%"
        }
      >
        <Providers>
          {children}
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
