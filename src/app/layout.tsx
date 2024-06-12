import '../styles/index'
import './globals.css'
import Head from 'next/head'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { AuthProvider } from '../../context/Auth'
import { UserProvider } from '../../context/User'
import { FileUploadProvider } from '../../context/FileUpload'
import { ChatProvider } from '../../context/Chat'
import { SocketProvider } from '../../context/Socket'
import { NotificationProvider } from '../../context/Notification'
import { PostProvider } from '../../context/Post'
import { LivestreamProvider } from '../../context/Livestream'
import NFTTransactionProvider from '../../context/nft/NFTTransaction'
import { WalletConnectProvider } from '../../context/wallet/WalletConnect'
import { WagmiConfigProvider } from '../../context/wallet/WagmiConfig'
import { SystemChatProvider } from '../../context/SystemChat'
import { NFTAuctionProvider } from '../../context/nft/NFTAuction'
import { CoinStampProvider } from '../../context/coin/CoinStamp'
import { AirdropOptionsProvider } from '../../context/airdrop/AirdropOptions'
import { SearchProvider } from '../../context/search/Search'
import { EditProfileProvider } from '../../context/EditProfile'

export const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin-ext', 'devanagari', 'latin'],
})

export const metadata: Metadata = {
  title: 'WINP - A Interactive Web3 Community',
  description: 'WINP is a Interactive Web3 Community',
  icons: [
    {
      url: '/favicon-16x16.png',
      href: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: '/favicon-32x32.png',
      href: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: '/favicon-48x48.png',
      href: '/favicon-48x48.png',
      sizes: '48x48',
      type: 'image/png',
    },
    {
      url: '/favicon-64x64.png',
      href: '/favicon-64x64.png',
      sizes: '64x64',
      type: 'image/png',
    },
    {
      url: '/favicon-96x96.png',
      href: '/favicon-96x96.png',
      sizes: '128x128',
      type: 'image/png',
    },
    {
      url: '/favicon-256x256.png',
      href: '/favicon-256x256.png',
      sizes: '256x256',
      type: 'image/png',
    }
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <WagmiConfigProvider>
        <WalletConnectProvider>
          <PostProvider>
            <SocketProvider>
              <UserProvider>
                <SearchProvider>
                  <LivestreamProvider>
                    <SystemChatProvider>
                      <NotificationProvider>
                        <FileUploadProvider>
                          <ChatProvider>
                            <NFTTransactionProvider>
                              <CoinStampProvider>
                                <NFTAuctionProvider>
                                  <AirdropOptionsProvider>
                                    <EditProfileProvider>
                                      <html lang='en'>
                                        <Head>
                                          <link rel='icon' href='./favicon.ico' />
                                        </Head>
                                        <body className={inter.className} id='root'>{children}</body>
                                      </html>
                                    </EditProfileProvider>
                                  </AirdropOptionsProvider>
                                </NFTAuctionProvider>
                              </CoinStampProvider>
                            </NFTTransactionProvider>
                          </ChatProvider>
                        </FileUploadProvider>
                      </NotificationProvider>
                    </SystemChatProvider>
                  </LivestreamProvider>
                </SearchProvider>
              </UserProvider>
            </SocketProvider>
          </PostProvider>
        </WalletConnectProvider>
      </WagmiConfigProvider>
    </AuthProvider>
  )
}
