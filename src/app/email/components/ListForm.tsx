'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { getLogInfo } from '../services/actions'; // 이메일 로그 조회 API

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
`;

const TableCols = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const SubTitle = styled.h2`
  font-size: 18px;
  color: #333;
`;

const ListForm = ({ form, onChange, logs }) => {
  return (
    <StyledForm method="GET" action="/email/search" autoComplete="off">
      <SubTitle>검색</SubTitle>
      <TableCols>
        <thead>
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
                <FaSearch />
              </div>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>로그 조회</th>
            <td>
              <table>
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
                    <tr>
                      <td colSpan="5">로그가 없습니다.</td>
                    </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </TableCols>
    </StyledForm>
  );
};

export default React.memo(ListForm);