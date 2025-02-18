import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input } from '@/app/global/components/FormComponents'
// import { Input } from '@/app/global/components/FormComponents'
// import Select from 'react-select/base'
import { BigButton, ButtonGroup } from '@/app/global/components/Buttons'
import { FaSearch } from 'react-icons/fa'
import { RxReset } from 'react-icons/rx'
import { MdCheckBoxOutlineBlank, MdOutlineCheckBox } from 'react-icons/md'
import colors from '@/app/global/styles/colors'

const { white, info, dark } = colors

const StyledForm = styled.form<CommonType>`
  margin-bottom: 35px;

  .button-group {
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
    display: flex;
    flex-wrap: wrap;
    gap: 15px;

    span {
      display: block;
      cursor: default;
    }
  }
`

// configSearch 내부에서 정의하면 렌더링될때마다 변수가 생기므로 밖에 정의하는 것이 일반적
// const options = [
//   { value: 'ALL', label: '통합 검색' },
//   { value: 'CARDNAME', label: '카드명' },
//   { value: 'CATEGORY', label: '카테고리' },
// ]

const CardSearch = ({ form, onChange, onSubmit, onClick, onReset }) => {
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
                {form?.cardTypes?.includes('PersonalCheck') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                개인 체크
              </span>
              <span onClick={() => onClick('cardTypes', 'PersonalCredit')}>
                {form?.cardTypes?.includes('PersonalCredit') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                개인 신용
              </span>
              <span onClick={() => onClick('cardTypes', 'CorporateCheck')}>
                {form?.cardTypes?.includes('CorporateCheck') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                법인 체크
              </span>
              <span onClick={() => onClick('cardTypes', 'CorporateCredit')}>
                {form?.cardTypes?.includes('CorporateCredit') ? (
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
                {form?.categories?.includes('SHOPPING') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                SHOPPING
              </span>
              <span onClick={() => onClick('categories', 'LIFE')}>
                {form?.categories?.includes('LIFE') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                LIFE
              </span>
              <span onClick={() => onClick('categories', 'TRAVEL')}>
                {form?.categories?.includes('TRAVEL') ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                TRAVEL
              </span>
              <span onClick={() => onClick('categories', 'LIVING')}>
                {form?.categories?.includes('LIVING') ? (
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
      <ButtonGroup className="button-group center" width={800}>
        <BigButton type="reset" color="info" onClick={onReset}>
          <RxReset />
          검색 초기화
        </BigButton>
        <BigButton type="submit" color="primary">
          <FaSearch />
          검색
        </BigButton>
      </ButtonGroup>
    </StyledForm>
  )
}

export default React.memo(CardSearch)
