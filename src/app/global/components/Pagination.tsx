import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import {
  MdFirstPage,
  MdLastPage,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md'
import colors from '../styles/colors'
import sizes from '../styles/sizes'

const { secondary, white } = colors

const { medium } = sizes

const Wrapper = styled.div`
  display: flex;
  max-width: 500px;
  min-width: 100px;
  margin: 60px auto 0;
  align-items: center;
  justify-content: center;

  .page {
    min-width: 35px;
    max-width: 45px;
    padding: 0 5px;
    height: 35px;
    line-height: 33px;
    text-align: center;
    font-size: ${medium};
    border: 1px solid ${secondary};
    border-radius: 3px;
    cursor: pointer;
  }
  .page + .page {
    margin-left: 3px;
  }

  .page.on {
    background: ${secondary};
    color: ${white};
    border: none;
  }
`

const Pagination = ({ pagination, onClick }) => {
  const { page, pages, prevRangePage, nextRangePage, totalPages } = pagination

  return (
    pages.length > 0 && (
      <Wrapper>
        {prevRangePage > 0 && (
          <>
            <MdFirstPage onClick={() => onClick(1)} className="page" />
            <MdNavigateBefore
              onClick={() => onClick(Number(prevRangePage))}
              className="page"
            />
          </>
        )}
        {pages.map((p) => (
          <div
            key={'page' + p[0]}
            onClick={() => onClick(Number(p[0]))}
            className={'page' + classNames({ ' on': Number(p[0]) === page })}
          >
            {p[0]}
          </div>
        ))}
        {nextRangePage > 0 && (
          <>
            <MdNavigateNext
              onClick={() => onClick(Number(nextRangePage))}
              className="page"
            />
            <MdLastPage
              onClick={() => onClick(Number(totalPages))}
              className="page"
            />
          </>
        )}
      </Wrapper>
    )
  )
}

export default React.memo(Pagination)
