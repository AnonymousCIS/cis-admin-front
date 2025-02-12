import React from 'react'
import { TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import colors from '@/app/global/styles/colors'
import { BigButton } from '@/app/global/components/Buttons'
import styled from 'styled-components'
import { Input } from '@/app/global/components/FormComponents'

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
    justify-content: center; /* 버튼들을 가운데 정렬 */
    gap: 20px; /* 버튼들 사이에 간격 */
  }
`

const DeleteForm = ({ form, actionState }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <StyledForm action={formAction} autoComplete="off">
      <SubTitle>유저 확인</SubTitle>
      <TableCols>
        <tbody>
          <tr>
            <th>유저번호</th>
            <td>
              <Input type="text" name="seq" value={form?.seq ?? ''} readOnly />
            </td>
          </tr>
          <tr>
            <th>이메일</th>
            <td>
              <Input
                type="text"
                name="email"
                value={form?.email ?? ''}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <Input
                type="text"
                name="name"
                value={form?.name ?? ''}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>생년월일</th>
            <td>
              <Input
                type="text"
                name="birthDt"
                value={form?.birthDt ?? ''}
                readOnly
              />
            </td>
          </tr>
          <tr>
            <th>회원 상태</th>
            <td>
              <Input
                type="text"
                name="memberCondition"
                value={form?.memberCondition ?? ''}
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </TableCols>
      <div>
        <BigButton type="submit" color="dark" width={100} disabled={isPending}>
          삭제
        </BigButton>
        <a href={'/member/list'}>
          <BigButton
            type="button"
            color="info"
            width={100}
            disabled={isPending}
          >
            취소
          </BigButton>
        </a>
      </div>
    </StyledForm>
  )
}

export default React.memo(DeleteForm)
