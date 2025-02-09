'use client'

import React, { useContext } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import CommonContext from '../../contexts/CommonContext'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'

const { big } = sizes

const { light, dark, white } = colors

const StyledMenus = styled.aside`
  min-height: 800px;
  background: ${light};

  a {
    color: ${dark};
    font-size: ${big};
    display: block;
    height: 55px;
    line-height: 53px;
    text-align: center;
  }

  a.on {
    background: ${dark};
    color: ${white};
  }

  a + a {
    border-top: 2px solid ${dark};
  }
`

const Side = () => {
  const {
    state: { menuCode },
  } = useContext(CommonContext)

  return (
    <StyledMenus>
      <a href="/member" className={classNames({ on: menuCode === 'member' })}>
        회원 관리
      </a>
      <a href="/board" className={classNames({ on: menuCode === 'board' })}>
        게시판 관리
      </a>
      <a href="/bank" className={classNames({ on: menuCode === 'bank' })}>
        은행 관리
      </a>
      <a href="/card/list" className={classNames({ on: menuCode === 'card' })}>
        카드 관리
      </a>
      <a href="/loan/list" className={classNames({ on: menuCode === 'loan' })}>
        대출 관리
      </a>
      <a
        href="/message/list"
        className={classNames({ on: menuCode === 'message' })}
      >
        쪽지 관리
      </a>
      <a
        href="/email/list"
        className={classNames({ on: menuCode === 'email' })}
      >
        이메일 로그
      </a>
    </StyledMenus>
  )
}

export default React.memo(Side)
