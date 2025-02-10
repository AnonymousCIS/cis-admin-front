import { MainContentBox } from '@/app/global/components/ContentBox'
import { MainTitle } from '@/app/global/components/StyledTitle'
import ViewForm from '../../components/ViewForm'

const ViewPage = () => {
  return (
    <>
      <MainContentBox max={450} min={350}>
        <MainTitle>쪽지 조회</MainTitle>
        <ViewForm />
      </MainContentBox>
    </>
  )
}

export default ViewPage
