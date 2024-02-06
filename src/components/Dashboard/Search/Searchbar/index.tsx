type SearchbarProps = {
  validation?: any;
};

export const Searchbar = ({ validation }: SearchbarProps) => {
  return (
    <input
      type="text"
      autoComplete="off"
      placeholder="Buscar"
      className="w-full p-4 rounded-md"
      {...validation}
    />
  );
};
