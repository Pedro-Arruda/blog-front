import { cloneElement, useEffect, useState } from "react";
import { TabButtonList } from "./TabButtonList";

interface TabsProps {
  labels: string[];
  children: JSX.Element[];
  defaultTab?: string;
}

export const Tabs = ({ children, labels, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(() =>
    defaultTab
      ? labels.find((label) => label === defaultTab) || labels[0]
      : labels[0]
  );
  const [applyAnimation, setApplyAnimation] = useState(false);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setApplyAnimation(false);
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [applyAnimation]);

  const handleChangeTab = (label: string) => {
    setApplyAnimation(true);
    setActiveTab(label);
  };

  return (
    <div className="flex flex-col gap-7">
      <TabButtonList
        labels={labels}
        activeTab={activeTab}
        onTabClick={handleChangeTab}
      />

      <div className="mt-2">
        {cloneElement(
          children[labels.findIndex((value) => value === activeTab)]
        )}
      </div>
    </div>
  );
};
