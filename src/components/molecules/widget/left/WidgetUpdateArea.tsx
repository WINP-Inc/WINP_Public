import React from 'react'
import BaseWidget from '../base-layout/BaseWidget'
import styled from 'styled-components'
import Image from 'next/image'
import { BasePrimaryButton } from '@/components/atoms/button/Buttons'

const WidgetContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
`

const WidgetHeader = styled.div`
  margin-bottom: 20px;

  img {
    position: unset !important;
    display: block;
    width: 100%;
    height: 178px;
    object-fit: contain;
  }
`

const WidgetBody = styled.div`
  margin-bottom: 24px;
`

const UpdateTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
`

const UpdateSubTitle = styled.h3`
  color: #FFF;
  font-size: 12px;
  font-weight: 400;
  opacity: 0.699999988079071;
`

const WidgetFooter = styled.div``

const WidgetUpdateArea = () => {
  return (
    <BaseWidget hasSeeAll={false}>
      <WidgetContainer>
        <WidgetHeader>
          <Image layout="fill"  src='/images/bugcity.png' alt='update header image' />
        </WidgetHeader>
        <WidgetBody>
          <UpdateTitle>Bug City</UpdateTitle>
          <UpdateSubTitle>Something something</UpdateSubTitle>
        </WidgetBody>
        <WidgetFooter>
          <BasePrimaryButton py={12}>Visit Bug City</BasePrimaryButton>
        </WidgetFooter>
      </WidgetContainer>
    </BaseWidget>
  )
}

export default WidgetUpdateArea
