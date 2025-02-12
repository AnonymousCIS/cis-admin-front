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
  th:nth-of-type(1) {
    width: 40px;
  }

  th:nth-of-type(2) {
    width: 150px;
  }

  th:nth-of-type(3) {
    width: 250px;
  }

  th:nth-of-type(4) {
    width: 250px;
  }

  td:nth-of-type(1),
  td:nth-of-type(2),
  td:nth-of-type(3),
  td:nth-of-type(4) {
    text-align: center;
  }
`

const ConfigItem = ({ item }) => {
  const { bid, name, open } = item

  const frontUrl = process.env.NEXT_PUBLIC_FRONT_URL + `/board/list/${bid}`

  return (
    <tr>
      <td></td>
      <td>{bid}</td>
      <td>{name}</td>
      {/* 추후 Input 넣어서 name 수정가능하게 */}
      <td>
        <span>
          {open ? <MdRadioButtonChecked /> : <MdRadioButtonUnchecked />} 사용
        </span>
        <span>
          {open ? <MdRadioButtonUnchecked /> : <MdRadioButtonChecked />} 미사용
        </span>
      </td>

      <td>
        <a href={'/board/config/edit/' + bid}>
          <SmallButton type="button" color="info" width={120}>
            수정
          </SmallButton>
        </a>
        <a href={frontUrl} target="_blank">
          <SmallButton type="button" color="primary" width={120}>
            미리보기
          </SmallButton>
        </a>
      </td>
    </tr>
  )
}

const ConfigList = ({ items }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>게시판 ID</th>
              <th>게시판명</th>
              <th>사용 여부</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <ConfigItem key={'config_' + item.bid} item={item} />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="no-data">
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

export default React.memo(ConfigList)
