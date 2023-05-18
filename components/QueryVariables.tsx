import { selectGraphQlQuery, setQueryVariables } from '@/redux/graphQlQuery';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { codemirrorTheme, basicSetup } from '@/constants/codemiror';

export default function QueryVariables() {
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector(selectGraphQlQuery);

  const handleChange = (value: string) => {
    dispatch(setQueryVariables(value));
  };

  return (
    <CodeMirror
      className="w-full h-full cm-variables"
      value={variables}
      onChange={handleChange}
      extensions={[javascript()]}
      theme={codemirrorTheme}
      basicSetup={basicSetup}
    />
  );
}
