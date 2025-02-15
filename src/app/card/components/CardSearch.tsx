import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input, Select } from '@/app/global/components/FormComponents'
// import { Input } from '@/app/global/components/FormComponents'
// import Select from 'react-select/base'
import { BigButton } from '@/app/global/components/Buttons'
import { FaSearch } from 'react-icons/fa'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'
import colors from '@/app/global/styles/colors'

const { white, info, dark } = colors

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

  td {
    border-bottom: 1px solid ${info};
  }

  tr:first-of-type {
    td {
      border-top: 1px solid ${info};
    }
  }

  .table-check {
    * + * {
      margin-left: 15px;
    }
  }
`

// configSearch 내부에서 정의하면 렌더링될때마다 변수가 생기므로 밖에 정의하는 것이 일반적
// const options = [
//   { value: 'ALL', label: '통합 검색' },
//   { value: 'CARDNAME', label: '카드명' },
//   { value: 'CATEGORY', label: '카테고리' },
// ]

const CardSearch = ({ form, onChange, onSubmit, onClick }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      <TableCols>
        <tbody>
          <tr>
            <th>통합 검색</th>
            <td className="flex">
              <Input
                type="text"
                name="skey"
                value={form?.skey ?? ''}
                onChange={onChange}
                placeholder="검색어를 입력해주세요"
              />
            </td>
          </tr>
          <tr>
            <th>카드 종류</th>
            <td className="table-check">
              <span onClick={() => onClick('cardTypes', 'PersonalCheck')}>
                {form?.cardTypes == 'PersonalCheck' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                개인 체크
              </span>
              <span onClick={() => onClick('cardTypes', 'PersonalCredit')}>
                {form?.cardTypes == 'PersonalCredit' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                개인 신용
              </span>
              <span onClick={() => onClick('cardTypes', 'CorporateCheck')}>
                {form?.cardTypes == 'CorporateCheck' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                법인 체크
              </span>
              <span onClick={() => onClick('cardTypes', 'CorporateCredit')}>
                {form?.cardTypes == 'CorporateCredit' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                법인 신용
              </span>
            </td>
          </tr>

          <tr>
            <th>카테고리</th>
            <td className="table-check">
              <span onClick={() => onClick('categories', 'SHOPPING')}>
                {form?.categories == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                SHOPPING
              </span>
              <span onClick={() => onClick('categories', 'LIFE')}>
                {form?.categories == 'LIFE' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                LIFE
              </span>
              <span onClick={() => onClick('categories', 'TRAVEL')}>
                {form?.categories == 'TRAVEL' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                TRAVEL
              </span>
              <span onClick={() => onClick('categories', 'LIVING')}>
                {form?.categories == 'LIVING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                LIVING
              </span>
            </td>
          </tr>

          <tr>
            <th>은행명</th>
            <td className="table-check">
              <span onClick={() => onClick('bankName', 'HANKUK')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                한국은행
              </span>
              <span onClick={() => onClick('bankName', 'KB')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                국민은행
              </span>
              <span onClick={() => onClick('bankName', 'SC')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                제일은행
              </span>
              <span onClick={() => onClick('bankName', 'CITY')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                한국시티은행
              </span>
              <span onClick={() => onClick('bankName', 'HANA')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                하나은행
              </span>
              <span onClick={() => onClick('bankName', 'SHINHAN')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                신한은행
              </span>
              <span onClick={() => onClick('bankName', 'KBANK')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                K-뱅크
              </span>
              <span onClick={() => onClick('bankName', 'KAKAO')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                카카오
              </span>
              <span onClick={() => onClick('bankName', 'TOSS')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                토스
              </span>
              <span onClick={() => onClick('bankName', 'SUHYUP')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                수협은행
              </span>
              <span onClick={() => onClick('bankName', 'BUSAN')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                부산은행
              </span>
              <span onClick={() => onClick('bankName', 'KYUNGNAM')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                경남은행
              </span>
              <span onClick={() => onClick('bankName', 'KYANGJOO')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                광주은행
              </span>
              <span onClick={() => onClick('bankName', 'JUNBOK')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                전북은행
              </span>
              <span onClick={() => onClick('bankName', 'JEJOO')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                제주은행
              </span>
              <span onClick={() => onClick('bankName', 'LOTTE')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                롯데카드
              </span>
              <span onClick={() => onClick('bankName', 'NONGHYUP')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                농협은행
              </span>
              <span onClick={() => onClick('bankName', 'SAMSUNG')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                삼성카드
              </span>
              <span onClick={() => onClick('bankName', 'HYUNDAI')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                현대카드
              </span>
              <span onClick={() => onClick('bankName', 'WOORI')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                우리은행
              </span>
              <span onClick={() => onClick('bankName', 'SINHYUP')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                신협은행
              </span>
              <span onClick={() => onClick('bankName', 'SAEMAEULGEUMGO')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                새마을금고
              </span>
              <span onClick={() => onClick('bankName', 'WOOCAEKUK')}>
                {form?.bankName == 'SHOPPING' ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                우체국
              </span>
            </td>
          </tr>

          <tr>
            <th>카드 한도</th>
            <td>
              <Input
                type="number"
                width={250}
                placeholder="최소 금액"
                name="cardLimitMin"
                value={form?.cardLimitMin ?? ''}
                onChange={onChange}
              />
              ~
              <Input
                type="number"
                width={250}
                placeholder="최대 금액"
                name="cardLimitMax"
                value={form?.cardLimitMax ?? ''}
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

export default React.memo(CardSearch)
