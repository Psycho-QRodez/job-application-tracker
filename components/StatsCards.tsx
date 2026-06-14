type StatsCardsProps = {
  title: string;
  value: number;
};

export default function StatsCards({
  title,
  value,
}: StatsCardsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
      <p className="text-sm text-gray-900 font-medium">{title}</p>

      <h2 className="mt-2 text-3xl font-bold text-[#165DFF]">
        {value}
      </h2>
    </div>
  );
}