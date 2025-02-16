import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import {
  MdCheckBoxOutlineBlank,
  MdRadioButtonUnchecked,
  MdRadioButtonChecked,
} from 'react-icons/md'
import { SmallButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    width: 30px;
  }

  th:nth-of-type(2) {
    width: 100px;
  }

  th:nth-of-type(3) {
    width: 170px;
  }

  th:nth-of-type(4) {
    width: 250px;
  }

  th:nth-of-type(5) {
    width: 110px;
  }
`

const BankItem = ({ item, onRemove }) => {
  const { seq, bankName, accountNumber, name, isOpen } = item

  return (
    <tr>
      <td>
        <MdCheckBoxOutlineBlank />
      </td>
      <td>{seq}</td>
      <td>{bankName}</td>
      <td>{accountNumber}</td>
      <td>{name}</td>
      <td className="check">
        <span>
          {isOpen ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />} 사용
        </span>
        <span>
          {!isOpen ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />}{' '}
          미사용
        </span>
      </td>

      <td className="btn">
        <a href={'/bank/view/' + seq}>
          <SmallButton type="button" color="primary" width={80}>
            상세보기
          </SmallButton>
        </a>
        <a href={'/bank/edit/' + seq}>
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

const ListForm = ({ items, onRemove }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>등록번호</th>
              <th>은행 기관명</th>
              <th>계좌 번호</th>
              <th>예금주</th>
              <th>사용 여부</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <BankItem
                  key={'bank' + item.seq}
                  item={item}
                  onRemove={onRemove}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">
                  조회 가능한 계좌가 없습니다.
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
