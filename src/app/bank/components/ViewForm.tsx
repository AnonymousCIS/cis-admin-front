import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import {
  BigButton,
  ButtonGroup,
  MediumButton,
} from '@/app/global/components/Buttons'
import { CommonType } from '@/app/global/types/StyledType'
import colors from '@/app/global/styles/colors'

const { primary, white } = colors

const StyledForm = styled.form<CommonType>`
  table {
    margin-bottom: 30px;

    th {
      width: 180px;
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
`

const ViewForm = ({ form, onRemove }) => {
  const { seq } = form
  return (
    <>
      <StyledForm>
        <TableRows>
          <tbody>
            <tr>
              <th>은행 기관명</th>
              <td>
                <span>{form?.bankName ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>계좌 번호</th>
              <td>
                <span>{form?.accountNumber ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>예금주</th>
              <td>
                <span>{form?.name ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>계좌 비밀번호</th>
              <td>
                <span>{form?.password ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>사용 여부</th>
              <td>
                <span>{form?.open ?? ''}</span>
              </td>
            </tr>
          </tbody>
        </TableRows>
        <ButtonGroup width={450} className="button-group center">
          <BigButton type="button" color="info">
            사용
          </BigButton>
          <BigButton type="button" color="primary">
            미사용
          </BigButton>
        </ButtonGroup>

        <div className="center">
          <a href={'/card/update/' + seq}>
            <MediumButton type="button" color="info" width={120}>
              수정
            </MediumButton>
          </a>
          <MediumButton
            type="button"
            color="dark"
            width={120}
            onClick={onRemove}
          >
            삭제
          </MediumButton>
        </div>
      </StyledForm>
    </>
  )
}

export default React.memo(ViewForm)
