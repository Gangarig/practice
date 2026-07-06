import { TextInput } from '@mantine/core';
interface SearchProps {
    search:string,
    onSearch:(value:string)=> void,
}

function Search({ search, onSearch }: SearchProps) {
  return (
    <TextInput
      label="Search"
      description="Input description"
      placeholder="Input placeholder"
      value={search}
      onChange={(event) => onSearch(event.currentTarget.value)}
    />
  );
}

export default Search