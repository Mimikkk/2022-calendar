import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import { Children } from 'react';
import cx from 'classnames';
import s from './Button.module.scss';

export interface ButtonProps extends PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> {
  variant?: 'text' | 'contained';
}

export const Button: FC<ButtonProps> = ({ children, variant = 'contained', ...props }) => (
  <button
    {...props}
    className={cx(
      s.button,
      s[`variant-${variant}`],
      { ['pr-2']: variant === 'text' && Children.toArray(children).length > 1 },
      props.className,
    )}>
    {children}
  </button>
);
