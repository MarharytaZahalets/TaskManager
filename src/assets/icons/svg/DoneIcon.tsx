import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from 'core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const DoneIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 512 512' {...props}>
      <Path
        d='M256 512a256 256 0 100-512 256 256 0 100 512zm113-303L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default DoneIcon;
