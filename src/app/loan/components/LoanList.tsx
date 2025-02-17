import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { SmallButton } from '@/app/global/components/Buttons'
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md'

const StyledForm = styled.form`
  table {
    text-align: center;

    span {
      cursor: default;
    }
    .btn {
      display: flex;
      justify-content: center;
      gap: 10px;
    }
  }
`

// ✨✨ onClick 추가
const LoanItem = ({ item, onRemove, openClick, onToggleCheck }) => {
  console.log('item : ' + item.open)
  const {
    seq,
    loanName,
    categoryStr,
    limit,
    interestRate,
    repaymentYear,
    open,
    bankNameStr,
    checked,
  } = item

  return (
    <tr>
      <td>
        <span onClick={() => onToggleCheck(seq)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </span>
      </td>
      <td>{loanName}</td>
      <td>{bankNameStr}</td>
      <td>{categoryStr}</td>
      <td>{limit.toLocaleString()}원</td>
      <td>{interestRate}%</td>
      <td>{repaymentYear}년</td>
      <td>
        {/* ✨✨ span에 onClick 추가 / 아직 제대로 작동 안 됨 */}
        <span onClick={(_open) => openClick(open, _open)}>
          {open ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
          사용
        </span>
        <span onClick={(_open) => openClick(open, !_open)}>
          {!open ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}
          미사용
        </span>
      </td>
      <td className="btn">
        <a href={'/loan/view/' + seq}>
          <SmallButton type="button" color="primary" width={80}>
            상세보기
          </SmallButton>
        </a>
        <a href={'/loan/update/' + seq}>
          <SmallButton type="button" color="info" width={80}>
            수정
          </SmallButton>
        </a>
        <SmallButton
          type="button"
          color="dark"
          width={80}
          onClick={() => onRemove(seq)}
        >
          삭제
        </SmallButton>
      </td>
    </tr>
  )
}

// ✨✨ onClick 추가
const LoanList = ({ items, onRemove, openClick, onToggleCheck }) => {
  return (
    <>
      <StyledForm>
        <input type="hidden" name="isOpen" value={items.open} />
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
                <LoanItem
                  key={'loan' + item.seq}
                  item={item}
                  onRemove={onRemove}
                  // ✨✨ onClick 추가
                  openClick={openClick}
                  onToggleCheck={onToggleCheck}
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

export default React.memo(LoanList)
