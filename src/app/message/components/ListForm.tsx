import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
// import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import {
  MdCheckBoxOutlineBlank,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from 'react-icons/md'
import { Button, SmallButton } from '@/app/global/components/Buttons'
import sizes from '@/app/global/styles/sizes'
import { Select } from '@/app/global/components/FormComponents'
import { CommonType } from '@/app/global/types/StyledType'

const StyledForm = styled.form<CommonType>`
  th:nth-of-type(1) {
    width: 40px;
  }

  th:nth-of-type(2) {
    width: 120px;
  }

  th:nth-of-type(3) {
    width: 60px;
  }

  th:nth-of-type(4) {
    width: 60px;
  }

  th:nth-of-type(5) {
    width: 60px;
  }

  th:nth-of-type(6) {
    width: 60px;
  }
`

const mode = [
  { value: 'RECEIVE', label: '받는 사람' },
  { value: 'SEND', label: '보낸 사람' },
]
const status = [
  { value: 'READ', label: '읽은 메세지' },
  { value: 'UNREAD', label: '안읽은 메세지' },
]

const ListItem = ({ item }) => {
  const { title, name ,content} = item

  const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL + `/board/list`

  return (
    <tr>
      <td></td>
      <td>{title}</td>
      <td>{name}</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{content}</td>

      <td>
        <a href={'/message/deletes'}>
          <SmallButton type="button" color="info" width={120}>
            삭제
          </SmallButton>
        </a>
      </td>
    </tr>
  )
}

const ListForm = ({ form, onChange, items }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>
                제목
              </th>
              <th>
                <Button type="button" color="secondary">
                  읽음
                </Button>
              </th>
              <th>
                <Button type="button" color="secondary">
                  삭제
                </Button>
              </th>
              <th>
                <Select
                  name="mode"
                  options={mode}
                  selected={form?.mode ?? 'SEND'}
                  onChange={onChange}
                  width={150}
                />
              </th>
              <th>
                <Select
                  name="status"
                  options={status}
                  selected={form?.status ?? 'UNREAD'}
                  onChange={onChange}
                  width={150}
                />
              </th>
              <th>
                내용
              </th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => {
                ;<ListItem item={item} />
              })
            ) : (
              <tr>
                <td colSpan={7} className="no-data">
                  쪽지가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(ListForm)
