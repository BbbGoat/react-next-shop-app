import React from 'react'
import Image, { StaticImageData } from 'next/image';

import letterPath from './images/letter.png'
import lockPath from './images/lock.png'
import showPath from './images/show.png'
import hidePath from './images/hide.png'

interface IIconProps {
    type: 'letter' | 'lock' | 'show' | 'hide';
    alt?: string;
    [x: string]: any;
}

const Icon = ({ type, alt = '', ...restProps }: IIconProps) => {

    let src: StaticImageData;

    switch(type) {
        case 'letter':
          src = letterPath
          break;
        case 'lock':
          src = lockPath
          break;
        case 'show':
          src = showPath
          break;
        case 'hide':
          src = hidePath
          break;
        
        default :
          throw new Error ('지원하는 아이콘 타입이 존재하지 않습니다.');
    }
    
  return (
    <div style={{width: 50, height:50, padding: 7}}>
      <Image src={src} alt={alt} width={36} {...restProps} />
    </div>
  )
}

export default Icon