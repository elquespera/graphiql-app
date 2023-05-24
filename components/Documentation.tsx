import { SCHEMA_QUERY } from '@/constants/schemaQuery';
import { useGraphQlQuery } from '@/hooks/useGraphQL';
import useTranslation from '@/hooks/useTranslation';
import {
  IGraphQlArg,
  IGraphQlEnumValue,
  IGraphQlField,
  IGraphQlSchema,
  IGraphQlType,
} from '@/types/types';
import React, { Suspense, useEffect, useState } from 'react';
import Accordion from './Accordion';
import Spinner from './Spinner';
import getGraphQlType from '@/lib/getGraphQlType';
import ErrorBoundary from './ErrorBoundary';
import Code from './Code';

export default function Documentation() {
  const t = useTranslation();

  return (
    <section className="flex flex-col p-4 gap-2 overflow-hidden">
      <h3 className="font-semibold md:text-lg">{t('doc-explorer')}</h3>
      <div className="overflow-hidden h-full">
        <ErrorBoundary fallback={<div>{t('unspecified-error')}</div>}>
          <Suspense fallback={<Spinner large center />}>
            <Docs />
          </Suspense>
        </ErrorBoundary>
      </div>
    </section>
  );
}

function Docs() {
  const t = useTranslation();
  const { data } = useGraphQlQuery({ query: SCHEMA_QUERY });

  const [rootTypes, setRootTypes] = useState<IGraphQlType[]>();
  const [types, setTypes] = useState<IGraphQlType[]>();
  const [error, setError] = useState<object>();

  useEffect(() => {
    const schema = (data as IGraphQlSchema).data?.__schema;
    if (schema) {
      setError(undefined);

      const rootNames: string[] = [];

      if (schema.queryType) rootNames.push(schema.queryType.name);
      if (schema.mutationType) rootNames.push(schema.mutationType.name);
      if (schema.subscriptionType) rootNames.push(schema.subscriptionType.name);

      setRootTypes(schema.types.filter(({ name }) => rootNames.includes(name)));
      setTypes(
        schema.types.filter(({ name }) => !rootNames.includes(name) && !name.startsWith('__'))
      );
    } else {
      setError(data);
      setRootTypes(undefined);
      setTypes(undefined);
    }
  }, [data]);

  return (
    <div className="bg-slate-950 border-[1px] border-slate-700 overflow-hidden h-full">
      {error ? (
        <Code value={error} readOnly />
      ) : (
        <div className="flex flex-col gap-4 overflow-auto h-full px-4 py-2">
          {rootTypes && (
            <div>
              <h4 className="font-bold text-slate-400 text-sm mb-1">{t('root-types')}</h4>
              <ul className="flex flex-col ml-4">
                {rootTypes.map((type) => (
                  <GraphQlType key={type.name} data={type} />
                ))}
              </ul>
            </div>
          )}
          {types && (
            <div>
              <h4 className="font-bold text-slate-400 text-sm mb-1">{t('all-types')}</h4>
              <ul className="flex flex-col ml-4">
                {types.map((type) => (
                  <GraphQlType key={type.name} data={type} />
                ))}
              </ul>
            </div>
          )}{' '}
        </div>
      )}
    </div>
  );
}

interface GraphQlTypeProps {
  data: IGraphQlType;
}

function GraphQlType({ data }: GraphQlTypeProps) {
  const t = useTranslation();
  const { name, kind, description, enumValues, fields } = data;

  return (
    <li>
      <Accordion title={name} titleClass="text-orange-400">
        <>
          <GraphQlKeyValue name={t('kind')} value={kind} />
          <GraphQlKeyValue name={t('description')} value={description} />

          <GraphQlFileds data={fields} />
          <GraphQlEnumValues data={enumValues} />
        </>
      </Accordion>
    </li>
  );
}

interface GraphQlEnumValuesProps {
  data?: IGraphQlEnumValue[];
}

function GraphQlEnumValues({ data }: GraphQlEnumValuesProps) {
  const t = useTranslation();

  return data ? (
    <Accordion title={t('enum-values')} className="text-sm" titleClass="text-blue-400">
      <ul>
        {data.map(({ name, description }) => (
          <li key={name}>
            <span className="text-green-400">{name}</span>
            <span>{description}</span>
          </li>
        ))}
      </ul>
    </Accordion>
  ) : null;
}

interface GraphQlFiledsProps {
  data?: IGraphQlField[];
}

function GraphQlFileds({ data }: GraphQlFiledsProps) {
  const t = useTranslation();

  return data ? (
    <Accordion title={t('fields')} className="text-sm" titleClass="text-blue-400">
      <ul className="flex flex-col gap-4">
        {data.map(({ name, description, type, args }) => (
          <li key={name} className="flex flex-col gap-2">
            <span>
              <span className="text-blue-400 text-base">{name}</span>
              <GraphQlArgs data={args} />
              <span>: </span>
              <span className="text-orange-400">{getGraphQlType(type)}</span>
            </span>
            <span className="text-slate-400">{description}</span>
          </li>
        ))}
      </ul>
    </Accordion>
  ) : null;
}

interface GraphQlArgsProps {
  data?: IGraphQlArg[];
}

function GraphQlArgs({ data }: GraphQlArgsProps) {
  return data?.length ? (
    <span>
      {`(`}
      <ul className="ml-2">
        {data.map(({ name, type, defaultValue }, index) => (
          <li key={name}>
            <span className="text-indigo-400 text-base">{name}</span>
            <span>: </span>
            <span className="text-orange-400">{getGraphQlType(type)}</span>
            {defaultValue && (
              <span>
                <span className="text-slate-400"> = </span>
                <span className="text-green-400">{defaultValue}</span>
              </span>
            )}
            {index < data.length - 1 ? ', ' : null}
          </li>
        ))}
      </ul>
      {`)`}
    </span>
  ) : null;
}

interface GraphQlKeyValueProps {
  name: string;
  value?: string | React.ReactNode;
}

function GraphQlKeyValue({ name, value }: GraphQlKeyValueProps) {
  return value ? (
    <span className="text-sm">
      <span className="text-blue-400 font-semibold">{name}: </span>
      {typeof value === 'string' ? <span>{value}</span> : value}
    </span>
  ) : null;
}
