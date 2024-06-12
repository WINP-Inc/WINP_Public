import { customMedia } from "@/components/templates/media/customMedia"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { useDeviceType } from "../../../../hooks/windowSize"

const Logo2TabAndPC = styled.div`
  width: 135px;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }

  img {
    position: static !important;
  }

  ${customMedia.lessThan('medium')`
    width: 50px;
  `}
`;


export const HeaderLogo = () => {
  const [logoUrl, setLogoUrl] = useState<string>('/icons/logo.svg');
  const router = useRouter();
  const { isDesktop } = useDeviceType();

  useEffect(() => {
    if (isDesktop) {
      setLogoUrl('/icons/logo.svg');
    } else {
      setLogoUrl('/icons/logo-mobile.svg');
    }
  }, [isDesktop])

  useEffect(() => {
    router.prefetch('/home')
  }, [router])

  const redirectToHomePage = () => {
    router.push('/home');
  }

  return (
    <>
      <Logo2TabAndPC onClick={redirectToHomePage}>
        <Image layout="fill" src={logoUrl} alt='logo.svg' />
      </Logo2TabAndPC>
    </>
  )
}