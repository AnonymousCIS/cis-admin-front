import React from 'react'
import styled from 'styled-components'
import { TableCols } from '@/app/global/components/Tables'
import { MediumButton } from '@/app/global/components/Buttons'
import { CommonType } from '@/app/global/types/styledType'
import colors from '@/app/global/styles/colors'
import Messages from '@/app/global/components/Messages'

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

  & > .center {
    display: flex;
    justify-content: center;
    gap: 5px;

    & > * {
      display: block;
    }
  }
`

const ViewForm = ({ form, onRemove }) => {
  const { seq } = form
  return (
    <>
      <StyledForm>
        <TableCols>
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
                <span>{form?.cardTypeStr ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>카테고리</th>
              <td>
                <span>{form?.categoryStr ?? ''}</span>
              </td>
            </tr>

            <tr>
              <th>은행명</th>
              <td>
                <span>{form?.bankNameStr ?? ''}</span>
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
                <span>
                  {form?.open !== null && form?.open === true
                    ? '공개'
                    : '미공개'}
                </span>
              </td>
            </tr>
          </tbody>
        </TableCols>
        <div className="center">
          <a href={'/card/update/' + seq}>
            <MediumButton type="button" color="info" width={120}>
              수정
            </MediumButton>
          </a>
          <MediumButton
            type="button"
            color="primary"
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
