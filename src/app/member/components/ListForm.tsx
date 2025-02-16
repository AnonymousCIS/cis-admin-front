import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { SmallButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    // check
    width: 40px;
  }

  th:nth-of-type(1) {
    // 회원번호
    width: 50px;
  }

  th:nth-of-type(2) {
    // 이메일
    width: 200px;
  }

  th:nth-of-type(3) {
    // 이름
    width: 70px;
  }
  th:nth-of-type(4) {
    // 우편번호
    width: 80px;
  }
  th:nth-of-type(5) {
    // 집주소
    width: 150px;
  }
  th:nth-of-type(6) {
    // 나머지주소
    width: 150px;
  }
  th:nth-of-type(7) {
    // 휴대폰번호
    width: 150px;
  }
  th:nth-of-type(8) {
    // 성별
    width: 50px;
  }
  th:nth-of-type(9) {
    // 생년월일
    width: 100px;
  }
  th:nth-of-type(10) {
    // 회원상태
    width: 80px;
  }
  th:nth-of-type(11) {
    // 가입일
    width: 150px;
  }
  th:nth-of-type(12) {
    // 비밀번호 수정일
    width: 100px;
  }
  th:nth-of-type(13) {
    // 탈퇴유무
    width: 80px;
  }
  th:nth-of-type(14) {
    // 권한
    width: 50px;
  }
  div {
    display: flex;
    gap: 10px;
  }
`

const MemberItems = ({ item, onDeleteClick }) => {
  const {
    seq,
    email,
    name,
    zipCode,
    address,
    addressSub,
    phoneNumber,
    gender,
    birthDt,
    memberCondition,
    createdAt,
    credentialChangedAt,
    deletedAt,
    _authorities,
  } = item

  // const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL + `/board/list/${bid}`

  return (
    <tr>
      <td>{seq}</td>
      <td>{email}</td>
      <td>{name}</td>
      <td>{zipCode}</td>
      <td>{address}</td>
      <td>{addressSub}</td>
      <td>{phoneNumber}</td>
      <td>{gender === 'MALE' ? '남자' : '여자'}</td>
      <td>{birthDt}</td>
      <td>{memberCondition}</td>
      <td>{createdAt}</td>
      <td>{credentialChangedAt}</td>
      <td>{deletedAt ? deletedAt : ''}</td>
      <td>{_authorities[0]}</td>
      <td>
        <div>
          <a href={'/member/update/' + seq}>
            <SmallButton type="button" color="info" width={80}>
              수정
            </SmallButton>
          </a>
          <SmallButton
            type="button"
            color="dark"
            width={80}
            onClick={() => onDeleteClick(seq)}
          >
            삭제하기
          </SmallButton>
        </div>
      </td>
    </tr>
  )
}

const ListForm = ({ form, onDeleteClick }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              {/* <th>
                <MdCheckBoxOutlineBlank />
              </th> */}
              <th>회원번호</th>
              <th>이메일</th>
              <th>이름</th>
              <th>우편번호</th>
              <th>집주소</th>
              <th>나머지주소</th>
              <th>휴대폰번호</th>
              <th>성별</th>
              <th>생년월일</th>
              <th>회원상태</th>
              <th>가입일</th>
              <th>비밀번호 수정일</th>
              <th>탈퇴유무</th>
              <th>권한</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {form ? (
              form.map((item, i) => (
                <MemberItems
                  key={i}
                  item={item}
                  onDeleteClick={onDeleteClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan={14} className="no-data">
                  조회된 회원이 없습니다.
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
