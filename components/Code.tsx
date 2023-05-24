import { codemirrorTheme, basicSetup } from '@/constants/codemiror';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import CodeMirror from '@uiw/react-codemirror';
import clsx from 'clsx';

interface CodeProps {
  value?: string | object;
  className?: string;
  readOnly?: boolean;
  style?: 'json' | 'js';
  onChange?: (value: string) => void;
}

export default function Code({ value, className, readOnly, style = 'json', onChange }: CodeProps) {
  const options = readOnly ? { highlightActiveLine: false, highlightSelectionMatches: false } : {};

  return (
    <CodeMirror
      className={clsx('w-full h-full', className)}
      value={typeof value === 'string' ? value : JSON.stringify(value, null, ' ')}
      extensions={style === 'json' ? [json()] : [javascript()]}
      theme={codemirrorTheme}
      basicSetup={{ ...basicSetup, ...options }}
      readOnly={readOnly}
      editable={!readOnly}
      onChange={onChange}
    />
  );
}
