"use client";

import { Municipio, UF } from "@/types/data/Ibge";
import { Logradouro } from "@/enums/Logradouro";

import { useEffect, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { insertNewObra } from "@/lib/actions/data/obras";
import { ObraFormSchema } from "@/schemas";

import Loading from "@/components/ui/Loading";
import { Field } from "@/components/ui/Fields";
import Button from "@/components/ui/Button";
import { TitledDivider } from "@/components/ui/TitledDivider";
import { getMunicipios } from "@/lib/actions/data/external/ibge";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Sondagem } from "@/enums/Sondagem";

type NewObraMainProps = {
  ufs: UF[];
};

type Obra = z.infer<typeof ObraFormSchema>;

export const NewObraMain = ({ ufs }: NewObraMainProps) => {
  const year = new Date().getFullYear();
  const years = Array.from(new Array(45), (_, index) => year - index);

  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const [sonPercussao, setSonPercussao] = useState(true);
  const [sonTrado, setSonTrado] = useState(false);
  const [sonRotativa, setSonRotativa] = useState(false);

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    unregister,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Obra>({
    resolver: zodResolver(ObraFormSchema),
  });

  const watchCodObra = watch("cod_obra", "");
  const watchUf = watch("uf", "SP");

  useEffect(() => {
    const fetchMunicipios = async () => {
      const municipiosReq = await getMunicipios(watchUf);
      if (municipiosReq.success) {
        setMunicipios(municipiosReq.data);
      } else {
        setMunicipios([]);
      }
    };
    fetchMunicipios().catch((error) => console.error(error));
  }, [watchUf]);

  useEffect(() => {
    if (watchCodObra.length >= 6) {
      let numObra = Number(watchCodObra.slice(2, 5));
      if (!Number.isNaN(numObra)) {
        setValue("num_obra", numObra);
      } else {
        setValue("num_obra", 0);
      }
    }
  }, [watchCodObra, setValue]);

  const sondagemReducer = (sondagem: Sondagem) => {
    switch (sondagem) {
      case Sondagem.Percussao:
        if (sonPercussao) {
          setSonPercussao(false);
          unregister("sondagem_percussao");
        } else {
          register("sondagem_percussao");
          setSonPercussao(true);
        }
        break;
      case Sondagem.Trado:
        if (sonTrado) {
          setSonTrado(false);
          unregister("sondagem_trado");
        } else {
          register("sondagem_trado");
          setSonTrado(true);
        }
        break;
      case Sondagem.Rotativa:
        if (sonRotativa) {
          setSonRotativa(false);
          unregister("sondagem_rotativa");
        } else {
          register("sondagem_rotativa");
          setSonRotativa(true);
        }
        break;
    }
  };

  const submitHandler = (formData: Obra) => {
    startTransition(async () => {
      console.log(formData);
      const response = await insertNewObra(formData);
      if (response.success) {
        toast(response.message, { type: "success" });
        reset();
      } else {
        console.error(response.error);
        toast(response.error, { type: "error" });
      }
    });
  };

  if (isPending) return <Loading />;

  return (
    <main className="m-4">
      <form
        className="xl:grid grid-cols-5 gap-4"
        autoComplete="off"
        onSubmit={handleSubmit((formData) => submitHandler(formData))}
      >
        <section className="col-span-4">
          <section className="grid lg:grid-cols-2 gap-4">
            <Field.Input
              label="Código SP"
              isInvalid={!!errors.cod_obra}
              errorMessage={errors.cod_obra?.message}
              placeholder={`SP000/${new Date()
                .getFullYear()
                .toString()
                .substr(-2)}`}
              {...register("cod_obra")}
            />
            <Field.Input
              label="Número SP"
              isInvalid={!!errors.num_obra}
              errorMessage={errors.num_obra?.message}
              {...register("num_obra")}
            />
          </section>

          <hr className="m-4 dark:border-zinc-700" />

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
              label="Início"
              type="date"
              isInvalid={!!errors.data_inicio}
              errorMessage={errors.data_inicio?.message}
              {...register("data_inicio")}
            />
            <Field.Input
              label="Término"
              type="date"
              isInvalid={!!errors.data_fim}
              errorMessage={errors.data_fim?.message}
              {...register("data_fim")}
            />
          </section>

          <hr className="m-4 dark:border-zinc-700" />

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
                  .map((log) => {
                    const indexLog = Object.values(Logradouro).indexOf(
                      log as unknown as Logradouro
                    );
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
                <option value="SP">SP</option>
                {ufs.map((uf) => {
                  if (uf.sigla === "SP") return;
                  return (
                    <option key={uf.sigla} value={uf.sigla}>
                      {uf.sigla}
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
                {watchUf === "SP" && (
                  <option value="São Paulo">São Paulo</option>
                )}
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
                  isInvalid={!!errors.complemento_logo}
                  errorMessage={errors.complemento_logo?.message}
                  {...register("complemento_logo")}
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

          <hr className="m-4 dark:border-zinc-700" />

          <section className="grid gap-4">
            <Field.SuggestionInput
              label="Cliente"
              isInvalid={!!errors.cliente}
              errorMessage={errors.cliente?.message}
              registerName="cliente"
              setValue={setValue}
              {...register("cliente")}
            />
            <Field.SuggestionInput
              label="Proprietário"
              isInvalid={!!errors.proprietario}
              errorMessage={errors.proprietario?.message}
              registerName="proprietario"
              setValue={setValue}
              {...register("proprietario")}
            />
          </section>

          <section className="max-xl:hidden flex flex-row-reverse mt-4">
            <Button color="green" fontStrength="semibold" type="submit">
              Cadastrar nova obra
            </Button>
          </section>
        </section>

        <aside className="space-y-2 max-lg:mt-4">
          <TitledDivider title="Sondagens" />
          <div className="grid grid-cols-2 gap-2 xl:grid-rows-3 xl:grid-cols-1">
            <Button
              className="justify-start"
              color={sonPercussao ? "red" : "green"}
              fontStrength="semibold"
              type="button"
              onClick={() => sondagemReducer(Sondagem.Percussao)}
            >
              {sonPercussao ? (
                <MinusCircleIcon className="size-6" />
              ) : (
                <PlusCircleIcon className="size-6" />
              )}
              Percussão
            </Button>
            <Button
              className="justify-start"
              color={sonTrado ? "red" : "green"}
              fontStrength="semibold"
              type="button"
              onClick={() => sondagemReducer(Sondagem.Trado)}
            >
              {sonTrado ? (
                <MinusCircleIcon className="size-6" />
              ) : (
                <PlusCircleIcon className="size-6" />
              )}
              Trado
            </Button>
            <Button
              className="justify-start"
              color={sonRotativa ? "red" : "green"}
              fontStrength="semibold"
              type="button"
              onClick={() => sondagemReducer(Sondagem.Rotativa)}
            >
              {sonRotativa ? (
                <MinusCircleIcon className="size-6" />
              ) : (
                <PlusCircleIcon className="size-6" />
              )}
              Rotativa
            </Button>
          </div>

          {sonPercussao && (
            <>
              <TitledDivider title="Percussão" />
              <div className="space-y-4">
                <Field.Input
                  label="Furos"
                  isInvalid={!!errors.sondagem_percussao?.furos}
                  errorMessage={errors.sondagem_percussao?.furos?.message}
                  {...register("sondagem_percussao.furos", {
                    valueAsNumber: true,
                  })}
                />
                <Field.Input
                  label="Metros"
                  isInvalid={!!errors.sondagem_percussao?.metros}
                  errorMessage={errors.sondagem_percussao?.metros?.message}
                  {...register("sondagem_percussao.metros", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </>
          )}
          {sonTrado && (
            <>
              <TitledDivider title="Trado" />
              <div className="space-y-4">
                <Field.Input
                  label="Furos"
                  isInvalid={!!errors.sondagem_trado?.furos}
                  errorMessage={errors.sondagem_trado?.metros?.message}
                  {...register("sondagem_trado.furos", {
                    valueAsNumber: true,
                  })}
                />
                <Field.Input
                  label="Metros"
                  isInvalid={!!errors.sondagem_trado?.metros}
                  errorMessage={errors.sondagem_trado?.metros?.message}
                  {...register("sondagem_trado.metros", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </>
          )}
          {sonRotativa && (
            <>
              <TitledDivider title="Rotativa" />
              <div className="space-y-4">
                <Field.Input
                  label="Furos"
                  isInvalid={!!errors.sondagem_rotativa?.furos}
                  errorMessage={errors.sondagem_rotativa?.message}
                  {...register("sondagem_rotativa.furos", {
                    valueAsNumber: true,
                  })}
                />
                <Field.Input
                  label="Metros Solo"
                  isInvalid={!!errors.sondagem_rotativa?.metros_solo}
                  errorMessage={errors.sondagem_rotativa?.metros_solo?.message}
                  {...register("sondagem_rotativa.metros_solo", {
                    valueAsNumber: true,
                  })}
                />
                <Field.Input
                  label="Metros Rocha"
                  isInvalid={!!errors.sondagem_rotativa?.metros_rocha}
                  errorMessage={errors.sondagem_rotativa?.metros_rocha?.message}
                  {...register("sondagem_rotativa.metros_rocha", {
                    valueAsNumber: true,
                  })}
                />
              </div>
            </>
          )}
        </aside>
        <section className="xl:hidden flex flex-row-reverse mt-4">
          <Button color="green" fontStrength="semibold" type="submit">
            Cadastrar nova obra
          </Button>
        </section>
      </form>
    </main>
  );
};
