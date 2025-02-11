'use client'

import React, { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { TableRows, TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import { SmallButton } from '@/app/global/components/Buttons'
import { getLogInfo } from '../services/actions'
const StyledForm = styled.form`
  table {
    margin-bottom: 30px;

    th {
      width: 180px;
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
const ListForm = ({ logs = [] } ) => {

return(
  <>
    <StyledForm>
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
            {logs.length > 0 ? (
              logs.map((log, i) => (
                <tr key={'log_' + i}>
                  <td>{log.id}</td>
                  <td>{log.receiver}</td>
                  <td>{log.subject}</td>
                  <td>{log.content}</td>
                  <td>{log.date}</td>
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
        </StyledForm>
    </>
  )
}

export default React.memo(ListForm)
