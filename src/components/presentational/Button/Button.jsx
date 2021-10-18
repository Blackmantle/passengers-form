import React from 'react';
import { Button, Contained, Outlined, Text, StartIcon, EndIcon } from './styled';

const ButtonComp = ({ outlined, startIcon, endIcon, removeTextOnMobile = false, children, ...rest }, ref) => (
  <Button
    {...rest}
    ref={ref}
    as={outlined ? Outlined : Contained}
    removeTextOnMobile={removeTextOnMobile}
  >
    {startIcon && <StartIcon>{startIcon}</StartIcon>}
    <Text>{children}</Text>
    {endIcon && <EndIcon>{endIcon}</EndIcon>}
  </Button>
);

export default React.forwardRef(ButtonComp);