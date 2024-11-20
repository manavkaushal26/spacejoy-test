type Props = { content: string };

const Badge = ({ content }: Props) => {
  return (
    <span className="px-3 py-1 text-sm font-medium text-gray-500 transition-all duration-200 border border-gray-500 rounded-full cursor-default hover:border-spj-red hover:text-spj-red">
      {content}
    </span>
  );
};

export default Badge;
