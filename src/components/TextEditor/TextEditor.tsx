import React, { FC, useEffect, useMemo, useState } from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import { Note } from '@/types';
import 'easymde/dist/easymde.min.css';
import './TextEditor.scss';

interface TextEditorProps {
  activeNote: Note;
  onChange: (value: string) => void;
}

const TextEditor: FC<TextEditorProps> = ({ activeNote, onChange }) => {
  const titleWithDescription = `${activeNote.name ?? ''}\n${
    activeNote.content ?? ''
  }`;
  const value = activeNote.name ? titleWithDescription : activeNote.content;
  const [innerValue, setInnerValue] = useState(value);

  useEffect(() => {
    setInnerValue(value);
  }, [value, activeNote.id]);

  useEffect(() => {
    onChange(innerValue);
  }, [innerValue, onChange]);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
      status: false,
    };
  }, [activeNote.id]);

  return (
    <SimpleMdeReact
      value={innerValue}
      onChange={setInnerValue}
      options={autofocusNoSpellcheckerOptions}
    />
  );
};

export default TextEditor;
