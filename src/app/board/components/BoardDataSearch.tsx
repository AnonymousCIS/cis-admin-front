import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input, Select } from '@/app/global/components/FormComponents'

import { BigButton, ButtonGroup } from '@/app/global/components/Buttons'
import { FaSearch } from 'react-icons/fa'
import { RxReset } from 'react-icons/rx'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'
import colors from '@/app/global/styles/colors'

const { white, info, dark } = colors

const StyledForm = styled.form<CommonType>`
  margin-bottom: 35px;

  .button-group {
    margin: 15px auto 0;
  }

  th {
    width: 150px;
    background: ${info};
    color: ${dark};
    border-bottom: 1px solid ${white};
  }

  td {
    border-bottom: 1px solid ${info};
  }

  tr:first-of-type {
    td {
      border-top: 1px solid ${info};
    }
  }

  .table-check {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    span {
      display: block;
      cursor: default;
    }
  }

  .flex {
    display: flex;

    select {
      margin-right: 5px;
    }

    select + input {
      flex-grow: 1;
    }
  }
`

// BoardDataSearch 내부에서 정의하면 렌더링될때마다 변수가 생기므로 밖에 정의하는 것이 일반적
const options = [
  { value: 'ALL', label: '통합 검색' },
  { value: 'SUBJECT_CONTENT', label: '제목 + 내용' },
  { value: 'SUBJECT', label: '제목' },
  { value: 'CONTENT', label: '내용' },
  { value: 'POSTER', label: '작성자' },
  // { value: 'COMMENT', label: '댓글 내용' },
]

const sortOptions = [
  { value: 'viewCount', label: '조회수' },
  { value: 'recommendCount', label: '추천수' },
  { value: 'commentCount', label: '댓글수' },
]

const BoardDataSearch = ({ form, onChange, onSubmit, onClick, onReset }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      <TableCols>
        <tbody>
          <tr>
            <th>검색 분류</th>
            <td className="flex">
              <Select
                name="sopt"
                options={options}
                selected={form?.sopt ?? 'ALL'}
                onChange={onChange}
                width={180}
              />
              <Input
                type="text"
                name="skey"
                value={form?.skey ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <th>게시판</th>
            <td className="table-check">
              <span onClick={() => onClick('bid', 'notice')}>
                {form?.bid?.includes('notice') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                공지사항
              </span>
              <span onClick={() => onClick('bid', 'freetalk')}>
                {form?.bid?.includes('freetalk') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                자유게시판
              </span>
              <span onClick={() => onClick('bid', 'qna')}>
                {form?.bid?.includes('qna') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                QNA
              </span>
            </td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>
              <Input
                type="text"
                name="categories"
                value={form?.categories ?? ''}
                onChange={onChange}
                placeholder="게시판 분류"
              />
            </td>
          </tr>

          <tr>
            <th>공개 상태</th>
            <td className="table-check">
              <span onClick={() => onClick('status', 'ALL')}>
                {form?.status == 'ALL' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                ALL (전체 공개)
              </span>
              <span onClick={() => onClick('status', 'SECRET')}>
                {form?.status == 'SECRET' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                SECRET (비밀글 - 작성자 & 관리자)
              </span>
              <span onClick={() => onClick('status', 'BLOCK')}>
                {form?.status == 'BLOCK' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                BLOCK (차단 - 관리자)
              </span>
            </td>
          </tr>
        </tbody>
      </TableCols>
      <ButtonGroup className="button-group center" width={800}>
        <BigButton type="reset" color="info" onClick={onReset}>
          <RxReset />
          검색 초기화
        </BigButton>
        <BigButton type="submit" color="primary">
          <FaSearch />
          검색
        </BigButton>
      </ButtonGroup>
      <Select
        name="sort"
        options={sortOptions}
        selected={form?.sort ?? ''}
        onChange={onChange}
        width={180}
      />
    </StyledForm>
  )
}

export default React.memo(BoardDataSearch)
