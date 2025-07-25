"use client";

type OverviewProps = {
  source: Array<any>;
};

export function Overview({ source }: Readonly<OverviewProps>) {
  return (
    <div>
      {source.length > 0 ? (
        <>
          {source.map((item) => (
            <Metric
              key={item.id}
              label={item.name}
              value={item.status}
              icon={<Users />}
              iconColor={
                item.status === "CONFIRMED"
                  ? "bg-green-100 text-green-600"
                  : "bg-primary/10 text-primary"
              }
              description={
                item.seatNumber
                  ? `Place: ${item.seatNumber}`
                  : "Aucune place attribuée"
              }
            />
          ))}
        </>
      ) : (
        <section className="w-full h-[240px] bg-slate-200 rounded-xl flex items-center justify-center">
          Aucune donnée trouvée
        </section>
      )}
    </div>
  );
}

import { BadgeCheck, Ban, Users, Ticket } from "lucide-react";

type MetricProps = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconColor?: string;
  labelColor?: string;
  contentColors?: string;
  description?: string;
};

function Metric({
  label,
  value,
  icon,
  iconColor = "bg-primary/10 text-primary",
  labelColor = "text-primary",
  contentColors = "bg-primary/15 text-primary border-primary",
  description,
}: Readonly<MetricProps>) {
  return (
    <div
      className={`flex-1 h-32 flex items-center gap-4 rounded-lg p-5 min-w-[220px] border-2 ${contentColors}`}
    >
      <div
        className={`flex items-center justify-center rounded-full size-12 ${iconColor}`}
      >
        {icon}
      </div>

      <div>
        <div className="text-xs text-gray-500 font-medium">{label}</div>
        <div className={`text-2xl font-bold ${labelColor}`}>{value}</div>
        {description && (
          <div className="text-xs text-gray-400 mt-1">{description}</div>
        )}
      </div>
    </div>
  );
}

// Optionally, you can export the icons for use in Overview
export { Metric, BadgeCheck, Ban, Users, Ticket };
export type { MetricProps };
