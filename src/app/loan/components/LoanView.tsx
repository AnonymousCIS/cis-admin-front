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

const LoanView = ({ form }) => {
  return (
    <>
      <StyledForm>
        <TableCols>
          <tbody>
            <tr>
              <th>대출명</th>
              <td>
                <span>{form?.loanName ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>대출 한도</th>
              <td>
                <span>{form?.limit ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>대출 카테고리</th>
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
              <th>상환년도</th>
              <td>
                <span>{form?.repaymentYear ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>대출 설명</th>
              <td>
                <span>{form?.loanDescription ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>이자율</th>
              <td>
                <span>{form?.interestRate ?? ''}</span>
              </td>
            </tr>
            <tr>
              <th>사용 여부</th>
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
        <ButtonGroup width={450} className="button-group center">
          <SmallButton type="button" color="info" width={120}>
            수정
          </SmallButton>
          <SmallButton type="button" color="dark">
            삭제
          </SmallButton>
        </ButtonGroup>
      </StyledForm>
    </>
  )
}

export default React.memo(LoanView)
