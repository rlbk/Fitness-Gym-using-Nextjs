import React from "react";

interface IProps {
  title: string;
}

const PageTitle = ({ title }: IProps) => {
  return <h1 className="text-xl font-bold text-gray-600">{title}</h1>;
};

export default PageTitle;
