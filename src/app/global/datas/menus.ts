export const menus = {
  member: [
    { code: 'list', name: '회원 목록', url: '/member/list' },
    { code: 'block', name: '회원 차단', url: '/member/block' },
  ],
  board: [
    { code: 'configList', name: '게시판 목록', url: '/board/config/list' },
    { code: 'configWrite', name: '게시판 등록', url: '/board/config/write' },
    { code: 'list', name: '게시글 목록', url: '/board/list' },
  ],
  email: [{ code: 'list', name: '로그 조회', url: '/email/list' }],
  message: [],
  bank: [
    { code: 'list', name: '계좌 목록', url: '/bank/list' },
    {
      code: 'transaction',
      name: '거래 내역 목록',
      url: '/bank/transaction/list',
    },
  ],
  card: [
    {
      code: 'list',
      name: '카드 목록',
      url: '/card/list',
    },
    { code: 'create', name: '카드 등록', url: '/card/create' },
    { code: 'train', name: '카드 학습', url: '/card/train' },
  ],
  loan: [
    { code: 'list', name: '대출 목록', url: '/loan/list' },
    { code: 'create', name: '대출 등록', url: '/loan/create' },
    { code: 'train', name: '대출 학습', url: '/loan/train' },
  ],
}

export default function getMenus(menuCode) {
  return menus[menuCode] ?? []
}
