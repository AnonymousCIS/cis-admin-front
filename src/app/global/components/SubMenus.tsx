'use client'

import React, { useContext, useState, useEffect } from 'react'
import CommonContext from '../contexts/CommonContext'
import getMenus from '../datas/menus'
import styled from 'styled-components'
import classNames from 'classnames'
import colors from '../styles/colors'
import sizes from '../styles/sizes'

const { secondary, white, lightgreen } = colors
const { medium } = sizes

const StyledMenu = styled.nav`
  box-shadow: 2px 2px 5px ${lightgreen};
  display: flex;
  border-radius: 3px;
  height: 45px;
  margin-bottom: 40px;

  a {
    color: ${secondary};
    line-height: 45px;
    font-size: ${medium};
    padding: 0 35px;

    &.on {
      color: ${white};
      background: ${secondary};
    }
  }
`

const SubMenus = () => {
  const [menus, setMenus] = useState()

  const {
    state: { menuCode, subMenuCode },
  } = useContext(CommonContext)

  useEffect(() => {
    setMenus(() => getMenus(menuCode))
  }, [menuCode])

  return (
    menus &&
    menus.length > 0 && (
      <StyledMenu>
        {menus.map(({ code, name, url }) => (
          <a
            key={'submenu_' + url}
            href={url}
            className={classNames('menu', { on: code === subMenuCode })}
          >
            {name}
          </a>
        ))}
      </StyledMenu>
    )
  )
}

export default React.memo(SubMenus)
