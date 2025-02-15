import React from 'react'
import styled from 'styled-components'
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'
import { Input, Select } from '@/app/global/components/FormComponents'
import { TableCols } from '@/app/global/components/Tables'
import { CommonType } from '@/app/global/types/StyledType'

import { BigButton, ButtonGroup } from '@/app/global/components/Buttons'
import { SubTitle } from '@/app/global/components/StyledTitle'

import Messages from '@/app/global/components/Messages'

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

const bankNameOptions = [
  { value: 'HANKUK', label: '한국은행' },
  { value: 'KB', label: '국민은행' },
  { value: 'SC', label: '제일은행' },
  { value: 'CITY', label: '한국시티은행' },
  { value: 'HANA', label: '하나은행' },
  { value: 'SHINHAN', label: '신한은행' },
  { value: 'KBANK', label: 'K-뱅크' },
  { value: 'KAKAO', label: '카카오' },
  { value: 'TOSS', label: '토스' },
  { value: 'SUHYUP', label: '수협은행' },
  { value: 'BUSAN', label: '부산은행' },
  { value: 'KYUNGNAM', label: '경남은행' },
  { value: 'KYANGJOO', label: '광주은행' },
  { value: 'JUNBOK', label: '전북은행' },
  { value: 'JEJOO', label: '제주은행' },
  { value: 'LOTTE', label: '롯데카드' },
  { value: 'NONGHYUP', label: '농협은행' },
  { value: 'SAMSUNG', label: '삼성카드' },
  { value: 'HYUNDAI', label: '현대카드' },
  { value: 'WOORI', label: '우리은행' },
  { value: 'SINHYUP', label: '신협은행' },
  { value: 'SAEMAEULGEUMGO', label: '새마을금고' },
  { value: 'WOOCAEKUK', label: '우체국' },
]

const EditForm = ({ form, onChange, onReset, onClick, actionState }) => {
  const [errors, formAction, isPending] = actionState

  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        {/* <SubTitle>계좌 수정</SubTitle> */}
        <TableCols>
          <tbody>
            <tr>
              <th>은행 기관명</th>
              <td>
                <Select
                  name="bankName"
                  options={bankNameOptions}
                  selected={form?.bankName ?? ''}
                  onChange={onChange}
                  width={180}
                />

                <Messages color="danger">{errors?.bankName}</Messages>
              </td>
            </tr>

            <tr>
              <th>계좌 번호</th>
              <td>
                <Input
                  type="number"
                  name="accountNumber"
                  placeholder="' - ' 를 제외한 숫자만 입력하세요"
                  value={form?.accountNumber ?? ''}
                  onChange={onChange}
                />

                <Messages color="danger">{errors?.accountNumber}</Messages>
              </td>
            </tr>

            <tr>
              <th>예금주</th>
              <td>
                <Input
                  type="text"
                  name="name"
                  placeholder="예금주 성명을 입력하세요"
                  value={form?.name ?? ''}
                  onChange={onChange}
                />

                <Messages color="danger">{errors?.name}</Messages>
              </td>
            </tr>

            {/* <tr>
              <th>계좌 비밀번호</th>
              <td>
                <Input
                  type="password"
                  name="password"
                  value={form?.password ?? ''}
                  onChange={onChange}
                />

                <Messages color="danger">{errors?.password}</Messages>
              </td>
            </tr> */}

            <tr>
              <th>사용 여부</th>
              <td>
                <span onClick={() => onClick('listUnderView', true)}>
                  {form?.listUnderView ? (
                    <MdRadioButtonChecked />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                  사용
                </span>
                <span onClick={() => onClick('listUnderView', false)}>
                  {form?.listUnderView ? (
                    <MdRadioButtonUnchecked />
                  ) : (
                    <MdRadioButtonChecked />
                  )}
                  미사용
                </span>
              </td>
            </tr>
          </tbody>
        </TableCols>

        <ButtonGroup width={450} className="button-group center">
          <BigButton
            type="reset"
            color="info"
            disabled={isPending}
            onClick={onReset}
          >
            재입력
          </BigButton>
          <BigButton type="submit" color="dark" disabled={isPending}>
            {form?.mode === 'edit' ? '수정' : '등록'}
          </BigButton>
          <Messages color="danger">{errors?.global}</Messages>
        </ButtonGroup>
      </StyledForm>
    </>
  )
}

export default React.memo(EditForm)
