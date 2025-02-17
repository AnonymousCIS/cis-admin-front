import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input, Select } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import { FaSearch } from 'react-icons/fa'
import colors from '@/app/global/styles/colors'

const { white, info, dark, lightgray } = colors

const StyledForm = styled.form<CommonType>`
  margin-bottom: 35px;

  button[type='submit'] {
    display: block;
    margin: 15px auto 0;
  }

  th {
    width: 150px;
    background: ${info};
    color: ${dark};
    border-bottom: 1px solid ${white};
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
  { value: 'BANKNAME', label: '은행기관명' },
  { value: 'ACCOUNTNUMBER', label: '계좌 번호' },
  { value: 'NAME', label: '예금주명' },
  { value: 'SEQ', label: '등록번호' },
]

const BankSearch = ({ form, onChange, onSubmit }) => {
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

export default React.memo(BankSearch)
