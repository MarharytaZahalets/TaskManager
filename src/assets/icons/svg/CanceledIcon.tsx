import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from 'core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const CanceledIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 512 512' {...props}>
      <Path
        d='M256 512a256 256 0 100-512 256 256 0 100 512zm-81-337c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default CanceledIcon;
