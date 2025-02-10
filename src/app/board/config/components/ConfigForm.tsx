import React from 'react'
import styled from 'styled-components'
import { TableCols } from '@/app/global/components/Tables'
import { Input } from '@/app/global/components/FormComponents'
import { BigButton, ButtonGroup } from '@/app/global/components/Buttons'

const StyledForm = styled.form`
  table {
    th {
      width: 180px;
    }

    &:last-of-type {
      margin-bottom: 30px;
    }
  }
`

const ConfigForm = () => {
  return (
    <StyledForm>
      <TableCols>
        <tbody>
          <tr>
            <th>게시판 ID</th>
            <td>
              <Input type="text" name="bid" />
            </td>
          </tr>
        </tbody>
      </TableCols>
      <ButtonGroup width={450} className="button-group center">
        <BigButton type="reset" color="white">
          재입력
        </BigButton>
        <BigButton type="submit" color="dark">
          등록
        </BigButton>
      </ButtonGroup>
    </StyledForm>
  )
}

export default React.memo(ConfigForm)
