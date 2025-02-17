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

const mode = [
  { value: 'RECEIVE', label: '받은 사람 이메일' },
  { value: 'SEND', label: '보낸 사람 이메일' },
]
const Search = ({ form, onChange, onSubmit, onClick }) => {
  console.log("form", form)
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
              <span onClick={() => onClick('status', 'UNREAD')}>
                {form?.status === 'UNREAD' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                미열람
              </span>
              <span onClick={() => onClick('status', 'READ')}>
                {form?.status === 'READ' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                열람
              </span>
            </td>
          </tr>
          <tr>
            <th>발신/수신</th>
            <td className="flex">
              <Select
                name="mode"
                options={mode}
                selected={form?.mode ?? ''}
                onChange={onChange}
                width={180}
              />
              <Input
                type="text"
                name="sendRecevie"
                value={form?.sendRecevie ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>
          {/* <tr>
            <th>발/수신</th>
            <td className="table-check">
              <span onClick={() => onClick('mode', 'RECEIVE')}>
                {form?.mode ==='RECEIVE' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                보낸 사람 이메일
              </span>
              <span onClick={() => onClick('mode', 'SEND')}>
                {form?.mode === 'SEND' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                받은 사람 이메일
              </span>
            </td>
          </tr> */}
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
