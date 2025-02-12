import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>찾을 수 없습니다..</h2>
      <Link href="/">메인으로</Link>
    </div>
  )
}
