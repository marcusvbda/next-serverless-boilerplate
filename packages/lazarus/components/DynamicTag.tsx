import React, { useMemo } from 'react';

export const DynamicTag = (props:any) => {
  const { tag, attrs } = props;
  const Tag = tag || 'div';
  const children = props.slots ?? ""
  const childrenIsString  = useMemo(() => typeof children === 'string', [children])
  
  return (
    <Tag {...attrs}>
      {childrenIsString ? children : (
        children.map((child:any, i:any) => (
          <DynamicTag key={i} attrs={child.attributes} tag={child.tag} slots={child.children} />
        ))
      )}
    </Tag>
  );
}