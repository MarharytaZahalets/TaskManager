import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from 'core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const InProcessIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 512 512' {...props}>
      <Path
        d='M256 0a256 256 0 110 512 256 256 0 110-512zm-24 120v136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default InProcessIcon;
