import styled from "styled-components"
import BaseLayout, { BaseLayoutFlexBox } from "../../templates/BaseLayout";
import WidgetLeftGroup from "../../organisms/home/widget/left/WidgetLeftGroup";
import WidgetRightGroup from "../../organisms/home/widget/right/home/WidgetRightGroup";
import { HomeMainArea } from "../../organisms/home/HomeMainArea";
import media from "styled-media-query";
import { customMedia } from "../../templates/media/customMedia";
import { headerNavOptions } from "@/components/templates/header/customHeaderNav";
import { useProtectedRoute } from "@/routes/protectedRoute";
import { useAuth } from "../../../../context/Auth";
import { useEffect } from "react";
import { usePost } from "../../../../context/Post";
import MobileSuggestedGroups from "@/components/organisms/home/mobile/MobileSuggestedGroups";

const HomeLayoutBody = styled.div`
  margin-top: 25px;
  width: 100%;

  ${media.lessThan('medium')`
    margin-top: 0;
  `}

  ${media.between('medium', 'large')`
    width: auto;
  `}
`

const HomeLayoutFlexBox = styled(BaseLayoutFlexBox)``
const SMain = styled.div`
  ${customMedia.greaterThan('desktop')`
    width: 60%;
  `}

  ${customMedia.between('medium', 'large')`
    width: 66%;
    min-width: 600px
  `}

  ${customMedia.lessThan('small')`
    min-width: 316px;
  `}
`
const SWidgetLeft = styled.div`
  ${customMedia.greaterThan('desktop')`
    width: 33%;
  `}

  ${customMedia.lessThan('medium')`
    display: none;
  `}

  ${customMedia.greaterThan('medium')`
    min-width: 336px;
  `}
`
const SWidgetRight = styled.div`
  ${customMedia.greaterThan('desktop')`
    width: 33%;
  `}

  ${customMedia.lessThan('large')`
    display: none;
  `}

  ${customMedia.between('large', 'desktop')`
    min-width: 336px;
  `}
`

const TabletOnlyWidgetLeft = styled.div`
  display: none;

  ${customMedia.between('medium', 'large')`
    display: block;
    margin-top: 20px;
  `}
`;

const MobileOnlySuggestedGroupsWrapper = styled.div`
  display: none;

  ${customMedia.lessThan('medium')`
    display: block;
  `}
`;

const Home = () => {
  const { user } = useAuth();
  const { setSelectedCategory } = usePost();

  useEffect(() => {
    setSelectedCategory('all');
  }, [setSelectedCategory])

  return (
    <BaseLayout headerNavList={[
      headerNavOptions.homeActive.navItem(),
      headerNavOptions.chart.navItem(),
      headerNavOptions.liveComm.navItem(),
      headerNavOptions.market.navItem(),
    ]}>
      <HomeLayoutBody>
        <MobileOnlySuggestedGroupsWrapper>
          <MobileSuggestedGroups />
        </MobileOnlySuggestedGroupsWrapper>
        <HomeLayoutFlexBox>
          <SWidgetLeft>
            <WidgetLeftGroup user={user} />
            <TabletOnlyWidgetLeft>
              <WidgetRightGroup />
            </TabletOnlyWidgetLeft>
          </SWidgetLeft>
          <SMain>
            <HomeMainArea />
          </SMain>
          <SWidgetRight>
            <WidgetRightGroup />
          </SWidgetRight>
        </HomeLayoutFlexBox>
      </HomeLayoutBody>
    </BaseLayout>
  )
}

export default Home
