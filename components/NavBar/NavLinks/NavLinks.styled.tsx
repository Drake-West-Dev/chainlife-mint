import styled from 'styled-components';

export const NavLinksDiv = styled.div`
  display: flex;
  align-items: center;
  ${({ theme }) => theme.isMobile && 'flex-direction: column;'}
  gap: ${({ theme }) => (theme.isMobile ? '2em' : '1.25em')};
`;

export const NavItem = styled.span`
  font-size: ${({ theme }) => (theme.isMobile ? '1.75rem' : '1.25rem')};
  font-weight: ${({ theme }) => (theme.isMobile ? '600' : '500')};
  color: ${(props) => props.theme.colors.textMain};

  :hover {
    color: ${(props) => props.theme.colors.hover};
    cursor: pointer;
  }
`;
