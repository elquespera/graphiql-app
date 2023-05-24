import useTranslation from '@/hooks/useTranslation';
import { selectGraphQlQuery, setQueryBody } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Code from './Code';
import UrlSelect from './UrlSelect';

export default function QueryBody() {
  const t = useTranslation();
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(selectGraphQlQuery);

  const handleChange = (value: string) => {
    dispatch(setQueryBody(value));
  };

  return (
    <div className="bg-slate-950 flex-[2] p-4 flex flex-col basis-full">
      <div className="flex items-center gap-4">
        <h3 className="font-semibold md:text-lg">{t('query')}</h3>
        <UrlSelect />
      </div>
      <Code className="flex-1 flex flex-col mt-2" value={query} onChange={handleChange} />
    </div>
  );
}
