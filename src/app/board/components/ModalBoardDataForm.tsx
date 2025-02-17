import React from 'react'
import { TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import colors from '@/app/global/styles/colors'
import { BigButton } from '@/app/global/components/Buttons'
import styled from 'styled-components'

const { primary, white } = colors

const StyledForm = styled.form`
  table {
    margin-bottom: 30px;

    th {
      width: 120px;
      background: ${primary};
      color: ${white};
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
  div {
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`

const ModalBoardDataForm = ({ form, onRemove, actionState, closeModal }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <SubTitle>게시글 상세</SubTitle>
        <TableCols>
          <tbody>
            <tr>
              <th>게시글 ID</th>
              <td>
                <span>{form?.seq ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>게시판</th>
              <td>
                <span>{form?.config ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>제목</th>
              <td>
                <span>{form?.subject ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>내용</th>
              <td>
                <span>{form?.content ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>작성자</th>
              <td>
                <span>{form?.poster ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>작성자 IP</th>
              <td>
                <span>{form?.ipAddr ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>공지</th>
              <td>
                <span>{form?.notice ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>카테고리</th>
              <td>
                <span>
                  {form?.category !== null && form?.open === true
                    ? '공개'
                    : '미공개'}
                </span>
              </td>
            </tr>

            <tr>
              <th>조회수</th>
              <td>
                <span>{form?.viewCount ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>공개 상태</th>
              <td>
                <span>{form?.domainStatus ?? ''}</span>
              </td>
            </tr>
          </tbody>
        </TableCols>
        <div>
          <BigButton
            type="submit"
            color="dark"
            width={100}
            disabled={isPending}
            onClick={() => onRemove(form?.seq)}
          >
            삭제
          </BigButton>
          <BigButton
            type="button"
            color="info"
            width={100}
            disabled={isPending}
            onClick={closeModal}
          >
            취소
          </BigButton>
        </div>
      </StyledForm>
    </>
  )
}

export default React.memo(ModalBoardDataForm)
