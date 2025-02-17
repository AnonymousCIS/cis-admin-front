import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input } from '@/app/global/components/FormComponents'

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
    * + * {
      margin-left: 15px;
    }
  }
`

const BoardDataSearch = ({ form, onChange, onSubmit, onClick, onReset }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      <TableCols>
        <tbody>
          <tr>
            <th>통합 검색</th>
            <td className="flex">
              <Input
                type="text"
                name="skey"
                value={form?.skey ?? ''}
                onChange={onChange}
                placeholder="검색어를 입력해주세요"
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
            <td className="table-check">
              <span onClick={() => onClick('categories', 'SHOPPING')}>
                {form?.categories?.includes('SHOPPING') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                SHOPPING
              </span>
            </td>
          </tr>

          <tr>
            <th>공개 상태</th>
            <td>
              <span onClick={() => onClick('statuses', 'ALL')}>
                {form?.statuses?.includes('ALL') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                ALL (전체 공개)
              </span>
              <span onClick={() => onClick('statuses', 'SECRET')}>
                {form?.statuses?.includes('SECRET') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                SECRET (비밀글 - 작성자 & 관리자)
              </span>
              <span onClick={() => onClick('statuses', 'BLOCK')}>
                {form?.statuses?.includes('BLOCK') ? (
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
    </StyledForm>
  )
}

export default React.memo(BoardDataSearch)
