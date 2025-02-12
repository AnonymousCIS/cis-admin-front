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
  email: [],
  message: [],
  bank: [
    { code: 'list', name: '계좌 목록', url: '/bank/list' },
    { code: 'edit', name: '계좌 수정', url: '/bank/edit' },
  ],
  card: [
    {
      code: 'list',
      name: '카드 목록',
      url: '/card/list',
    },
    { code: 'create', name: '카드 등록', url: '/card/create' },
  ],
  loan: [],
}

export default function getMenus(menuCode) {
  return menus[menuCode] ?? []
}
