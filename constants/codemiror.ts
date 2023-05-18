import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

export const codemirrorTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#020617',
    fontFamily: '"Source Code Pro", Consolas, Inconsolata, "Droid Sans Mono", Monaco, monospace',
    caret: '#fff',
  },
  styles: [
    { tag: t.comment, color: '#919EAD' },
    { tag: t.variableName, color: '#29b973' },
    { tag: t.name, color: '#eb34c9' },
    { tag: t.labelName, color: '#eb34c9' },
    { tag: t.typeName, color: '#919EAD' },
    { tag: t.operator, color: '#919EAD' },
    { tag: t.string, color: '#f18f01' },
    { tag: t.number, color: '#2882F9' },
    { tag: t.bool, color: '#f72f4d' },
    { tag: t.punctuation, color: '#919EAD' },
  ],
});

export const basicSetup = {
  foldGutter: false,
  dropCursor: false,
  allowMultipleSelections: false,
  indentOnInput: false,
  lineNumbers: false,
};
