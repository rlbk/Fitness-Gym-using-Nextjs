import React from "react";

interface IProps {
  title: string;
  description: string;
  value: number;
  isCurrency?: boolean;
}

const DashboardCard = ({ description, title, value, isCurrency }: IProps) => {
  return (
    <div className="border border-gray-500 p-5 rounded">
      <h2 className="text-sm font-bold">{title}</h2>
      <p className="text-gray-700 font-medium text-xs">{description}</p>
      <h3 className="text-6xl font-bold text-center my-5">
        {isCurrency ? `$${value}` : value}
      </h3>
    </div>
  );
};

export default DashboardCard;
