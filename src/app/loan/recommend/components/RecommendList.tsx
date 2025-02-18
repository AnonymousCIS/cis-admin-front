import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { SmallButton } from '@/app/global/components/Buttons'
import {
  MdCheckBoxOutlineBlank,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md'

const StyledForm = styled.form`
  table {
    text-align: center;
  }
`

// ✨✨ onClick 추가
const RecommendLoanItem = ({ item, onRemove, onClick }) => {
  const { loan } = item
  const {
    seq,
    loanName,
    categoryStr,
    limit,
    interestRate,
    repaymentYear,
    open,
    bankNameStr,
  } = loan

  return (
    <tr>
      <td>
        <span>
          <MdCheckBoxOutlineBlank />
        </span>
      </td>
      <td>{seq}</td>
      <td>{loanName}</td>
      <td>{bankNameStr}</td>
      <td>{categoryStr}</td>
      <td>{limit.toLocaleString()}원</td>
      <td>{interestRate}%</td>
      <td>{repaymentYear}년</td>
      <td>
        {/* ✨✨ span에 onClick 추가 */}
        <span onClick={() => onClick('open', !Boolean(item?.open))}>
          {open ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />} 사용
        </span>
        <span onClick={() => onClick('open', !Boolean(item?.open))}>
          {!open ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />} 미사용
        </span>
      </td>
    </tr>
  )
}

// ✨✨ onClick 추가
const RecommendLoanList = ({ items, onRemove, onClick }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>번호</th>
              <th>대출명</th>
              <th>은행명</th>
              <th>대출 카테고리</th>
              <th>최대 한도</th>
              <th>금리</th>
              <th>상환년도</th>
              <th>사용 가능 여부</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <RecommendLoanItem
                  key={'loan' + item.seq}
                  item={item}
                  onRemove={onRemove}
                  // ✨✨ onClick 추가
                  onClick={onClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan={9} className="no-data">
                  대출 목록이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(RecommendLoanList)
