import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { Colors } from 'core/theme/colors';

type Props = {
  size?: number;
  color?: string;
  width?: number;
  height?: number;
};

const GeolocationIcon: React.FC<Props> = (props: Props) => {
  return (
    <Svg viewBox='0 0 512 512' {...props}>
      <Path
        d='M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l73.4 73.4H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h370.7l-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z'
        fill={props?.color || Colors.text}
      />
    </Svg>
  );
};

export default GeolocationIcon;
