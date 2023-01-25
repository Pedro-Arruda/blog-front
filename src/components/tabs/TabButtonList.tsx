import { TabButton } from "./TabButton";

interface TabButtonListProps {
  labels: string[];
  activeTab: string;
  onTabClick: (label: string) => void;
}

export const TabButtonList = ({
  activeTab,
  labels,
  onTabClick,
}: TabButtonListProps) => (
  <div className="flex gap-7 border-b border-neutral-300">
    {labels.map((label) => (
      <TabButton
        key={label}
        label={label}
        isActive={activeTab === label}
        onClick={() => onTabClick(label)}
      />
    ))}
  </div>
);
