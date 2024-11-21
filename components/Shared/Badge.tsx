import { classNames } from '@utils/helpers';

type Props = { content: string; className?: string };

const Badge = ({ content, className }: Props) => {
  return (
    <span
      className={classNames(
        'px-3 py-1 text-sm font-medium transition-all duration-200 border rounded-full cursor-default text-zinc-500 border-zinc-500 hover:border-spj-red hover:text-spj-red',
        className
      )}
    >
      {content}
    </span>
  );
};

export default Badge;
