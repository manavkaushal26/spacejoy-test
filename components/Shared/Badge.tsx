type Props = { content: string };

const Badge = ({ content }: Props) => {
  return (
    <span className="px-3 py-1 text-sm font-medium text-gray-500 border border-gray-500 rounded-full">{content}</span>
  );
};

export default Badge;
