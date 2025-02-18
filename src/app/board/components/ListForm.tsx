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
    width: 110px;
  }

  th:nth-of-type(3) {
    width: 120px;
  }

  th:nth-of-type(4) {
    width: 200px;
  }

  th:nth-of-type(5) {
    width: 250px;
  }

  th:nth-of-type(6) {
    width: 110px;
  }

  th:nth-of-type(7) {
    width: 90px;
  }

  th:nth-of-type(8) {
    width: 120px;
  }

  th:nth-of-type(9) {
    width: 60px;
  }

  th:nth-of-type(10) {
    width: 100px;
  }

  th:nth-of-type(11) {
    width: 90px;
  }

  th:nth-of-type(12) {
    width: 90px;
  }

  th:nth-of-type(13) {
    width: 90px;
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
  td:nth-of-type(10),
  td:nth-of-type(11),
  td:nth-of-type(12),
  td:nth-of-type(13),
  td:nth-of-type(14),
  td:nth-of-type(15) {
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

const BoardDataItem = ({ item, onClick, onModal, onToggleCheck }) => {
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
    status,
    createdBy,
    recommendCount,
    commentCount,
    checked,
  } = item

  const _content = content.replace(/<[^>]*>?/gm, '')

  const _notice = notice ? '✅' : ''

  return (
    <tr>
      <td>
        <span onClick={() => onToggleCheck(seq)}>
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        </span>
      </td>
      <td>{seq}</td>
      <td>{config.bid}</td>
      <td>{subject}</td>
      {/* <td dangerouslySetInnerHTML={{ __html: content }}></td> */}
      <td>{_content}</td>
      <td>{poster}</td>
      <td>{createdBy}</td>
      <td>{ipAddr}</td>
      <td>{_notice}</td>
      <td>{category}</td>
      <td>{viewCount}</td>
      <td>{recommendCount}</td>
      <td>{commentCount}</td>
      <td className="check">
        <div>
          <span onClick={() => onClick('status', 'ALL')}>
            {status == 'ALL' ? (
              <MdRadioButtonChecked />
            ) : (
              <MdRadioButtonUnchecked />
            )}
            ALL
          </span>
          <span onClick={() => onClick('status', 'SECRET')}>
            {status == 'SECRET' ? (
              <MdRadioButtonChecked />
            ) : (
              <MdRadioButtonUnchecked />
            )}
            SECRET
          </span>
          <span onClick={() => onClick('status', 'BLOCK')}>
            {status == 'BLOCK' ? (
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

const ListForm = ({
  items,
  onClick,
  onModal,
  onToggleCheck,
  onAllToggleCheck,
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
              <th>추천수</th>
              <th>댓글수</th>
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
                  onToggleCheck={onToggleCheck}
                />
              ))
            ) : (
              <tr>
                <td colSpan={13} className="no-data">
                  조회된 게시글이 없습니다.
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
