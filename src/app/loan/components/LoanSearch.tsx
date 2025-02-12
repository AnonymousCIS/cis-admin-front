import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/styledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input, Select } from '@/app/global/components/FormComponents'
// import { Input } from '@/app/global/components/FormComponents'
// import Select from 'react-select/base'
import { BigButton } from '@/app/global/components/Buttons'
import { FaSearch } from 'react-icons/fa'

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

// LoanSearch 내부에서 정의하면 렌더링될때마다 변수가 생기므로 밖에 정의하는 것이 일반적
const options = [
  { value: 'ALL', label: '통합 검색' },
  { value: 'LNAME', label: '대출명' },
  { value: 'BNAME', label: '은행명' },
  { value: 'DESC', label: '대출 설명' },
]

const LoanSearch = ({ form, onChange, onSubmit }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      <TableCols>
        <tbody>
          <tr>
            <th>검색 분류</th>
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
                onChange={onChange}
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

export default React.memo(LoanSearch)
