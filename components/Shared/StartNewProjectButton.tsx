import ShinyButton from '@components/Button/ShinyButton';
import { oldSpacejoyUrl } from '@utils/config';
import { classNames } from '@utils/helpers';

type StartNewProjectButtonProps = {
  cta?: string;
  center?: boolean;
  className?: string;
};

const StartNewProjectButton = ({
  cta = 'Design Your Room',
  center = false,
  className = '',
}: StartNewProjectButtonProps) => {
  return (
    <ShinyButton
      href={`${oldSpacejoyUrl}/new-project?quiz=start&plan=bliss`}
      className={classNames(center && 'w-fit mx-auto', className)}
      showArrow
      showRing
    >
      {cta}
    </ShinyButton>
  );
};

export default StartNewProjectButton;
