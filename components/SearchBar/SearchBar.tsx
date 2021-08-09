import styled from "styled-components"
import { useState } from "react";
import { Button } from "../Styles/Button";
import { BiSearch } from "react-icons/bi";

export const SearchBar = ({ onSubmit }) => {

  const [search, setSearch] = useState("");

  const _onSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      onSubmit(`/search/${search}`);
    }
  };

  return (
    <Form onSubmit={_onSubmit}>
      <Input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
      <Button type="submit" ><BiSearch size={36} color="#606060" /></Button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  margin: 16px;
  padding: 16px;
  margin-bottom: 24px;
  width: 80%;
`;
