import { ImageIcon, ListIcon } from 'lucide-react';

import { Tabs } from '@/shared/ui';

export type ViewMode = 'list' | 'cards';

export function ViewModeToggle({
  value,
  onChange
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <Tabs.Root
      defaultValue={value}
      onValueChange={e => onChange(e as ViewMode)}
    >
      <Tabs.List>
        <Tabs.Trigger value="list">
          <ListIcon />
        </Tabs.Trigger>
        <Tabs.Trigger value="cards">
          <ImageIcon />
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
}
