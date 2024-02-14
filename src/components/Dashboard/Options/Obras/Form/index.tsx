"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { NewObraSchema } from "@/schemas";
import { Logradouro } from "@/enums/Logradouro";

import Button from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

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

type Obra = z.infer<typeof NewObraSchema>;

export const NewObraForm = () => {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(45), (_, index) => year - index);

  const [ufs, setUfs] = useState<UF[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  useEffect(() => {
    const fetchSelects = async () => {
      const ufFetch = fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const muniFetch = fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios"
      );

      const [ufData, muniData] = await Promise.all([ufFetch, muniFetch]);
      const [ufJson, muniJson] = await Promise.all([
        ufData.json(),
        muniData.json(),
      ]);

      setUfs(ufJson);
      setMunicipios(muniJson);
    };

    fetchSelects().catch((error) => console.log(error));
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Obra>({
    resolver: zodResolver(NewObraSchema),
  });

  return (
    <form
      className="m-4"
      onSubmit={handleSubmit((formData) => console.log(formData))}
    >
      <section className="grid lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-y-4">
          <Field.Input
            label="Código SP"
            isInvalid={!!errors.nome}
            errorMessage={errors.nome?.message}
            {...register("nome")}
          />
          <Field.Input
            label="Número SP"
            isInvalid={!!errors.num_obra}
            errorMessage={errors.num_obra?.message}
            {...register("num_obra")}
          />
        </div>

        <aside className="grid grid-cols-2 gap-4 border-2 border-slate-300 border-solid rounded-md p-4">
          <Field.Input
            label="Sondagens"
            isInvalid={!!errors.sp_sondagem}
            errorMessage={errors.sp_sondagem?.message}
            {...register("sp_sondagem")}
          />
          <Field.Input
            label="Total Metros"
            isInvalid={!!errors.metros_sp_sondagem}
            errorMessage={errors.metros_sp_sondagem?.message}
            {...register("metros_sp_sondagem")}
          />
          <Field.Input
            label="Trado"
            defaultValue={0}
            isInvalid={!!errors.STTrado}
            errorMessage={errors.STTrado?.message}
            {...register("STTrado")}
          />
          <Field.Input
            label="Total Metros Trado"
            defaultValue={0}
            isInvalid={!!errors.STTradoml}
            errorMessage={errors.STTradoml?.message}
            {...register("STTradoml")}
          />
        </aside>
      </section>

      <hr className="m-4" />

      <section className="grid lg:grid-cols-3 gap-4">
        <Field.Select
          label="Ano da Obra"
          isInvalid={!!errors.ano}
          errorMessage={errors.ano?.message}
          {...register("ano")}
        >
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </Field.Select>
        <Field.Input
          label="Data de Início"
          type="date"
          isInvalid={!!errors.data_inicio}
          errorMessage={errors.data_inicio?.message}
          {...register("data_inicio")}
        />
        <Field.Input
          label="Data de Finalização"
          type="date"
          isInvalid={!!errors.data_fim}
          errorMessage={errors.data_fim?.message}
          {...register("data_fim")}
        />
      </section>

      <hr className="m-4" />

      <section className="grid lg:grid-cols-3 gap-4">
        <aside className="grid gap-4 col-span-1">
          <Field.Select
            label="Tipo Logradouro"
            isInvalid={!!errors.tipo_logo}
            errorMessage={errors.tipo_logo?.message}
            {...register("tipo_logo")}
          >
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
          <Field.Select
            label="UF"
            isInvalid={!!errors.uf}
            errorMessage={errors.uf?.message}
            {...register("uf")}
          >
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
          <Field.Select
            label="Cidade"
            isInvalid={!!errors.cidade}
            errorMessage={errors.cidade?.message}
            {...register("cidade")}
          >
            <option value="São Paulo">São Paulo</option>
            {municipios.map((municipio) => {
              if (municipio.nome === "São Paulo") return;
              return (
                <option key={municipio.id} value={municipio.nome}>
                  {municipio.nome}
                </option>
              );
            })}
          </Field.Select>
        </aside>
        <section className="grid gap-4 lg:col-span-2">
          <div className="grid lg:grid-flow-col gap-4">
            <Field.Input
              label="Logradouro"
              isInvalid={!!errors.logradouro}
              errorMessage={errors.logradouro?.message}
              {...register("logradouro")}
            />
            <Field.Input
              label="Complemento"
              isInvalid={!!errors.complemento}
              errorMessage={errors.complemento?.message}
              {...register("complemento")}
            />
          </div>
          <Field.Input
            label="Bairro"
            isInvalid={!!errors.bairro}
            errorMessage={errors.bairro?.message}
            {...register("bairro")}
          />
          <div className="grid lg:grid-flow-col gap-4">
            <Field.Input
              label="Lote"
              isInvalid={!!errors.lote}
              errorMessage={errors.lote?.message}
              {...register("lote")}
            />
            <Field.Input
              label="Quadra"
              isInvalid={!!errors.quadra}
              errorMessage={errors.quadra?.message}
              {...register("quadra")}
            />
          </div>
        </section>
      </section>

      <hr className="m-4" />

      <section className="grid gap-4">
        <Field.Input
          label="Proprietário"
          isInvalid={!!errors.proprietario}
          errorMessage={errors.proprietario?.message}
          {...register("proprietario")}
        />
        <Field.Input
          label="Cliente"
          isInvalid={!!errors.cliente}
          errorMessage={errors.cliente?.message}
          {...register("cliente")}
        />
      </section>

      <section className="flex flex-row-reverse mt-4">
        <Button color="green" fontStrength="semibold" type="submit">
          Cadastrar nova obra
        </Button>
      </section>
    </form>
  );
};
