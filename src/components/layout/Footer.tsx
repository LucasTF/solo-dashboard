const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="md:invisible bg-bar-gradient py-4 text-center text-white font-semibold select-none">
      <p>Solo Engenharia Ltda. &copy; {currentYear}</p>
    </footer>
  );
};

export default Footer;
