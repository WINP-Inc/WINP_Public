import React, { FC } from 'react'
import ToolTip from '../../tools/ToolTip';
import SubContentTitleWithIcon from './SubContentTitleWithIcon';
import styled from 'styled-components';

const SubContentWithToolTipWrapper = styled.div`
  cursor: pointer;
  padding: 10px 16px;
  border-radius: 7.341px;
  background: #302A43;

  span {
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

interface SubContentWithToolTipProps {
  description: string;
  icon: string;
  title: string;
}

const SubContentWithToolTip: FC<SubContentWithToolTipProps> = ({ description, icon, title }) => {
  return (
    <ToolTip description={description}>
      <SubContentWithToolTipWrapper>
        <SubContentTitleWithIcon icon={icon} title={title} />
      </SubContentWithToolTipWrapper>
    </ToolTip>
  )
}

export default SubContentWithToolTip
