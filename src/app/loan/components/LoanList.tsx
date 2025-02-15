import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { SmallButton } from '@/app/global/components/Buttons'
import {
  MdCheckBoxOutlineBlank,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md'
import LayerPopup from '@/app/global/components/LayerPopup'
import LoanView from './LoanView'

const StyledForm = styled.form`
  table {
    text-align: center;
  }
`

const LoanItem = ({ item, onOpen, onClose, PopupOpen }) => {
  const {
    seq,
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
      <td>
        <span>
          <MdCheckBoxOutlineBlank />
        </span>
      </td>
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
        {/* <SmallButton type="button" color="primary" width={120} onClick={onOpen}>
          상세보기
        </SmallButton>
        <LayerPopup
          onClose={onClose}
          isOpen={PopupOpen}
          title="대출 상세 정보"
          width={750}
          height={650}
        >
          <h2>{seq} 상세보기</h2>
          <LoanView form={item} seq={seq} />
        </LayerPopup> */}
        <a href={'/loan/view/' + seq}>
          <SmallButton type="button" color="primary" width={120}>
            상세보기
          </SmallButton>
        </a>
        <a href={'/loan/update/' + seq}>
          <SmallButton type="button" color="info" width={120}>
            수정
          </SmallButton>
        </a>
        <SmallButton type="button" color="dark" width={120}>
          삭제
        </SmallButton>
      </td>
    </tr>
  )
}

const LoanList = ({ items, onOpen, onClose, PopupOpen }) => {
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
                <LoanItem
                  key={'config_' + item.seq}
                  item={item}
                  PopupOpen={PopupOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />
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
