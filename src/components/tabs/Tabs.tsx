import { useState } from "react";
import { TabButtonList } from "./TabButtonList";

interface TabsProps {
  items: {
    label: string;
    value: string;
  }[];
  defaultTab?: string;
  onChangeTab?: (value: string) => void;
}

export const Tabs = ({ items, defaultTab, onChangeTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(() =>
    defaultTab
      ? items.find((item) => item.value === defaultTab)?.value || items[0].value
      : items[0].value
  );

  const handleChangeTab = (value: string) => {
    setActiveTab(value);

    if (onChangeTab) {
      onChangeTab(value);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <TabButtonList
        items={items}
        activeTab={activeTab}
        onTabClick={handleChangeTab}
      />
    </div>
  );
};
