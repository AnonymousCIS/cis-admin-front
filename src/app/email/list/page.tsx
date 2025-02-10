import ListContainer from '../containers/ListContainer';
import { MainContentBox } from '@/app/global/components/ContentBox';
import { MainTitle } from '@/app/global/components/StyledTitle';

const ListPage = () => {
  return (
    <MainContentBox max={750} min={350}>
      <MainTitle>로그 목록 조회</MainTitle>
      <ListContainer />
    </MainContentBox>
  );
};

export default ListPage;