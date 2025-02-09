import CreateContainer from '../containers/bankContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'

const EditPage = () => {
  return (
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>은행 계좌 수정</MainTitle>
        <CreateContainer />
      </MainContentBox>
    </>
  )
}

export default EditPage
