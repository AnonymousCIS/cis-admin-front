'use client'

import React, { useContext } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import CommonContext from '../../contexts/CommonContext'
import colors from '../../styles/colors'
import sizes from '../../styles/sizes'
import { SiPorkbun } from 'react-icons/si'
import { GiMoneyStack } from 'react-icons/gi'
import { FaCreditCard } from 'react-icons/fa'
import { BsFilePostFill } from 'react-icons/bs'

const { big } = sizes

const { primary, info, white, dark } = colors

const StyledMenus = styled.aside`
  min-height: 800px;
  background: ${primary};

  a {
    color: ${white};
    font-size: ${big};
    display: block;
    height: 55px;
    line-height: 53px;
    text-align: center;
  }

  a.on {
    background: ${info};
    color: ${dark};
  }

  a + a {
    border-top: 2px solid ${info};
  }
`

const Side = () => {
  const {
    state: { menuCode },
  } = useContext(CommonContext)

  return (
    <StyledMenus>
      <a
        href="/member/list"
        className={classNames({ on: menuCode === 'member' })}
      >
        회원 관리
      </a>

      <a
        href="/board/config/list"
        className={classNames({ on: menuCode === 'board' })}
      >
        <BsFilePostFill />
        게시판 관리
      </a>
      <a href="/bank/list" className={classNames({ on: menuCode === 'bank' })}>
        은행 관리
      </a>
      <a href="/card/list" className={classNames({ on: menuCode === 'card' })}>
        <FaCreditCard />
        카드 관리
      </a>
      <a href="/loan/list" className={classNames({ on: menuCode === 'loan' })}>
        <GiMoneyStack />
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
        <SiPorkbun />
        이메일 로그
      </a>
    </StyledMenus>
  )
}

export default React.memo(Side)
