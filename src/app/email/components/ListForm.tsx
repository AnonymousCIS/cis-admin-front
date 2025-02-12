'use client'

import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    width: 50px;
  }

  th:nth-of-type(2) {
    width: 150px;
  }

  th:nth-of-type(3) {
    width: 200px;
  }

  th:nth-of-type(4) {
    width: 300px;
  }

  th:nth-of-type(5) {
    width: 150px;
  }

  td {
    text-align: center;
  }
`

const ListLogItem = ({ item }) => {
  const { seq, to, subject, content, createdAt } = item

  return (
    <tr>
      <td>{seq}</td>
      <td>{to}</td>
      <td>{subject}</td>
      <td>{content}</td>
      <td>{createdAt}</td>
    </tr>
  )
}

const ListItem = ({ items }) => {
  return (
    <StyledForm>
      <SubTitle>로그 목록</SubTitle>
      <TableRows>
        <thead>
          <tr>
            <th>번호</th>
            <th>받는 사람</th>
            <th>제목</th>
            <th>내용</th>
            <th>보낸 날짜</th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((log) => <ListLogItem key={'logs_' + log.seq} item={log} />)
          ) : (
            <tr>
              <td colSpan={5} className="no-data">
                로그가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </TableRows>
    </StyledForm>
  )
}

export default React.memo(ListItem)