import React from 'react'
import styled from 'styled-components'
import { TableRows } from '@/app/global/components/Tables'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { SmallButton } from '@/app/global/components/Buttons'

const StyledForm = styled.form`
  th:nth-of-type(1) {
    width: 30px;
  }

  th:nth-of-type(2) {
    width: 80px;
  }

  th:nth-of-type(3) {
    width: 200px;
  }

  th:nth-of-type(4) {
    width: 250px;
  }

  th:nth-of-type(5) {
    width: 150px;
  }
  td:nth-of-type(6) {
    width: 250px;
    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
      justify-content: center;
    }
  }
  td:nth-of-type(7) {
    text-align: center;
  }

  td:nth-of-type(1),
  td:nth-of-type(2),
  td:nth-of-type(3),
  td:nth-of-type(4),
  td:nth-of-type(5),
  td:nth-of-type(6),
  td:nth-of-type(7) {
    text-align: center;
    align-item: cetner;
  }
`

const BankItem = ({ item, onRemove, onToggleCheck }) => {
  const { seq, bankNameStr, accountNumber, name, checked } = item


  return (
    <tr>
      <td>
        <span onClick={() => onToggleCheck(seq)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </span>
      </td>
      <td>{seq}</td>
      <td>{bankNameStr}</td>
      <td>{accountNumber}</td>
      <td>{name}</td>

      <td className="btn">
        <div>
          <a href={'/bank/view/' + seq}>
            <SmallButton type="button" color="primary" width={80}>
              상세보기
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
        </div>
      </td>

      <td></td>
    </tr>
  )
}

const ListForm = ({ items, onRemove, onToggleCheck, onAllToggleCheck }) => {

  const { AllCehcked } = items

  return (
    <StyledForm autoComplete="off">
      <TableRows>
        <thead>
          <tr>
            <th>
              <span onClick={() => onAllToggleCheck()}>
                {AllCehcked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
              </span>
            </th>
            <th>등록번호</th>
            <th>은행 기관명</th>
            <th>계좌 번호</th>
            <th>예금주</th>
            <th>관리</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items && items.length > 0 ? (
            items.map((item) => (
              <BankItem
                key={'bank' + item.seq}
                item={item}
                onRemove={onRemove}
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
  )
}

export default React.memo(ListForm)
