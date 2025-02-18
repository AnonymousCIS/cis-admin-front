import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
// import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import {
  MdCheckBoxOutlineBlank,
  // MdRadioButtonChecked,
  // MdRadioButtonUnchecked,
} from 'react-icons/md'
import { SmallButton } from '@/app/global/components/Buttons'
import { Select } from '@/app/global/components/FormComponents'
import { CommonType } from '@/app/global/types/StyledType'
import colors from '@/app/global/styles/colors'
import classNames from 'classnames'
const { white, dark, secondary } = colors

const StyledTab = styled.ul<CommonType>`
  display: inline-flex;
  cursor: pointer;
  background: ${white};
  color: ${dark};
  .on {
    background: ${secondary};
    color: ${white};
  }
  li {
    padding: 12px;
    border: 1px solid ${secondary};
  }
`

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
    width: 261px;
  }
`

const ListItem = ({ item, onModal }) => {
  const { subject, status, content, seq, senderEmail, receiverEmail } = item
  // console.log('item', item)

  return (
    <tr>
      <td>
        <MdCheckBoxOutlineBlank />
      </td>
      <td>{subject}</td>
      <td>{senderEmail}</td>
      <td>{receiverEmail}</td>
      <td>{status}</td>
      <td>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </td>
      <td>
        <a href={`/message/view/${seq}`}>
          <SmallButton type="button" color="primary" width={120}>
            조회
          </SmallButton>
        </a>
        <SmallButton
          type="button"
          color="dark"
          width={120}
          onClick={() => onModal(seq)}
        >
          삭제
        </SmallButton>
      </td>
    </tr>
  )
}

const ListForm = ({ onModal, items }) => {
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
              <th>보낸 사람 이메일</th>
              <th>받은 사람 이메일</th>
              <th>열람 여부</th>
              <th>내용</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items ? (
              items.map((item) => (
                <ListItem key={item?.seq} item={item} onModal={onModal} />
              ))
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
