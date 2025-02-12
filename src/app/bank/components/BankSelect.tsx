import React from 'react'
import Select from 'react-select'

export type BankOption = {
  value: number
  label: string
}

export const bankOptions: BankOption[] = [
  { value: 0, label: '한국은행' },
  { value: 1, label: '국민은행' },
  { value: 2, label: '제일은행' },
  { value: 3, label: '한국시티은행' },
  { value: 4, label: '하나은행' },
  { value: 5, label: '신한은행' },
  { value: 6, label: 'K-뱅크' },
  { value: 7, label: '카카오' },
  { value: 8, label: '토스' },
  { value: 9, label: '수협은행' },
  { value: 10, label: '부산은행' },
  { value: 11, label: '경남은행' },
  { value: 12, label: '광주은행' },
  { value: 13, label: '전북은행' },
  { value: 14, label: '제주은행' },
  { value: 15, label: '롯데카드' },
  { value: 16, label: '농협은행' },
  { value: 17, label: '삼성카드' },
  { value: 18, label: '현대카드' },
  { value: 19, label: '우리은행' },
  { value: 20, label: '신협은행' },
  { value: 21, label: '새마을금고' },
  { value: 22, label: '우체국' },
]

class BankSelectComponent extends React.Component {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption: BankOption | null) => {
    this.setState({ selectedOption }, () =>
      console.log('선택된 은행기관명:', this.state.selectedOption),
    )
  }

  render() {
    const { selectedOption } = this.state

    return (
      <div style={{ maxWidth: '400px', margin: '50px auto' }}>
        <h2>은행 선택</h2>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={bankOptions}
          placeholder="은행 기관명을 선택하세요"
          isClearable
        />
        {selectedOption && (
          <div style={{ marginTop: '20px' }}>
            <strong>선택된 은행 기관명:</strong> {selectedOption.label}
          </div>
        )}
      </div>
    )
  }
}

export default BankSelectComponent
