'use client'

import styled, { css } from 'styled-components'
import colors from '../styles/colors'
import sizes from '../styles/sizes'
import type { CommonType, SelectType } from '../types/styledType'

const { light, dark } = colors

const { normal } = sizes

const commonStyle = css`
  width: 100%;
  padding: 0 10px;
  border: 1px solid ${light};
  color: ${dark};
  font-size: ${normal};
  border-radius: 2px;

  & + & {
    margin-top: 5px;
  }
`

/* 입력 항목 */
export const Input = styled.input<CommonType>`
  ${commonStyle}
  height: 40px;
  border-color: ${({ color }) => (color ? colors[color] ?? light : light)};
  ${({ width }) => css`
    width: ${width}px;
  `}
`

export const Textarea = styled.textarea<CommonType>`
  ${commonStyle}
  height: 150px;
  resize: none;
  border-color: ${({ color }) => (color ? colors[color] ?? light : light)};
  ${({ width }) => css`
    width: ${width}px;
  `}
  ${({ height }) => css`
    height: ${height}px;
  `}
`

type SelectProps = SelectType & {
  selected: any
  onChange: (value: any) => void
}

const Select_ = ({
  name,
  selected,
  onChange,
  options,
  className,
}: SelectProps) => {
  return (
    <select
      name={name}
      className={className}
      value={selected}
      onChange={onChange}
    >
      <option value="">선택하세요</option>
      {options &&
        options.length > 0 &&
        options.map(({ value, label }) => (
          <option key={value + '_' + label} value={value}>
            {label}
          </option>
        ))}
    </select>
  )
}

export const Select = styled(Select_)<SelectProps>`
  ${commonStyle}
  padding: 0;
  height: 40px;
  border-color: ${({ color }) => (color ? colors[color] ?? light : light)};
  ${({ width }) => css`
    width: ${width}px;
  `}
`
