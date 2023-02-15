import IconRegistry from '@heroicons/react/24/solid';
import type { FC, SVGProps } from 'react';
import type { Unpostfix } from '@/types/utilities';
import cx from 'classnames';

export type IconType = Unpostfix<keyof typeof IconRegistry, 'Icon'>;
export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconType;
}
export const Icon: FC<IconProps> = ({ name, className, ...props }) => {
  const Icon: FC = IconRegistry[`${name}Icon`];

  return <Icon {...props} className={cx('w-6 h-6', className)} />;
};
