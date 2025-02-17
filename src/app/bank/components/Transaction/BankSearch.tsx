import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input, Select } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import { FaSearch } from 'react-icons/fa'
import colors from '@/app/global/styles/colors'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'

const { white, info, dark, lightgray } = colors

const StyledForm = styled.form<CommonType>`
  margin-bottom: 35px;

  button[type='submit'] {
    display: block;
    margin: 15px auto 0;
  }

  th {
    width: 150px;
    background: ${info};
    color: ${dark};
    border-bottom: 1px solid ${white};
  }

  .flex {
    display: flex;

    select {
      margin-right: 5px;
    }

    select + input {
      flex-grow: 1;
    }
  }
  .table-check {
    * + * {
      margin-left: 15px;
    }
  }
`

const options = [
  { value: 'ALL', label: '통합 검색' },
  { value: 'ACCOUNTNUMBER', label: '계좌 번호' },
  { value: 'DEPOSITOR', label: '예금주명' },
  { value: 'EMAIL', label: '이메일' },
]

const BankSearch = ({ form, onChange, onSubmit, onClick }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      <TableCols>
        <tbody>
          <tr>
            <th>검색 분류</th>
            <td className="flex">
              <Select
                name="sopt"
                options={options}
                selected={form?.sopt ?? 'ALL'}
                onChange={onChange}
                width={180}
              />
              <Input
                type="text"
                name="skey"
                value={form?.skey ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <th>은행명</th>
            <td className="table-check">
              <span onClick={() => onClick('bankName', 'HANKUK')}>
                {form?.bankName?.includes('HANKUK') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                한국은행
              </span>
              <span onClick={() => onClick('bankName', 'KB')}>
                {form?.bankName?.includes('KB') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                국민은행
              </span>
              <span onClick={() => onClick('bankName', 'SC')}>
                {form?.bankName?.includes('SC') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                제일은행
              </span>
              <span onClick={() => onClick('bankName', 'CITY')}>
                {form?.bankName?.includes('CITY') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                한국시티은행
              </span>
              <span onClick={() => onClick('bankName', 'HANA')}>
                {form?.bankName?.includes('HANA') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                하나은행
              </span>
              <span onClick={() => onClick('bankName', 'SHINHAN')}>
                {form?.bankName?.includes('SHINHAN') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                신한은행
              </span>
              <span onClick={() => onClick('bankName', 'KBANK')}>
                {form?.bankName?.includes('KBANK') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                K-뱅크
              </span>
              <span onClick={() => onClick('bankName', 'KAKAO')}>
                {form?.bankName?.includes('KAKAO') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                카카오
              </span>
              <span onClick={() => onClick('bankName', 'TOSS')}>
                {form?.bankName?.includes('TOSS') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                토스
              </span>
              <span onClick={() => onClick('bankName', 'SUHYUP')}>
                {form?.bankName?.includes('SUHYUP') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                수협은행
              </span>
              <span onClick={() => onClick('bankName', 'BUSAN')}>
                {form?.bankName?.includes('BUSAN') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                부산은행
              </span>
              <span onClick={() => onClick('bankName', 'KYUNGNAM')}>
                {form?.bankName?.includes('KYUNGNAM') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                경남은행
              </span>
              <span onClick={() => onClick('bankName', 'KYANGJOO')}>
                {form?.bankName?.includes('KYANGJOO') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                광주은행
              </span>
              <span onClick={() => onClick('bankName', 'JUNBOK')}>
                {form?.bankName?.includes('JUNBOK') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                전북은행
              </span>
              <span onClick={() => onClick('bankName', 'JEJOO')}>
                {form?.bankName?.includes('JEJOO') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                제주은행
              </span>
              <span onClick={() => onClick('bankName', 'LOTTE')}>
                {form?.bankName?.includes('LOTTE') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                롯데카드
              </span>
              <span onClick={() => onClick('bankName', 'NONGHYUP')}>
                {form?.bankName?.includes('NONGHYUP') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                농협은행
              </span>
              <span onClick={() => onClick('bankName', 'SAMSUNG')}>
                {form?.bankName?.includes('SAMSUNG') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                삼성카드
              </span>
              <span onClick={() => onClick('bankName', 'HYUNDAI')}>
                {form?.bankName?.includes('HYUNDAI') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                현대카드
              </span>
              <span onClick={() => onClick('bankName', 'WOORI')}>
                {form?.bankName?.includes('WOORI') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                우리은행
              </span>
              <span onClick={() => onClick('bankName', 'SINHYUP')}>
                {form?.bankName?.includes('SINHYUP') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                신협은행
              </span>
              <span onClick={() => onClick('bankName', 'SAEMAEULGEUMGO')}>
                {form?.bankName?.includes('SAEMAEULGEUMGO') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                새마을금고
              </span>
              <span onClick={() => onClick('bankName', 'WOOCAEKUK')}>
                {form?.bankName?.includes('WOOCAEKUK') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                우체국
              </span>
            </td>
          </tr>
          <tr>
            <th>가격</th>
            <td>
              <Input
                type="number"
                width={250}
                placeholder="최소 금액"
                name="payAmountMin"
                value={form?.payAmountMin ?? ''}
                onChange={onChange}
              />
              ~
              <Input
                type="number"
                width={250}
                placeholder="최대 금액"
                name="payAmountMax"
                value={form?.payAmountMax ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>
        </tbody>
      </TableCols>
      <BigButton type="submit" color="primary" width={250}>
        <FaSearch />
        검색
      </BigButton>
    </StyledForm>
  )
}

export default React.memo(BankSearch)
