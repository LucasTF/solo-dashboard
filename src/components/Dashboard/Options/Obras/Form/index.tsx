import Button from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

import { Logradouro } from "@/enums/Logradouro";

type UF = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    nome: string;
    sigla: string;
  };
};

type Municipio = {
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

async function getUFs() {
  const res = await fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
  );
  return res.json();
}

async function getMunicipios(uf: string) {
  const res = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );
  return res.json();
}

export const NewObraForm = async () => {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(45), (_, index) => year - index);

  const ufs: UF[] = await getUFs();

  return (
    <form className="m-4">
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-y-4">
          <Field.Input label="Código SP" />
          <Field.Input label="Número SP" />
        </div>

        <aside className="grid grid-cols-2 gap-4 border-2 border-slate-300 border-solid rounded-md p-4">
          <Field.Input label="Sondagens" />
          <Field.Input label="Total Metros" />
          <Field.Input label="Trado" defaultValue={0} />
          <Field.Input label="Total Metros Trado" defaultValue={0} />
        </aside>
      </section>

      <hr className="m-4" />

      <section className="grid lg:grid-cols-3 gap-4">
        <Field.Select label="Ano da Obra">
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Field.Select>
        <Field.Input label="Data de Início" type="date" />
        <Field.Input label="Data de Finalização" type="date" />
      </section>

      <hr className="m-4" />

      <section className="grid lg:grid-cols-3 gap-4">
        <aside className="grid gap-4 col-span-1">
          <Field.Select label="UF">
            <option value="SP">São Paulo</option>
            {ufs.map((uf) => {
              if (uf.sigla === "SP") return;
              return (
                <option key={uf.sigla} value={uf.sigla}>
                  {uf.nome}
                </option>
              );
            })}
          </Field.Select>
          <Field.Select label="Cidade"></Field.Select>
          <Field.Select label="Tipo Logradouro">
            {Object.values(Logradouro)
              .filter((v) => isNaN(Number(v)))
              .map((log, index) => {
                const indexLog = Object.values(Logradouro).indexOf(
                  log as unknown as Logradouro
                );
                const key = Object.keys(Logradouro)[indexLog];
                return (
                  <option key={indexLog} value={log}>
                    {log}
                  </option>
                );
              })}
          </Field.Select>
        </aside>
        <section className="grid gap-4 lg:col-span-2">
          <div className="grid lg:grid-flow-col gap-4">
            <Field.Input label="Logradouro" />
            <Field.Input label="Complemento" />
          </div>
          <Field.Input label="Bairro" />
          <div className="grid lg:grid-flow-col gap-4">
            <Field.Input label="Lote" />
            <Field.Input label="Quadra" />
          </div>
        </section>
      </section>

      <hr className="m-4" />

      <section className="grid gap-4">
        <Field.Input label="Proprietário" />
        <Field.Input label="Cliente" />
      </section>

      <section className="flex flex-row-reverse mt-4">
        <Button color="green" fontStrength="semibold" type="submit">
          Cadastrar nova obra
        </Button>
      </section>
    </form>
  );
};
