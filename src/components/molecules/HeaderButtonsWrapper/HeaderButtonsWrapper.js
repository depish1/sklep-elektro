import React from 'react';
import StyledHeaderButtonsWrapper from './HeaderButtonsWrapper.styles';
import { connect } from 'react-redux';
import { menuActions } from 'redux/menu/index';

const HeaderButtonsWrapper = ({ children, isOpen, closeMenu }) => {
  const handleClick = () => {
    closeMenu();
  };
  return (
    <StyledHeaderButtonsWrapper onClick={handleClick} className={isOpen ? 'isVisible' : 0}>
      {children}
    </StyledHeaderButtonsWrapper>
  );
};

const mapDispatchToProps = (dispatch) => ({
  closeMenu: () => dispatch(menuActions.closeMenu()),
});
const mapStateToProps = (state) => ({
  isOpen: state.menu.isOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderButtonsWrapper);
