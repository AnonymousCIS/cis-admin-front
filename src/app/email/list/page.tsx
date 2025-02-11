import ListContainer from '../containers/ListContainer';
// import { MainContentBox } from '@/app/global/components/ContentBox';
import { MainTitle } from '@/app/global/components/StyledTitle';

const ListPage = () => {
  return (
    <>
      <MainTitle>로그 목록 조회</MainTitle>
      <ListContainer />
      </>
  );
};

export default ListPage;