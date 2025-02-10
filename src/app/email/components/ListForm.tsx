import React from "react";
import { styled } from "styled-components";
import colors from "@/app/global/styles/colors";
import sizes from "@/app/global/styles/sizes";
import { FaSearch } from "react-icons/fa";

const { white, secondary } = colors;
const { big, medium } = sizes;

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
`
const ListForm = ({form, onChange, logs}) => {
  return (
    <div className="Log-search">
      <StyledForm method="GET" action="/email/search" autoComplete="off">
        <input type="text" name="skey" placeholder="검색어를 입력하세요" value={form?.skey ?? ""} onChange={onChange} />
        <button type="submit">
          <FaSearch />
        </button>
      </StyledForm>
    </div>
  )
}

export default React.memo(ListForm);