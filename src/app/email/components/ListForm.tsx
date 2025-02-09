import React from "react";
import { styled } from "styled-components";
import colors from "@/app/global/styles/colors";
import sizes from "@/app/global/styles/sizes";
import { FaSearch } from "react-icons/fa";

const { white, secondary } = colors;
const { medium, big } = sizes;

const StyledForm = styled.form`
  width: 500px;
  display: flex;
  border: 3px solid ${secondary};
  margin-right: 400px;

  button {
    width: 45px;
    background: ${secondary};
    color: ${white};
    border: 0;
    cursor: pointer;
    svg {
      font-size: ${big};
    }
  }

  input {
    flex-grow: 1;
    border: 0;
    padding: 10px;
    font-size: ${medium};
  }
`;

type ListFormProps = {
  form: { skey?: string };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
};

const ListForm = ({ form, onChange, onSubmit, loading }: ListFormProps) => {
  return (
    <div className="Log-search">
      <StyledForm onSubmit={onSubmit} autoComplete="off">
      <input
        type="text"
        name="skey"
        value={form?.skey || ""} // undefined 방지
        onChange={onChange}
        placeholder="검색어를 입력하세요"
/>
        <button type="submit" disabled={loading}>
          {loading ? "검색 중..." : <FaSearch />}
        </button>
      </StyledForm>
    </div>
  );
};

export default React.memo(ListForm);