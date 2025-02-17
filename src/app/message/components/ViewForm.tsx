import { TableCols } from '@/app/global/components/Tables'
import React from 'react'
import styled from 'styled-components'
import colors from '@/app/global/styles/colors'
import { SmallButton } from '@/app/global/components/Buttons'
import { CommonType } from '@/app/global/types/StyledType'
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

    .content {
      height: 500px;
    }
  }
`

const ViewForm = ({ data, onDelete }) => {
  const { subject, content, senderEmail, seq } = data
  return (
    <>
      <StyledForm>
        <TableCols>
          <tbody>
            <tr>
              <th>제목</th>
              <td>{subject}</td>
            </tr>

            <tr>
              <th>보낸사람</th>
              <td>{senderEmail}</td>
            </tr>

            <tr>
              <th>내용</th>
              <td>
                <div
                  className="content"
                  dangerouslySetInnerHTML={{ __html: content }}
                ></div>
              </td>
            </tr>
          </tbody>
        </TableCols>
        <SmallButton type="button" color="dark" width={120} onClick={onDelete}>
          삭제
        </SmallButton>
      </StyledForm>
    </>
  )
}

export default React.memo(ViewForm)
