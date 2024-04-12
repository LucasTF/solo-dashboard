import { Dashboard } from "@/components/Dashboard";

type EditObraHeaderProps = {
  codObra: string;
};

export const EditObraHeader = ({ codObra }: EditObraHeaderProps) => {
  return <Dashboard.Header.Base title={`Obra ${codObra} - Edição`} />;
};
