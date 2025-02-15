import React from 'react'
import styled from 'styled-components'
import { CommonType } from '@/app/global/types/StyledType'
import { TableCols } from '@/app/global/components/Tables'
import { Input } from '@/app/global/components/FormComponents'
import { BigButton } from '@/app/global/components/Buttons'
import { FaSearch } from 'react-icons/fa'
import { MdOutlineCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
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
  .flex {
    display: flex;

    select {
      margin-right: 5px;
    }

    select + input {
      flex-grow: 1;
    }
  }
`

// LoanSearch 내부에서 정의하면 렌더링될때마다 변수가 생기므로 밖에 정의하는 것이 일반적
/* const options = [
  { value: 'ALL', label: '통합 검색' },
  { value: 'LNAME', label: '대출명' },
  { value: 'BNAME', label: '은행명' },
  { value: 'DESC', label: '대출 설명' },
] */

const LoanSearch = ({ form, onChange, onSubmit, onClick }) => {
  return (
    <StyledForm onSubmit={onSubmit} autoComplete="off">
      <TableCols>
        <tbody>
          <tr>
            <th>검색 분류</th>
            <td className="flex">
              <Input
                type="text"
                name="skey"
                value={form?.skey ?? ''}
                onChange={onChange}
              />
            </td>
          </tr>
          <tr>
            <th>대출 카테고리</th>
            <td>
              <span onClick={() => onClick('categories', 'CREDITLOAN')}>
                {'CREDITLOAN'.includes(form?.categories) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                신용대출
              </span>
              <span onClick={() => onClick('categories', 'MORTGAGELOAN')}>
                {'MORTGAGELOAN'.includes(form?.categories) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                담보대출
              </span>
            </td>
          </tr>
          <tr>
            <th>은행명</th>
            <td>
              <span onClick={() => onClick('bankName', 'HANKUK')}>
                {'HANKUK'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                한국은행
              </span>
              <span onClick={() => onClick('bankName', 'KB')}>
                {'KB'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                국민은행
              </span>
              <span onClick={() => onClick('bankName', 'SC')}>
                {'SC'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                제일은행
              </span>
              <span onClick={() => onClick('bankName', 'CITY')}>
                {'CITY'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                한국시티은행
              </span>
              <span onClick={() => onClick('bankName', 'HANA')}>
                {'HANA'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                하나은행
              </span>
              <span onClick={() => onClick('bankName', 'SHINHAN')}>
                {'SHINHAN'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                신한은행
              </span>
              <span onClick={() => onClick('bankName', 'KBANK')}>
                {'KBANK'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                K-뱅크
              </span>
              <span onClick={() => onClick('bankName', 'KAKAO')}>
                {'KAKAO'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                카카오
              </span>
              <span onClick={() => onClick('bankName', 'TOSS')}>
                {'TOSS'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                토스
              </span>
              <span onClick={() => onClick('bankName', 'SUHYUP')}>
                {'SUHYUP'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                수협은행
              </span>
              <span onClick={() => onClick('bankName', 'BUSAN')}>
                {'BUSAN'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                부산은행
              </span>
              <span onClick={() => onClick('bankName', 'KYUNGNAM')}>
                {'KYUNGNAM'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                경남은행
              </span>
              <span onClick={() => onClick('bankName', 'KYANGJOO')}>
                {'KYANGJOO'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                광주은행
              </span>
              <span onClick={() => onClick('bankName', 'JUNBOK')}>
                {'JUNBOK'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                전북은행
              </span>
              <span onClick={() => onClick('bankName', 'JEJOO')}>
                {'JEJOO'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                제주은행
              </span>
              <span onClick={() => onClick('bankName', 'LOTTE')}>
                {'LOTTE'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                롯데카드
              </span>
              <span onClick={() => onClick('bankName', 'NONGHYUP')}>
                {'NONGHYUP'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                농협은행
              </span>
              <span onClick={() => onClick('bankName', 'SAMSUNG')}>
                {'SAMSUNG'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                삼성카드
              </span>
              <span onClick={() => onClick('bankName', 'HYUNDAI')}>
                {'HYUNDAI'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                현대카드
              </span>
              <span onClick={() => onClick('bankName', 'WOORI')}>
                {'WOORI'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                우리은행
              </span>
              <span onClick={() => onClick('bankName', 'SINHYUP')}>
                {'SINHYUP'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                신협은행
              </span>
              <span onClick={() => onClick('bankName', 'SAEMAEULGEUMGO')}>
                {'SAEMAEULGEUMGO'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                새마을금고
              </span>
              <span onClick={() => onClick('bankName', 'WOOCAEKUK')}>
                {'WOOCAEKUK'.includes(form?.bankName) ? (
                  <MdOutlineCheckBox />
                ) : (
                  <MdCheckBoxOutlineBlank />
                )}
                우체국
              </span>
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

export default React.memo(LoanSearch)
