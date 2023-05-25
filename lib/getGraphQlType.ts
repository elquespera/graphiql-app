import { IGraphQlTypeDescription } from '@/types/types';

export default function getGraphQlType(type?: IGraphQlTypeDescription): string {
  let result = '';
  let list = false;

  function computeType(type?: IGraphQlTypeDescription): string | undefined {
    if (!type) return;
    if (type.kind === 'LIST') list = true;
    if (type.name) result = type.name;
    computeType(type.ofType);
  }

  computeType(type);

  return list ? `[${result}]` : result;
}
