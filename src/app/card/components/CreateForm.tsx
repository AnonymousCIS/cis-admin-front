import React from 'react'
import styled from 'styled-components'

import { Input, Select, Textarea } from '@/app/global/components/FormComponents'
import { TableCols } from '@/app/global/components/Tables'
import { CommonType } from '@/app/global/types/StyledType'
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md'
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

const cardTypeOptions = [
  { value: 'PersonalCheck', label: '개인 체크' },
  { value: 'PersonalCredit', label: '개인 신용' },
  { value: 'CorporateCheck', label: '법인 체크' },
  { value: 'CorporateCredit', label: '개인 신용' },
]

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

const categoryOptions = [
  { value: 'SHOPPING', label: '쇼핑' },
  { value: 'LIFE', label: '여가' },
  { value: 'TRAVEL', label: '여행' },
  { value: 'LIVING', label: '생활' },
]

const CreateForm = ({ form, onChange, onClick, onReset, actionState }) => {
  const [errors, formAction, isPending] = actionState

  return (
    <>
      <StyledForm action={formAction} autoComplete="off">
        <input type="hidden" name="mode" value={form?.mode ?? 'add'} />
        <input type="hidden" name="isOpen" value={form?.isOpen ?? false} />
        <input type="hidden" name="seq" value={form?.seq ?? ''} />
        <SubTitle>카드 설정</SubTitle>
        <TableCols>
          <tbody>
            <tr>
              <th>카드명</th>
              <td>
                <Input
                  type="text"
                  name="cardName"
                  placeholder="카드명"
                  value={form?.cardName ?? ''}
                  readOnly={form?.mode === 'edit' ? true : false}
                  onChange={onChange}
                />
                <Messages color="danger">{errors?.cardName}</Messages>
              </td>
            </tr>

            <tr>
              <th>공개 상태</th>
              <td>
                <span onClick={() => onClick('isOpen', true)}>
                  {form?.isOpen ? (
                    <MdRadioButtonChecked />
                  ) : (
                    <MdRadioButtonUnchecked />
                  )}
                  공개
                </span>
                <span onClick={() => onClick('isOpen', false)}>
                  {form?.isOpen ? (
                    <MdRadioButtonUnchecked />
                  ) : (
                    <MdRadioButtonChecked />
                  )}
                  미공개
                </span>
              </td>
            </tr>

            <tr>
              <th>연회비</th>
              <td>
                <Input
                  type="number"
                  name="annualFee"
                  value={form?.annualFee ?? ''}
                  onChange={onChange}
                  placeholder="1,000 이상 30,000 이하로 입력"
                />

                <Messages color="danger">{errors?.annualFee}</Messages>
              </td>
            </tr>

            <tr>
              <th>카드 한도</th>
              <td>
                <Input
                  type="number"
                  name="limit"
                  value={form?.limit ?? ''}
                  onChange={onChange}
                  placeholder="1,000,000 이상 100,000,000 이하로 입력"
                />

                <Messages color="danger">{errors?.limit}</Messages>
              </td>
            </tr>

            <tr>
              <th>카드 종류</th>
              <td>
                <Select
                  name="cardType"
                  options={cardTypeOptions}
                  selected={form?.cardType ?? ''}
                  onChange={onChange}
                  width={180}
                />

                <Messages color="danger">{errors?.cardType}</Messages>
              </td>
            </tr>

            <tr>
              <th>은행 종류</th>
              <td>
                {form?.mode === 'edit' ? (
                  <Input
                    type="text"
                    name="bankName"
                    value={form?.bankName ?? ''}
                    onChange={onChange}
                  />
                ) : (
                  <Select
                    name="bankName"
                    options={bankNameOptions}
                    selected={form?.bankName ?? ''}
                    onChange={onChange}
                    width={180}
                  />
                )}

                <Messages color="danger">{errors?.bankName}</Messages>
              </td>
            </tr>

            <tr>
              <th>카테고리</th>
              <td>
                <Select
                  name="category"
                  options={categoryOptions}
                  selected={form?.category ?? ''}
                  onChange={onChange}
                  width={180}
                />

                <Messages color="danger">{errors?.category}</Messages>
              </td>
            </tr>

            <tr>
              <th>카드 설명</th>
              <td>
                <Textarea
                  type="text"
                  name="cardDescription"
                  placeholder="카드 설명"
                  value={form?.cardDescription ?? ''}
                  onChange={onChange}
                  height={100}
                />

                <Messages color="danger">{errors?.cardDescription}</Messages>
              </td>
            </tr>
          </tbody>
        </TableCols>

        <ButtonGroup width={450} className="button-group center">
          {form?.mode === 'edit' ? (
            <></>
          ) : (
            <BigButton
              type="reset"
              color="info"
              disabled={isPending}
              onClick={onReset}
            >
              재입력
            </BigButton>
          )}
          <BigButton type="submit" color="dark" disabled={isPending}>
            {form?.mode === 'edit' ? '수정' : '등록'}
          </BigButton>
          <Messages color="danger">{errors?.global}</Messages>
        </ButtonGroup>
      </StyledForm>
    </>
  )
}

export default React.memo(CreateForm)
