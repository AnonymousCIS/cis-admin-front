'use client'

// import loadable from '@loadable/component'
import WithGuestContainer from '@/app/global/containers/WithGuestContainer'
import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'

// const ChangeContainer = loadable(() => import('../../containers/ChangeContainer'))

const ChangePage = () => {
  return WithGuestContainer(
    <>
      <MainContentBox max={450} min={350}>
        <MainTitle>비밀번호 변경</MainTitle>
        {/* <ChangeContainer /> */}
      </MainContentBox>
    </>,
  )
}

export default ChangePage
