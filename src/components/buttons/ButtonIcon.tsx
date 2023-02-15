import { Icon, IconType } from '@/components/containers/Icon';
import { Button, type ButtonProps } from '@/components/buttons/Button';
import { FC } from 'react';

interface ButtonIconProps extends ButtonProps {
  icon: IconType;
  direction?: 'left' | 'right';
}

export const ButtonIcon: FC<ButtonIconProps> = ({ children, direction = 'left', icon, ...props }) => (
  <Button {...props}>
    {direction === 'left' ? <Icon name={icon} /> : null}
    {children}
    {direction === 'right' ? <Icon name={icon} /> : null}
  </Button>
);
