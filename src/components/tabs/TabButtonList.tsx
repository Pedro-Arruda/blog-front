import { TabButton } from "./TabButton";

interface TabButtonListProps {
  items: {
    label: string;
    value: string;
  }[];
  activeTab: string;
  onTabClick: (label: string) => void;
}

export const TabButtonList = ({
  activeTab,
  items,
  onTabClick,
}: TabButtonListProps) => (
  <div className="flex flex-col sm:flex-row gap-7 border-b border-neutral-300">
    {items.map((item) => (
      <TabButton
        key={item.value}
        label={item.label}
        isActive={activeTab === item.value}
        onClick={() => onTabClick(item.value)}
      />
    ))}
  </div>
);
