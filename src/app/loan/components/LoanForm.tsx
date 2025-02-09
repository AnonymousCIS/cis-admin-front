import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import colors from '@/app/global/styles/colors'

const { primary, white } = colors

const StyledForm = styled.form`
  th {
    background: ${primary};
    color: ${white};
  }
`

const LoanForm = () => {
  return (
    <>
      <StyledForm autoComplete="off">
        <table>
          <tr>
            <th>대출명</th>
            <td>
              <Input type="text" placeholder="대출명을 입력해주세요." />
            </td>
          </tr>
          <tr>
            <th>대출 한도</th>
            <td>
              <Input type="number" placeholder="최대 한도를 입력해주세요." />
            </td>
          </tr>
          <tr>
            <th>대출 카테고리</th>
            <td>
              <Input
                type="text"
                placeholder="카테고리를 골라주세요.(신용대출, 담보대출)"
              />
            </td>
          </tr>
          <tr>
            <th>은행명</th>
            <td>
              <Input type="text" placeholder="은행 이름을 입력해주세요." />
            </td>
          </tr>
          <tr>
            <th>대출 설명</th>
            <td>
              <textarea />
            </td>
          </tr>
          <tr>
            <th>이자율</th>
            <td>
              <Input type="number" placeholder="이자율을 입력해주세요.(%)" />
            </td>
          </tr>

          <tr>
            <th>사용여부</th>
            <td>
              {/* member-gender 처럼 선택하는 형식으로 만들 것. 틀을 위해 임시적으로만 사용한 것  */}
              <span>사용여부를 위한 이벤트 처리 꼭 넣기</span>
            </td>
          </tr>
        </table>

        <BigButton type="submit" className="submit-btn">
          양식 등록
        </BigButton>
      </StyledForm>
    </>
  )
}

export default React.memo(LoanForm)
