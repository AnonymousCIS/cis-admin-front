import React from 'react'
import { TableCols } from '@/app/global/components/Tables'
import { SubTitle } from '@/app/global/components/StyledTitle'
import colors from '@/app/global/styles/colors'
import { Input, Select } from '@/app/global/components/FormComponents'
import { BigButton, ButtonGroup } from '@/app/global/components/Buttons'
import styled from 'styled-components'
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRadioButtonChecked,
  MdRadioButtonUnchecked,
} from 'react-icons/md'
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
  }
`

const options = [
  { value: 'USER', label: '유저' },
  { value: 'ADMIN', label: 'ADMIN' },
]

const EditForm = ({ form, onClick, onChange, actionState, onReset }) => {
  const [errors, formAction, isPending] = actionState
  return (
    <StyledForm action={formAction} autoComplete="off">
      <input
        type="hidden"
        name="optionalTerms"
        value={form?.optionalTerms ?? 'list'}
      />
      <input
        type="hidden"
        name="_authorities"
        value={form?._authorities ?? 'list'}
      />
      <SubTitle>유저 설정</SubTitle>
      <TableCols>
        <tbody>
          <tr>
            <th>회원번호</th>
            <td>
              <Input type="text" name="seq" value={form?.seq ?? ''} readOnly />
            </td>
          </tr>

          <tr>
            <th>이메일</th>
            <td>
              <Input
                type="text"
                name="email"
                value={form?.email ?? ''}
                onChange={onChange}
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th>비밀번호</th>
            <td>
              <Input type="password" name="password" onChange={onChange} />
            </td>
          </tr>

          <tr>
            <th>비밀번호 확인</th>
            <td>
              <Input
                type="password"
                name="comfirmPassword"
                onChange={onChange}
              />
            </td>
          </tr>

          <tr>
            <th>이름</th>
            <td>
              <Input
                type="text"
                name="name"
                value={form?.name ?? ''}
                onChange={onChange}
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th>우편번호</th>
            <td>
              <Input
                type="text"
                name="zipCode"
                value={form?.zipCode ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>

          <tr>
            <th>집주소</th>
            <td>
              <Input
                type="text"
                name="address"
                value={form?.address ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>

          <tr>
            <th>나머지주소</th>
            <td>
              <Input
                type="text"
                name="addressSub"
                value={form?.addressSub ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>

          <tr>
            <th>휴대폰번호</th>
            <td>
              <Input
                type="text"
                name="phoneNumber"
                value={form?.phoneNumber ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>

          <tr>
            <th>선택약관동의여부</th>
            <td>
              <div
                className="terms-row"
                onClick={() =>
                  onClick(
                    'optionalTerms',
                    form?.optionalTerms ? '' : 'advertisment',
                  )
                }
              >
                {form?.optionalTerms ? (
                  <MdCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                광고성 정보 전송에 동의합니다. (선택)
              </div>
            </td>
          </tr>
          <tr>
            <th>권한</th>
            <td>
              <span onClick={() => onClick('_authorities', 'USER')}>
                {form?._authorities == 'USER' ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
                유저
              </span>
              <span onClick={() => onClick('_authorities', 'ADMIN')}>
                {form?._authorities == 'ADMIN' ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
                관리자
              </span>
            </td>
          </tr>

          <tr>
            <th>생성날짜</th>
            <td>
              <Input
                type="text"
                name="createdAt"
                value={form?.createdAt ?? ''}
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th>비밀번호 수정 날짜</th>
            <td>
              <Input
                type="text"
                name="credentialChangedAt"
                value={form?.credentialChangedAt ?? ''}
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th>탈퇴날짜</th>
            <td>
              <Input
                type="text"
                name="deletedAt"
                value={form?.deletedAt ?? ''}
                readOnly
              />
            </td>
          </tr>

          <tr>
            <th>활동중</th>
            <td>
              <span onClick={() => onClick('memberCondition', 'ACTIVE')}>
                {form?.memberCondition === 'ACTIVE' ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
                활동중
              </span>
              <span onClick={() => onClick('memberCondition', 'DORMANCY')}>
                {form?.memberCondition === 'DORMANCY' ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
                휴면상태
              </span>
              <span onClick={() => onClick('memberCondition', 'BLOCK')}>
                {form?.memberCondition === 'BLOCK' ? (
                  <MdRadioButtonChecked />
                ) : (
                  <MdRadioButtonUnchecked />
                )}
                차단
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
          수정하기
        </BigButton>
        <Messages color="danger">{errors?.global}</Messages>
      </ButtonGroup>
    </StyledForm>
  )
}

export default React.memo(EditForm)
