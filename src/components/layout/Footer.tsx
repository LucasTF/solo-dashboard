const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bar-gradient py-4 text-center text-white font-semibold select-none md:hidden">
      <p>Solo Engenharia Ltda. &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
