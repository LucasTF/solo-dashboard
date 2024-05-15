export type Arquivo = {
  id: number;
  obraId: number;
  nome: string;
  formato: string;
  criado_em: Date;
  tipo: string;
  caminho: string;
};

export default Arquivo;
