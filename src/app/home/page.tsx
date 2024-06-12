'use client'
import dynamic from 'next/dynamic'
import ReactModal from 'react-modal'

const Home = dynamic(() => import('../../components/pages/home/Home'), { ssr: false })

ReactModal.setAppElement('body')

const Page = () => {
  return (
    <div id='react-modal'>
      <Home />
    </div>
  )
}

export default Page
