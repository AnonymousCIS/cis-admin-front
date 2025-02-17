'use client'
import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableRows } from '@/app/global/components/Tables'
const StyledForm = styled.form<CommonType>`
  th:nth-of-type(1) {
    width: 60px;
  }
  th:nth-of-type(2) {
    width: 80px;
  }
  th:nth-of-type(3) {
    width: 100px;
  }
  th:nth-of-type(4) {
    width: 200px;
  }
  th:nth-of-type(5) {
    width: 200px;
  }
  td:nth-of-type(6) {
    width: 150px;
  }
  td:nth-of-type(7) {
    width: 150px;
  }

  td:nth-of-type(1),
  td:nth-of-type(2),
  td:nth-of-type(3),
  td:nth-of-type(4),
  td:nth-of-type(5),
  td:nth-of-type(6),
  td:nth-of-type(7) {
    text-align: center;
    align-item: cetner;
  }
`

const TransactionItem = ({ item }) => {
  const { bank, payAmount, seq, createdAt } = item
  const { accountNumber, bankName, name, createdBy } = bank
  return (
    <>
      <tr>
        <td>{seq}</td>
        <td>{name}</td>
        <td>{bankName}</td>
        <td>{accountNumber}</td>
        <td>{createdBy}</td>
        <td>{payAmount.toLocaleString()}원</td>
        <td suppressHydrationWarning>{createdAt}</td>
        <td></td>
      </tr>
    </>
  )
}

const ListForm = ({ items }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>은행이름</th>
              <th>계좌번호</th>
              <th>이메일</th>
              <th>가격</th>
              <th>거래날짜</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <TransactionItem key={'bank' + item.seq} item={item} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="no-data">
                  조회 가능한 계좌가 없습니다.
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
