import { selectGraphQlQuery, setQueryVariables } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export default function Variables() {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector(selectGraphQlQuery);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    dispatch(setQueryVariables(event.target.value));
  };

  return (
    <textarea
      className="border-gray-700 focus:border-gray-700 w-full h-full bg-inherit text-inherit resize-none focus:ring-4 focus:ring-gray-800"
      value={variables}
      onChange={handleChange}
    />
  );
}
