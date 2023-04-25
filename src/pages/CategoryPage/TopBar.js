import React from 'react';
import styled from 'styled-components';
import { itemTypes } from '../../common/consts';
import { NavLink } from 'react-router-dom';
import { AuthModeContext } from '../../contexts';
import { useState } from 'react';

const TopBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-bottom: 1px solid #ddd;
  width: 100%;
`;

const RightContainer = styled.div`
  display: flex;
  margin-top: 7px;
  position: relative;
  left: -20px;
`;

const RadioButtonContainer = styled.div`
  padding: 0 10px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const RadioButtonInput = styled.input`
  margin-right: 5px;
`;

const BackLink = styled(NavLink)`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  color: #333;
  text-decoration: none;
  i {
    margin-right: 5px;
  }
`;

const VegIcon = styled.img`
  vertical-align: baseline;
  margin-right: 5px;
`;

const NonVegIcon = styled.img`
  vertical-align: baseline;
  margin-right: 5px;
  width: 12px;
  height: 14px;
`;

export function TopBar({ type, itemType, setItemType }) {
  const { itemType: itemCategory } = useState(AuthModeContext);
  return (
    <TopBarContainer>
      <div className="left mr-auto">
        <BackLink to="/home">
          <i className="btn_detail fa fa-chevron-left"></i>
          {type}
        </BackLink>
      </div>
      <RightContainer>
        <RadioButtonContainer>
          <RadioButtonLabel>
            <VegIcon src={(itemCategory && itemCategory[itemTypes.veg]) || "https://restaurant.scrollmonkey.com/files/veg.png"} className="float-start" alt="" />
            <RadioButtonInput
              type="radio"
              name="site_name"
              value={'VEG'}
              checked={itemType === 'VEG'}
              onChange={() => setItemType('VEG')}
            />
          </RadioButtonLabel>
        </RadioButtonContainer>
        <RadioButtonContainer>
          <RadioButtonLabel>
            <NonVegIcon src={(itemCategory && itemCategory[itemTypes.nonveg]) || "https://restaurant.scrollmonkey.com/files/Non Veg.png"} className="float-start" alt="" />
            <RadioButtonInput
              type="radio"
              name="site_name"
              value={'Non-veg'}
              checked={itemType === 'Non-veg'}
              onChange={() => setItemType('Non-veg')}
            />
          </RadioButtonLabel>
        </RadioButtonContainer>
      </RightContainer>
    </TopBarContainer>
  );
}
