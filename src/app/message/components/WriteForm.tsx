import { Input, Textarea } from '@/app/global/components/FormComponents'
import React from 'react'
import styled from 'styled-components'
import { SmallButton } from '@/app/global/components/Buttons'
import { TableCols } from '@/app/global/components/Tables'
import colors from '@/app/global/styles/colors'
import Messages from '@/app/global/components/Messages'
const { primary, white } = colors

const StyledForm = styled.form`
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

    .flex {
      display: flex;

      & > span {
        width: 50px;
        cursor: default;
      }
    }
  }
`

const WriteForm = ({
  form,
  email,
  onClick,
  onChange,
  actionState,
  //   onEditor,
  //   onEditorImage,
}) => {
  const [errors, formAction, isPending] = actionState
  return (
    <>
      <StyledForm>
        <SmallButton type="button" color="primary" width={120}>
          보내기
        </SmallButton>
        <TableCols>
          <tbody>
            <tr>
              <th>받는 사람 이메일</th>
              <td>
                {email}
                <input
                  type="hidden"
                  name="receiverEmail"
                  value={form?.receiverEmail ?? ''}
                />
                <Messages color="danger">{errors?.receiverEmail}</Messages>
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td>
                <Input
                  type="text"
                  name="subject"
                  value={form?.subject ?? ''}
                  onChange={onChange}
                  placeholder="제목"
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td>
                <div>
                  <Textarea
                    name="content"
                    height={400}
                    value={form?.content ?? ''}
                    onChange={onChange}
                    placeholder="내용"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </TableCols>
      </StyledForm>
    </>
  )
}

export default React.memo(WriteForm)
