import { selectGraphQlQuery, setQueryVariables } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function QueryVariables() {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector(selectGraphQlQuery);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setQueryVariables(event.target.value));
  };

  return (
    <textarea
      className="border-slate-700 focus:border-slate-700 border-t-0 w-full h-full bg-inherit text-inherit resize-none focus:ring-4 focus:ring-slate-800"
      value={variables}
      onChange={handleChange}
    />
  );
}
