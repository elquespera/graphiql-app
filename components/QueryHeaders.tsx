import { addQueryHeader, deleteQueryHeader, selectGraphQlQuery } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid';
import FlatButton from './FlatButton';

export default function QueryHeaders() {
  const dispatch = useAppDispatch();
  const { headers } = useAppSelector(selectGraphQlQuery);

  const handleAddHeader = () => {
    dispatch(addQueryHeader(['new-header', 'with some random value']));
  };

  const handleDeleteHeader = (key: string) => {
    dispatch(deleteQueryHeader(key));
  };

  return (
    <div className="bg-slate-950 flex-1 p-4 flex flex-col border-[1px] border-t-0 border-slate-700 focus:border-slate-700 h-full">
      <h3>Headers</h3>
      <div className="flex-1 flex flex-col mt-2 overflow-auto">
        <ul className="flex flex-col gap-4">
          {Object.entries(headers).map(([key, value]) => (
            <li key={key} className="relative flex">
              {key}: {value}
              <FlatButton
                round
                className="absolute right-0"
                onClick={() => handleDeleteHeader(key)}
              >
                <TrashIcon className="w-5 h-5" />
              </FlatButton>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex">
          <FlatButton onClick={handleAddHeader}>
            <PlusCircleIcon className="w-5 h-5" /> Add header
          </FlatButton>
        </div>
      </div>
    </div>
  );
}
