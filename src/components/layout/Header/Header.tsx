const Header = () => {
  return (
    <header className="py-4 flex justify-around bg-slate-200 sticky top-0 left-0">
      <h1 className="font-bold">Solo Dashboard</h1>
      <nav className="flex gap-4">
        <a href="#">Clientes</a>
        <a href="#">Obras Executadas</a>
        <a href="#">Orçamentos</a>
        <a href="#">Histórico</a>
      </nav>
    </header>
  );
};
export default Header;
