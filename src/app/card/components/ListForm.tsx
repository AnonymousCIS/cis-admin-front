import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import {
  MdCheckBoxOutlineBlank,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
  MdCheckBox,
} from 'react-icons/md'
import { SmallButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    width: 40px;
  }

  th:nth-of-type(2) {
    width: 80px;
  }

  th:nth-of-type(3) {
    width: 100px;
  }

  th:nth-of-type(4) {
    width: 100px;
  }

  th:nth-of-type(5) {
    width: 100px;
  }

  th:nth-of-type(6) {
    width: 100px;
  }

  th:nth-of-type(7) {
    width: 80px;
  }

  th:nth-of-type(8) {
    width: 120px;
  }

  th:nth-of-type(9) {
    width: 140px;
  }

  th:nth-of-type(10) {
    width: 300px;
  }

  td:nth-of-type(1),
  td:nth-of-type(2),
  td:nth-of-type(3),
  td:nth-of-type(4),
  td:nth-of-type(5),
  td:nth-of-type(6),
  td:nth-of-type(7),
  td:nth-of-type(8),
  td:nth-of-type(9),
  td:nth-of-type(10) {
    text-align: center;
  }

  .btn {
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  .check > div {
    display: flex;

    span + span {
      margin-left: 15px;
    }
  }
`

const CardItem = ({ item, onClick, onModal, onToggleCheck }) => {
  const {
    seq,
    bankNameStr,
    cardName,
    cardTypeStr,
    categoryStr,
    isOpen,
    limit,
    annualFee,
    checked,
  } = item

  // const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL + `/card/list`
  return (
    <tr>
      <td>
        <span onClick={() => onToggleCheck(seq)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </span>
      </td>
      <td>{seq}</td>
      <td>{cardName}</td>
      <td>{bankNameStr}</td>
      <td>{cardTypeStr}</td>
      <td>{categoryStr}</td>
      <td>{annualFee}</td>
      <td>{limit}</td>
      <td className="check">
        <span onClick={() => onClick('isOpen', !Boolean(item?.isOpen))}>
          {/* {isOpen ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />} 사용 */}
        </span>
        <span onClick={() => onClick('isOpen', !Boolean(item?.isOpen))}>
          {isOpen ? <MdRadioButtonUnchecked /> : <MdRadioButtonChecked />}{' '}
          미사용
        </span>
      </td>

      <td className="btn">
        <div>
          <a href={'/card/view/' + seq}>
            <SmallButton type="button" color="primary" width={80}>
              상세보기
            </SmallButton>
          </a>
          <a href={'/card/update/' + seq}>
            <SmallButton type="button" color="info" width={80}>
              수정
            </SmallButton>
          </a>
          <SmallButton
            type="button"
            color="dark"
            width={80}
            onClick={() => onModal(seq)}
          >
            삭제
          </SmallButton>
        </div>
      </td>
    </tr>
  )
}
const ListForm = ({
  items,
  onClick,
  onModal,
  onAllToggleCheck,
  onToggleCheck,
}) => {
  const { AllCehcked } = items
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <span onClick={() => onAllToggleCheck()}>
                  {AllCehcked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </span>
              </th>
              <th>카드 ID</th>
              <th>카드명</th>
              <th>은행명</th>
              <th>카드 종류</th>
              <th>카테고리</th>
              <th>연회비</th>
              <th>한도</th>
              <th>공개 여부</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <CardItem
                  key={'card_' + item.seq}
                  item={item}
                  onModal={onModal}
                  onClick={onClick}
                  onToggleCheck={onToggleCheck}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="no-data">
                  조회 카드가 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </TableRows>
      </StyledForm>
    </>
  )
}

export default React.memo(ListForm)
