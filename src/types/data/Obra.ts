import { Arquivo } from "./Arquivo";

export type Obra = {
  id: number;
  cod_prop?: string | null;
  sp: string;
  num_obra?: number | null;
  ano: number;
  data_inicio?: string | null;
  data_fim?: string | null;
  tipo_logo: string;
  logradouro: string;
  lote?: string | null;
  quadra?: string | null;
  num_logo?: string | null;
  bairro: string;
  cidade: string;
  uf: string;
  cep?: string | null;
  complemento_logo?: string | null;
  sp_sondagem?: number | null;
  metros_sp_sondagem?: number | null;
  sr_sondagem?: string | null;
  metros_sr_solo?: string | null;
  metros_sr_rocha?: string | null;
  rb_ponteiras?: string | null;
  rb_equipamentos?: string | null;
  rb_data_inicial?: string | null;
  rb_data_termino?: string | null;
  TITirantes?: string | null;
  tipo_tirantes?: string | null;
  carga_tirantes?: string | null;
  micro_estaca_1?: string | null;
  micro_estaca_2?: string | null;
  micro_estaca_3?: string | null;
  tb_tubulao?: string | null;
  tb_cota_apoio?: string | null;
  tb_cota_apoio_A?: string | null;
  tb_taxa_solo?: string | null;
  STTrado?: number | null;
  STTradoml?: number | null;
  cliente: string;
  proprietario?: string | null;
};

export type ObraWithFiles = Obra & {
  arquivos: Arquivo[];
};
