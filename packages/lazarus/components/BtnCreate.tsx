import { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { lzResolver } from "../utils";

const Button = styled.button`
  margin-left: auto;
  padding: 10px 20px;
  color: white;
  border-radius: 8px;
  font-weight: 500;
  line-height: 1.25rem;
  font-size: .975rem;
  background-color: var(--primary);

  &:hover:enabled {
    filter: brightness(150%);
    transition: .5s;
  }

  @media(max-width: 900px) {
    order: 0;
    width: 100%;
    padding: 16px 20px;
    line-height: 1.5rem;
    margin-bottom: 30px;
  }
`;

export const BtnCreate = (props:any) => {
  const [visible, setVisible] = useState(false);

  const fetchAcl = useCallback(async () => {
    const request = await lzResolver("canCreate",{
      resource: props.resource
    })
    if(request?.result) setVisible(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  useEffect(() => {
    fetchAcl()
  }, [fetchAcl]);

  return visible ? (
    <Button>
      {props.children}
    </Button>
  ) : null;
};