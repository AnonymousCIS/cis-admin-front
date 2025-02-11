import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'
// import FindContainer from '../../containers/FindContainer'

const FindPage = () => {
  return (
    <>
      <MainContentBox max={450} min={350}>
        <MainTitle>비밀번호 찾기</MainTitle>
        {/* <FindContainer /> */}
      </MainContentBox>
    </>
  )
}

export default FindPage
