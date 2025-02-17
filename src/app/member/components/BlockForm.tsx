import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import {
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
} from 'react-icons/md'
import { ButtonGroup, BigButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    // check
    width: 40px;
  }

  th:nth-of-type(2) {
    // 회원번호
    width: 100px;
  }

  th:nth-of-type(3) {
    // 이름
    width: 100px;
  }
  th:nth-of-type(4) {
    // 이메일
    width: 100px;
  }
  th:nth-of-type(5) {
    // 상태 -> 라디오버튼으로 할거임
    width: 150px;
  }
  th:nth-of-type(6) {
    // 삭제하기버튼
    width: 150px;
  }
  th:nth-of-type(7) {
    // 삭제하기버튼
    width: 150px;
  }
  span + span {
    margin-left: 15px;
  }
  div {
    margin-top: 20px;
  }
  .button-group {
    margin-top: 20px;
  }
`
const MemberItems = ({ item, onClick, onToggleCheck }) => {
  const { member, seq, type, checked } = item
  const { email, name } = member
  const member_seq = member.seq

  return (
    <tr>
      <td>
        <span onClick={() => onToggleCheck(seq)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </span>
      </td>
      <td>{member_seq}</td>
      <td>{seq}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{type}</td>
      <td>
        <span onClick={() => onClick(seq, 'memberStatus', 'ALL')}>
          {item?.memberStatus === 'ALL' ? (
            <MdRadioButtonChecked />
          ) : (
            <MdRadioButtonUnchecked />
          )}
          ALL
        </span>
        <span onClick={() => onClick(seq, 'memberStatus', 'BLOCK')}>
          {item?.memberStatus === 'BLOCK' ? (
            <MdRadioButtonChecked />
          ) : (
            <MdRadioButtonUnchecked />
          )}
          BLOCK
        </span>
      </td>
      <td></td>
    </tr>
  )
}

const BlockForm = ({ form, onClick, onToggleCheck, onProcess }) => {
  console.log('form', form)
  return (
    <StyledForm autoComplete="off">
      <TableRows>
        <thead>
          <tr>
            <th>
              <MdCheckBoxOutlineBlank />
            </th>
            <th>회원번호</th>
            <th>도메인번호</th>
            <th>이름</th>
            <th>이메일</th>
            <th>도메인</th>
            <th>상태</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {form && form.length > 0 ? (
            form.map((item) => (
              <MemberItems
                key={item.seq}
                item={item}
                onClick={onClick}
                onToggleCheck={onToggleCheck}
              />
            ))
          ) : (
            <tr>
              <td colSpan={8} className="no-data">
                조회된 회원이 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </TableRows>
      <ButtonGroup width={450} className="button-group center">
        <BigButton type="button" color="info" onClick={() => onProcess('edit')}>
          수정
        </BigButton>
        <BigButton
          type="button"
          color="dark"
          onClick={() => onProcess('delete')}
        >
          삭제
        </BigButton>
      </ButtonGroup>
    </StyledForm>
  )
}
export default React.memo(BlockForm)
