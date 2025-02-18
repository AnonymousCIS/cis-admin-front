import React from 'react'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { SmallButton, ButtonGroup } from '@/app/global/components/Buttons'

const { secondary } = colors

const StyledForm = styled.form<CommonType>`
  table {
    margin-bottom: 30px;
  }

  th {
    width: 150px;
    text-align: center;
    background: ${secondary};
  }
`

// ✨✨ onDelete 추가
const CardView = ({ form, onDelete }) => {
  // console.log('form', form)
  return (
    <>
      <StyledForm>
        <TableCols>
          <tbody>
            <tr>
              <th>카드명</th>
              <td>
                <span>{form?.cardName ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>은행명</th>
              <td>
                <span>{form?.bankNameStr ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>카드종류</th>
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
              <th>연회비</th>
              <td>
                <span>{form?.annualFee ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>한도</th>
              <td>
                <span>{form?.limit ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>공개 여부</th>
              <td>
                <span>
                  {form?.isOpen !== null && form?.isOpen === true
                    ? '사용'
                    : '미사용'}
                </span>
              </td>
            </tr>
          </tbody>
        </TableCols>
        {/* onDelete ✨✨추가 */}
        <SmallButton type="button" color="dark" onClick={onDelete} width={120}>
          삭제
        </SmallButton>
      </StyledForm>
    </>
  )
}

export default React.memo(CardView)
