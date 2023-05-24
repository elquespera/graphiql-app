import { basicSetup, codemirrorTheme } from '@/constants/codemiror';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import clsx from 'clsx';

interface CodeProps {
  value?: string | object;
  className?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

export default function Code({ value, className, readOnly, onChange }: CodeProps) {
  const options = readOnly ? { highlightActiveLine: false, highlightSelectionMatches: false } : {};

  return (
    <CodeMirror
      className={clsx('w-full h-full', className)}
      value={typeof value === 'string' ? value : JSON.stringify(value, null, ' ')}
      extensions={[javascript()]}
      theme={codemirrorTheme}
      basicSetup={{ ...basicSetup, ...options }}
      readOnly={readOnly}
      editable={!readOnly}
      onChange={onChange}
    />
  );
}
