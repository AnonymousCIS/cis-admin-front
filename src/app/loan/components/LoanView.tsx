import React from 'react'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import { CommonType } from '@/app/global/types/styledType'
import { TableCols } from '@/app/global/components/Tables'
import { MediumButton, ButtonGroup } from '@/app/global/components/Buttons'

const { primary, white } = colors

const StyledForm = styled.form<CommonType>``

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
          </tbody>
        </TableCols>
      </StyledForm>
    </>
  )
}

export default React.memo(LoanView)
