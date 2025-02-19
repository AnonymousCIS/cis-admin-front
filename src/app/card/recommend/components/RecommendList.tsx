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
const CardItem = ({ item, onRemove, onClick }) => {
  const { card, email, seq } = item
  const {
    bankNameStr,
    cardName,
    cardTypeStr,
    categoryStr,
    isOpen,
    limit,
    createdAt,
    annualFee,
  } = card

  return (
    <tr>
      <td>
        <span>
          <MdCheckBoxOutlineBlank />
        </span>
      </td>
      <td>{seq}</td>
      <td>{email}</td>
      <td>{cardName}</td>
      <td>{bankNameStr}</td>
      <td>{cardTypeStr}</td>
      <td>{categoryStr}</td>
      <td>{annualFee.toLocaleString()}</td>
      <td>{createdAt}</td>
      <td>{limit.toLocaleString()}</td>
      <td>
        {/* ✨✨ span에 onClick 추가 */}
        <span onClick={() => onClick('isOpen', !Boolean(item?.isOpen))}>
          {isOpen ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />} 사용
        </span>
        <span onClick={() => onClick('isOpen', !Boolean(item?.isOpen))}>
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
        <a href={'/card/recommend/view/' + seq}>
          <SmallButton type="button" color="primary" width={120}>
            상세보기
          </SmallButton>
        </a>
        <a href={'/card/update/' + seq}>
          <SmallButton type="button" color="info" width={120}>
            수정
          </SmallButton>
        </a>
        <SmallButton
          type="button"
          color="dark"
          width={120}
          onClick={() => onRemove(seq)}
        >
          삭제
        </SmallButton>
      </td>
    </tr>
  )
}

// ✨✨ onClick 추가
const RecommendList = ({ items, onRemove, onClick }) => {
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
              <th>이메일</th>
              <th>카드명</th>
              <th>은행명</th>
              <th>카드종류</th>
              <th>카테고리</th>
              <th>연회비</th>
              <th>추천 시간</th>
              <th>한도</th>
              <th>공개 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <CardItem
                  key={'card' + item.seq}
                  item={item}
                  onRemove={onRemove}
                  // ✨✨ onClick 추가
                  onClick={onClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="no-data">
                  카드 목록이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(RecommendList)
