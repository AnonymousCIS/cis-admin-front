import StyledComponentsRegistry from './registry'
import Header from './global/ui/outlines/Header'
// import Footer from './global/ui/outlines/Footer'
import { CommonProvider } from './global/contexts/CommonContext'
import { Metadata } from 'next'
import { getUserInfo } from './member/services/actions'
import { UserProvider } from './global/contexts/UserContext'

// import { styled } from 'styled-components'
import 'react-datepicker/dist/react-datepicker.css'
import './globals.css'

// const MainContent = styled.main`
//   min-height: 600px;
// `

export const metadata: Metadata = {
  title: 'ADMIN - Pintech Project',
  description: 'ADMIN - 카드 & 대출 추천 사이트',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userInfo = await getUserInfo()

  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <UserProvider _userInfo={userInfo}>
            <Header />
            <main className="main-content">
              <CommonProvider>
                <section>{children}</section>
                {/* <Footer /> */}
              </CommonProvider>
            </main>
          </UserProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
