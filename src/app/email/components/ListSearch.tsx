import React from 'react'
import { BigButton, SmallButton } from "@/app/global/components/Buttons"
import { SubTitle } from "@/app/global/components/StyledTitle"
import { TableCols } from "@/app/global/components/Tables"
import { CommonType } from "@/app/global/types/styledType"
import { FaSearch } from "react-icons/fa"
import { Input, Select } from '@/app/global/components/FormComponents'
import styled from "styled-components"



const StyledForm = styled.form<CommonType>`
  margin-bottom: 35px;
  button[type='submit'] {
    display: block;
    margin: 15px auto 0;
  }

  th {
    width: 180px;
  }

  .flex {
    display: flex;

    select {
      margin-right: 5px;
    }

    select + input {
      flex-grow: 1;
    }
  }
`
const options = [
    { value: 'ALL', label: '통합 검색' },
    { value: 'SUBJECT', label: '제목' },
    { value: 'TO', label: '수신자' },
    { value: 'CONTENT', label: '내용' },
  ]

const ListSearch = ({form, onChange, onSubmit}) => {
return (
      <StyledForm autoComplete="off" onSubmit={onSubmit}>
        <SubTitle>검색</SubTitle>
        <TableCols>
          <tbody>
            <tr>
              <th>검색어</th>
              <td className="flex">
                  <Select
                    name="sopt"
                    options={options}
                    selected={form?.sopt ?? 'ALL'}
                    onChange={onChange}
                    width={180}
                  />
                  <Input
                    type="text"
                    name="skey"
                    value={form?.skey ?? ''}
                    onChange={onChange}  // 검색어 변경 시 상태 업데이트
                  />
              </td>
            </tr>
          </tbody>
        </TableCols>
        <BigButton type="submit" color="primary" width={250}>
        <FaSearch />
        검색
      </BigButton>
      </StyledForm>
    )
}
export default React.memo(ListSearch)