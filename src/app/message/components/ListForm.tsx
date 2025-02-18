import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
// import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import {
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  // MdRadioButtonChecked,
  // MdRadioButtonUnchecked,
} from 'react-icons/md'
import { SmallButton } from '@/app/global/components/Buttons'
import { CommonType } from '@/app/global/types/StyledType'

const StyledForm = styled.form<CommonType>`
  th:nth-of-type(1) {
    width: 40px;
  }

  th:nth-of-type(2) {
    width: 50px;
  }

  th:nth-of-type(3) {
    width: 100px;
  }

  th:nth-of-type(4) {
    width: 120px;
  }

  th:nth-of-type(5) {
    width: 120px;
  }

  th:nth-of-type(6) {
    width: 80px;
  }

  th:nth-of-type(7) {
    width: 80px;
  }

  th:nth-of-type(8) {
    width: 80px;
  }

  th:nth-of-type(10) {
    width: 261px;
  }
`

const ListItem = ({ item, onModal }) => {
  const { subject, status, content, seq, senderEmail, receiverEmail, deletedBySender, deletedByReceiver, notice, checked } = item
  // console.log('item', item)

  return (
    <tr>
      <td>
        <span onClick={() => onToggleCheck(seq)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </span>
      </td>
      <td style={{textAlign: 'center'}}>{notice === true ? 'O' : ''}</td>
      <td>{subject}</td>
      <td>{senderEmail}</td>
      <td>{receiverEmail}</td>
      <td>{status}</td>
      <td style={{textAlign: 'center'}}>{deletedBySender === false ? 'X' : 'O'}</td>
      <td style={{textAlign: 'center'}}>{deletedByReceiver === false ? 'X' : 'O'}</td>
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


const ListForm = ({ onModal, items, onToggleCheck, onAllToggleCheck }) => {
  const { checked } = items
  // console.log('items', items)
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <span onClick={() => onAllToggleCheck()}>
                  {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
              </th>
              <th>공지</th>
              <th>제목</th>
              <th>보낸 사람 이메일</th>
              <th>받은 사람 이메일</th>
              <th>열람 여부</th>
              <th>보낸 사람 삭제 여부</th>
              <th>받은 사람 삭제 여부</th>
              <th>내용</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.length ? (
              items.map((item) => (
                <ListItem
                  key={item?.seq}
                  item={item}
                  onModal={onModal}
                  onToggleCheck={onToggleCheck}
                />
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-data">
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
