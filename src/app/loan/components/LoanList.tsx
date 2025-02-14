import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { SmallButton } from '@/app/global/components/Buttons'
import {
  MdCheckBoxOutlineBlank,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md'

const StyledForm = styled.form``

const LoanItem = ({ item }) => {
  const {
    loanName,
    categoryStr,
    limit,
    interestRate,
    repaymentYear,
    isOpen,
    bankNameStr,
  } = item

  return (
    <tr>
      <td></td>
      <td>{loanName}</td>
      <td>{bankNameStr}</td>
      <td>{categoryStr}</td>
      <td>{limit}</td>
      <td>{interestRate}</td>
      <td>{repaymentYear}</td>
      <td>
        <span>
          {isOpen ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />} 사용
        </span>
        <span>
          {!isOpen ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}{' '}
          미사용
        </span>
      </td>
      <td>
        <a href="#">
          <SmallButton type="button" color="info" width={120}>
            수정
          </SmallButton>
        </a>
        <a href="#">
          <SmallButton type="button" color="dark" width={120}>
            삭제
          </SmallButton>
        </a>
      </td>
    </tr>
  )
}

const LoanList = ({ items }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>대출명</th>
              <th>은행명</th>
              <th>대출 카테고리</th>
              <th>최대 한도</th>
              <th>금리</th>
              <th>상환년도</th>
              <th>사용 가능 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <LoanItem key={'config_' + item.seq} item={item} />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="no-data">
                  조회 게시판이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(LoanList)
