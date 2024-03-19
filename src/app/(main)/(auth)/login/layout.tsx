import "../../../globals.css";

export default function AuthLayout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className="w-screen h-screen flex justify-center bg-gradient">
      {children}
    </div>
  );
}
