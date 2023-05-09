import { selectGraphQlQuery, setQueryVariables } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function Variables() {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector(selectGraphQlQuery);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setQueryVariables(event.target.value));
  };

  return (
    <div className="bg-slate-950 flex-1 p-4 flex flex-col">
      <h1>Variables</h1>
      <div className="flex-1 flex flex-col mt-2">
        <textarea
          className="flex-1 bg-inherit text-inherit resize-none"
          value={variables}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
