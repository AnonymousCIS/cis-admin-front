import { BigButton } from '@/app/global/components/Buttons'
import { Input, Select } from '@/app/global/components/FormComponents'
import { TableCols } from '@/app/global/components/Tables'
import { CommonType } from '@/app/global/types/StyledType'
import React from 'react'
import { FaSearch } from 'react-icons/fa'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

const { white, info, dark } = colors

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
  { value: 'ALL', label: '제목 + 내용' },
  { value: 'SUBJECT', label: '제목' },
]

const status = [
  { value: 'UNREAD', label: '미열람' },
  { value: 'READ', label: '열람' },
]
const Search = ({ form, onChange, onSubmit }) => {
  // console.log("form", form)
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
          <tr>
            <th>열람/미열람</th>
            <td>
              <Select
                name="status"
                options={status}
                selected={form?.status ?? ''}
                onChange={onChange}
                width={180}
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

export default React.memo(Search)
