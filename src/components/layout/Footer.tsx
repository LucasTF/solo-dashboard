const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-300 dark:bg-zinc-800 py-4 text-center font-semibold md:hidden">
      <p>Solo Engenharia Ltda. &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
