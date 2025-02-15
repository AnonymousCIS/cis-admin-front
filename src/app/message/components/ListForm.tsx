import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
// import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import {
  MdCheckBoxOutlineBlank,
  // MdRadioButtonChecked,
  // MdRadioButtonUnchecked,
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
    width: 100px;
  }

  th:nth-of-type(3) {
    width: 120px;
  }

  th:nth-of-type(4) {
    width: 120px;
  }

  th:nth-of-type(5) {
    width: 60px;
  }

  th:nth-of-type(7) {
    width: 260px;
  }
`
const status = [
  { value: 'READ', label: '읽은 메세지' },
  { value: 'UNREAD', label: '안읽은 메세지' },
]

const ListItem = ({ item, onModal }) => {
  const { subject, status, content, seq, senderEmail, receiverEmail } = item
  console.log('item', item)

  return (
    <tr>
      <td><MdCheckBoxOutlineBlank /></td>
      <td>{subject}</td>
      <td>{senderEmail}</td>
      <td>{receiverEmail}</td>
      <td>{status}</td>
      <td>{content}</td>
      <td>
      <a href={`/message/view/${seq}`}>
          <SmallButton type="button" color="primary" width={120}>
            조회
          </SmallButton>
        </a>
          <SmallButton type="button" color="dark" width={120} onClick={() => onModal()}>
            삭제
          </SmallButton>
      </td>
    </tr>
  )
}

const ListForm = ({ form, onChange, onModal, items }) => {
  console.log('items', items)
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>제목</th>
              {/* <th>
                <Select
                  name="mode"
                  options={mode}
                  selected={form?.mode ?? 'SEND'}
                  onChange={onChange}
                  width={150}
                />
              </th> */}
              <th>보낸 사람 이메일</th>
              <th>받은 사람 이메일</th>
              <th>
                <Select
                  name="status"
                  options={status}
                  selected={form?.status ?? 'UNREAD'}
                  onChange={onChange}
                  width={150}
                />
              </th>
              <th>내용</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items ? (
              items.map((item) => <ListItem key={item?.seq} item={item} onModal={onModal} />)
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
