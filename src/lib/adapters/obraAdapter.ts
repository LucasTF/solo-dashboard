import { Arquivo } from "@/types/data/Arquivo";
import { Obra, ObraWithFiles } from "@/types/data/Obra";

export type LegacyDbObra = {
  codobra: number;
  codprop?: string | null;
  nomeobra: string;
  numobra?: number | null;
  anoobra: number;
  datainiobra?: string | null;
  datafimobra?: string | null;
  tipologobra?: string | null;
  logradouroobra?: string | null;
  loteobra?: string | null;
  quadraobra?: string | null;
  numlogobra?: string | null;
  cidadeobra?: string | null;
  bairroobra?: string | null;
  ufobra?: string | null;
  cepobra?: string | null;
  complelogobra?: string | null;
  SPSondagem?: number | null;
  MetrosSPSondagem?: number | null;
  SRSondagem?: string | null;
  MetrosSRSolo?: string | null;
  MetrosSRRocha?: string | null;
  RBPonteiras?: string | null;
  RBEquipamentos?: string | null;
  RBDataInicial?: string | null;
  RBDataTermino?: string | null;
  TITirantes?: string | null;
  TipoTirantes?: string | null;
  CargaTirantes?: string | null;
  MicroEstaca1?: string | null;
  MicroEstaca2?: string | null;
  MicroEstaca3?: string | null;
  TBTubulao?: string | null;
  TBCotaApoio?: string | null;
  TBCotaApoioA?: string | null;
  TBTaxaSolo?: string | null;
  STTrado?: number | null;
  STTradoml?: number | null;
  cliente: string;
  proprietario?: string | null;
};

export type LegacyDbObraWithFiles = LegacyDbObra & {
  arquivos: Arquivo[];
};

export function adaptToObra(obra: LegacyDbObra): Obra {
  return {
    id: obra.codobra,
    cod_prop: obra.codprop,
    sp: obra.nomeobra,
    num_obra: obra.numobra,
    ano: obra.anoobra,
    data_inicio: obra.datainiobra,
    data_fim: obra.datafimobra,
    tipo_logo: obra.tipologobra || "",
    logradouro: obra.logradouroobra || "",
    lote: obra.loteobra,
    quadra: obra.quadraobra,
    num_logo: obra.numlogobra,
    cidade: obra.cidadeobra || "",
    bairro: obra.bairroobra || "",
    uf: obra.ufobra || "",
    cep: obra.cepobra,
    complemento_logo: obra.complelogobra,
    sp_sondagem: obra.SPSondagem,
    metros_sp_sondagem: obra.MetrosSPSondagem,
    sr_sondagem: obra.SRSondagem,
    metros_sr_solo: obra.MetrosSRSolo,
    metros_sr_rocha: obra.MetrosSRRocha,
    rb_ponteiras: obra.RBPonteiras,
    rb_equipamentos: obra.RBEquipamentos,
    rb_data_inicial: obra.RBDataInicial,
    rb_data_termino: obra.RBDataTermino,
    TITirantes: obra.TITirantes,
    tipo_tirantes: obra.TipoTirantes,
    carga_tirantes: obra.CargaTirantes,
    micro_estaca_1: obra.MicroEstaca1,
    micro_estaca_2: obra.MicroEstaca2,
    micro_estaca_3: obra.MicroEstaca3,
    tb_tubulao: obra.TBTubulao,
    tb_cota_apoio: obra.TBCotaApoio,
    tb_cota_apoio_A: obra.TBCotaApoioA,
    tb_taxa_solo: obra.TBTaxaSolo,
    STTrado: obra.STTrado,
    STTradoml: obra.STTradoml,
    proprietario: obra.proprietario,
    cliente: obra.cliente,
  };
}

export function adaptToObraWithFiles(
  obra: LegacyDbObraWithFiles
): ObraWithFiles {
  return {
    id: obra.codobra,
    cod_prop: obra.codprop,
    sp: obra.nomeobra,
    num_obra: obra.numobra,
    ano: obra.anoobra,
    data_inicio: obra.datainiobra,
    data_fim: obra.datafimobra,
    tipo_logo: obra.tipologobra || "",
    logradouro: obra.logradouroobra || "",
    lote: obra.loteobra,
    quadra: obra.quadraobra,
    num_logo: obra.numlogobra,
    cidade: obra.cidadeobra || "",
    bairro: obra.bairroobra || "",
    uf: obra.ufobra || "",
    cep: obra.cepobra,
    complemento_logo: obra.complelogobra,
    sp_sondagem: obra.SPSondagem,
    metros_sp_sondagem: obra.MetrosSPSondagem,
    sr_sondagem: obra.SRSondagem,
    metros_sr_solo: obra.MetrosSRSolo,
    metros_sr_rocha: obra.MetrosSRRocha,
    rb_ponteiras: obra.RBPonteiras,
    rb_equipamentos: obra.RBEquipamentos,
    rb_data_inicial: obra.RBDataInicial,
    rb_data_termino: obra.RBDataTermino,
    TITirantes: obra.TITirantes,
    tipo_tirantes: obra.TipoTirantes,
    carga_tirantes: obra.CargaTirantes,
    micro_estaca_1: obra.MicroEstaca1,
    micro_estaca_2: obra.MicroEstaca2,
    micro_estaca_3: obra.MicroEstaca3,
    tb_tubulao: obra.TBTubulao,
    tb_cota_apoio: obra.TBCotaApoio,
    tb_cota_apoio_A: obra.TBCotaApoioA,
    tb_taxa_solo: obra.TBTaxaSolo,
    STTrado: obra.STTrado,
    STTradoml: obra.STTradoml,
    proprietario: obra.proprietario,
    cliente: obra.cliente,
    arquivos: obra.arquivos,
  };
}
