import { selectGraphQlQuery, setQueryVariables } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Code from './Code';

export default function QueryVariables() {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector(selectGraphQlQuery);

  const handleChange = (value: string) => {
    dispatch(setQueryVariables(value));
  };

  return <Code className="cm-variables" value={variables} onChange={handleChange} />;
}
