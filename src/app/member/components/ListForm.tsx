import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { MdCheckBoxOutlineBlank } from 'react-icons/md'
import { flushAllTraces } from 'next/dist/trace'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    // check
    width: 40px;
  }

  th:nth-of-type(2) {
    // 회원번호
    width: 50px;
  }

  th:nth-of-type(3) {
    // 이메일
    width: 200px;
  }

  th:nth-of-type(4) {
    // 이름
    width: 70px;
  }
  th:nth-of-type(5) {
    // 우편번호
    width: 80px;
  }
  th:nth-of-type(6) {
    // 집주소
    width: 200px;
  }
  th:nth-of-type(7) {
    // 나머지주소
    width: 200px;
  }
  th:nth-of-type(8) {
    // 휴대폰번호
    width: 150px;
  }
  th:nth-of-type(9) {
    // 성별
    width: 50px;
  }
  th:nth-of-type(10) {
    // 생년월일
    width: 100px;
  }
  th:nth-of-type(11) {
    // 회원상태
    width: 80px;
  }
  th:nth-of-type(12) {
    // 가입일
    width: 150px;
  }
  th:nth-of-type(13) {
    // 비밀번호 수정일
    width: 150px;
  }
  th:nth-of-type(14) {
    // 탈퇴유무
    width: 80px;
  }
`

const ListForm = ({ form }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={14} className="no-data">
                조회 게시판이 없습니다.
              </td>
            </tr>
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}
export default React.memo(ListForm)
