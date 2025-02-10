import CreateContainer from '../containers/CreateContainer'
import { MainTitle } from '@/app/global/components/StyledTitle'
import { MainContentBox } from '@/app/global/components/ContentBox'

const CreatePage = () => {
  return (
    <>
      <MainContentBox max={750} min={650}>
        <MainTitle>카드 등록</MainTitle>
        <CreateContainer />
      </MainContentBox>
    </>
  )
}

export default CreatePage
