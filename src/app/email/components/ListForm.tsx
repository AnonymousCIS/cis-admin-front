'use client'

import React from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { TableRows, TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import { SmallButton } from '@/app/global/components/Buttons'
const StyledForm = styled.form`
  table {
    margin-bottom: 30px;

    th {
      width: 180px;
      background: #007bff;
      color: #fff;
    }

    td {
      & > * + * {
        margin-left: 20px;
      }
    }

    &:last-of-type {
      margin-bottom: 30px;
    }
  }

  input {
    width: 60%;
    padding: 8px;
    font-size: 14px;
  }
`
const ListForm = ({ form, onChange, logs, onSubmit }) => {
  return (
    <>
      <StyledForm autoComplete="off" onSubmit={onSubmit}>
        <SubTitle>검색</SubTitle>
        <TableCols>
          <tbody>
            <tr>
              <th>검색어</th>
              <td>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="skey"
                    placeholder="검색어를 입력하세요"
                    value={form?.skey ?? ''}
                    onChange={onChange}
                  />
                  <SmallButton type="submit" color="primary">
                    <FaSearch />
                  </SmallButton>
                </div>
              </td>
            </tr>
          </tbody>
        </TableCols>
      </StyledForm>

      <SubTitle>로그 목록</SubTitle>
      <TableRows>
        <thead>
          <tr>
            <th>번호</th>
            <th>수신자</th>
            <th>제목</th>
            <th>내용</th>
            <th>발송일</th>
          </tr>
        </thead>
        <tbody>
          {logs ? (
            logs.map((log, i) => (
              <tr key={'log_' + i}>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="no-data">
                로그가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </TableRows>
    </>
  )
}

export default React.memo(ListForm)
