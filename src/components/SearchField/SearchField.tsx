import { FC, useState } from 'react';
import { Input } from 'antd';

interface SearchFieldProps {
  onChange: (value: string) => void;
}

const SearchField: FC<SearchFieldProps> = ({ onChange }) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    onChange(value);
  };

  return (
    <Input.Search
      placeholder='поиск заметок'
      allowClear
      value={value}
      onChange={handleChange}
    />
  );
};

export default SearchField;
