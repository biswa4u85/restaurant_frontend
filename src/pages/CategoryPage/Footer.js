import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  background-color: var(--orange);
  color: var(--white);
  border-radius: 15px 15px 0px 0px;
  padding: 0 10px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
`;

const CartTotal = styled.div`
  display: flex;
  align-items: center;
`;

const CartTotalText = styled.p`
  margin: 10px 0;
  font-weight: 700;
`;

const CartPrice = styled.h4`
  margin: 0;
  font-weight: 700;
  display: inline-block;
  color: white !important;
`;

const CartDetails = styled.div`
  display: flex;
  align-items: center;
`;

const CartLink = styled(NavLink)`
  color: white !important;
  text-decoration: none;
  text-align: center;
  margin-top: 10px;
  margin-left: 70px; 
`;

const CartRow = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  margin-left: 2 * 0.25rem;
`;

export function Footer({ cart }) {
  return (
    <>
      {cart?.total > 0 && (
        <StyledFooter>
          <CartTotalText>
            {cart.total} {cart.total < 2 ? 'ITEM' : 'ITEMS'}
          </CartTotalText>
          <CartRow className='row'>
            <div className="col float-start ">
              <CartTotal>
                <CartPrice>₹{cart.price}</CartPrice>
                <span style={{ display: 'inline-block', padding: '5px 0 0 5px' }}>
                  plus taxes
                </span>
              </CartTotal>
            </div>
            <div className="col float-end">
              <CartDetails>
                <CartLink to="/cart" className="text-center">
                  <h6>View Cart</h6>
                </CartLink>
              </CartDetails>
            </div>
          </CartRow>
        </StyledFooter>
      )}
    </>
  );
}
