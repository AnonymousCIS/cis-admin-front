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
    width: 40px;
  }

  th:nth-of-type(2) {
    width: 190px;
  }

  th:nth-of-type(3) {
    width: 120px;
  }

  th:nth-of-type(4) {
    width: 150px;
  }

  th:nth-of-type(5) {
    width: 110px;
  }

  th:nth-of-type(6) {
    width: 140px;
  }

  th:nth-of-type(7) {
    width: 90px;
  }

  th:nth-of-type(8) {
    width: 120px;
  }

  th:nth-of-type(9) {
    width: 110px;
  }

  th:nth-of-type(10) {
    width: 230px;
  }

  th:nth-of-type(11) {
    width: 190px;
  }

  th:nth-of-type(12) {
    width: 200px;
  }

  //   th:nth-of-type(13) {
  //     width: 150px;
  //   }

  td:nth-of-type(1),
  td:nth-of-type(2),
  td:nth-of-type(3),
  td:nth-of-type(4),
  td:nth-of-type(5),
  td:nth-of-type(6),
  td:nth-of-type(7),
  td:nth-of-type(8),
  td:nth-of-type(9),
  td:nth-of-type(10),
  td:nth-of-type(11),
  td:nth-of-type(12),
  td:nth-of-type(13) {
    text-align: center;
  }

  /*
  .btn {
    display: flex;
    justify-content: center;
    gap: 5px;
  }
    */

  .check > div {
    display: flex;

    span + span {
      margin-left: 15px;
    }
  }
`

const BoardDataItem = ({ item, onClick, onModal }) => {
  const {
    seq,
    config,
    notice,
    poster,
    subject,
    content,
    viewCount,
    ipAddr,
    category,
    domainStatus,
    createdBy,
  } = item

  const _content = content.replace(/<[^>]*>?/gm, '')

  return (
    <tr>
      <td>
        <MdCheckBoxOutlineBlank />
      </td>
      <td>{seq}</td>
      <td>{config.bid}</td>
      <td>{subject}</td>
      {/* <td dangerouslySetInnerHTML={{ __html: content }}></td> */}
      <td>{_content}</td>
      <td>{poster}</td>
      <td>{createdBy}</td>
      <td>{ipAddr}</td>
      <td>{notice}</td>
      <td>{category}</td>
      <td>{viewCount}</td>
      <td className="check">
        <div>
          <span onClick={() => onClick('domainStatus', 'ALL')}>
            {domainStatus == 'ALL' ? (
              <MdRadioButtonChecked />
            ) : (
              <MdRadioButtonUnchecked />
            )}
            ALL
          </span>
          <span onClick={() => onClick('domainStatus', 'SECRET')}>
            {domainStatus == 'SECRET' ? (
              <MdRadioButtonChecked />
            ) : (
              <MdRadioButtonUnchecked />
            )}
            SECRET
          </span>
          <span onClick={() => onClick('domainStatus', 'BLOCK')}>
            {domainStatus == 'BLOCK' ? (
              <MdRadioButtonChecked />
            ) : (
              <MdRadioButtonUnchecked />
            )}
            BLOCK
          </span>
        </div>
      </td>

      <td className="btn">
        <a href={'/board/view/' + seq}>
          <SmallButton type="button" color="primary" width={80}>
            상세보기
          </SmallButton>
        </a>
        <a href={'/board/edit/' + seq}>
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
      </td>
    </tr>
  )
}

const ListForm = ({ items, onClick, onModal }) => {
  return (
    <>
      <StyledForm>
        <TableRows>
          <thead>
            <tr>
              <th>
                <MdCheckBoxOutlineBlank />
              </th>
              <th>게시글 ID</th>
              <th>게시판 ID</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성자 이메일</th>
              <th>작성자 IP</th>
              <th>공지</th>
              <th>카테고리</th>
              <th>조회수</th>
              <th>상태</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item) => (
                <BoardDataItem
                  key={'boardData_' + item.seq}
                  item={item}
                  onModal={onModal}
                  onClick={onClick}
                />
              ))
            ) : (
              <tr>
                <td colSpan={10} className="no-data">
                  조회 게시글 없습니다.
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
