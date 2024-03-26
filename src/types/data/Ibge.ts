export type UF = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    nome: string;
    sigla: string;
  };
};

export type Municipio = {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
    mesorregiao: {
      id: number;
      nome: string;
      UF: UF;
    };
  };
};
