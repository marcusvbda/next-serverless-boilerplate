import React, { useState } from 'react';
import { StyledRenderSlot } from '../styles';
import { DynamicTag } from './DynamicTag';

export const RenderSlot = (props:any) => {
  const [slotArray] = useState(props.slots || []);
  
  return (
      <StyledRenderSlot>
        {slotArray.map((row:any,i:any) => (
          <DynamicTag key={i} attrs={row.attributes} tag={row.tag} slots={row.children} />
        ))}
      </StyledRenderSlot>
  );
}