import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { BigButton, ButtonGroup } from '@/app/global/components/Buttons'
import { CommonType } from '@/app/global/types/styledType'
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

const ListForm = ({ form }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <tbody>
            <tr>
              <th>카드 ID</th>
              <td>
                <span>{form?.seq ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>카드명</th>
              <td>
                <span>{form?.cardName ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>카드 종류</th>
              <td>
                <span>{form?.cardType ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>카테고리</th>
              <td>
                <span>{form?.category ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>은행명</th>
              <td>
                <span>{form?.bankName ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>카드 한도</th>
              <td>
                <span>{form?.limit ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>카드 설명</th>
              <td>
                <span>{form?.cardDescription ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>공개 여부</th>
              <td>
                <span>{form?.open ?? ''}</span>
              </td>
            </tr>
          </tbody>
        </TableRows>
        <ButtonGroup width={450} className="button-group center">
          <BigButton type="button" color="info">
            수정
          </BigButton>
          <BigButton type="button" color="primary">
            삭제
          </BigButton>
        </ButtonGroup>
      </StyledForm>
    </>
  )
}

export default React.memo(ListForm)
