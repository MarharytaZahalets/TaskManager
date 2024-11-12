import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from 'core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const CirclePlusIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 512 512' {...props}>
      <Path
        d='M256 512a256 256 0 100-512 256 256 0 100 512zm-24-168v-64h-64c-13.3 0-24-10.7-24-24s10.7-24 24-24h64v-64c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24h-64v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default CirclePlusIcon;
