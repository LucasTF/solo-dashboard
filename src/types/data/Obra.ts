import { Arquivo } from "./Arquivo";

export type Obra = {
  id: number;
  cod_prop?: string;
  sp?: string;
  num_obra?: number;
  ano?: number;
  data_inicio?: string;
  data_fim?: string;
  tipo_logo?: string;
  logradouro?: string;
  lote?: string;
  quadra?: string;
  num_logo?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  complemento_logo?: string;
  sp_sondagem?: number;
  metros_sp_sondagem?: number;
  sr_sondagem?: string;
  metros_sr_solo?: string;
  metros_sr_rocha?: string;
  rb_ponteiras?: string;
  rb_equipamentos?: string;
  rb_data_inicial?: string;
  rb_data_termino?: string;
  TITirantes?: string;
  tipo_tirantes?: string;
  carga_tirantes?: string;
  micro_estaca_1?: string;
  micro_estaca_2?: string;
  micro_estaca_3?: string;
  tb_tubulao?: string;
  tb_cota_apoio?: string;
  tb_cota_apoio_A?: string;
  tb_taxa_solo?: string;
  STTrado?: number;
  STTradoml?: number;
  proprietario?: string;
  cliente?: string;
};

export type ObraWithFiles = Obra & {
  arquivos: Arquivo[];
};
