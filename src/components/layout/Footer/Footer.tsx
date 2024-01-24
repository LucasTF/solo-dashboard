const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-300 mt-auto py-4 text-center font-semibold">
      <p>Lucas Ferreira &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
