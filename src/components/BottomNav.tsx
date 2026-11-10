import { router, usePathname, type Href } from 'expo-router';
import { Nav } from './primitives/Nav';
import { NavItem } from './primitives/NavItem';
import type { IconName } from './primitives/Icon';
import { useLayoutInsets } from '../hooks/useLayoutInsets';

interface NavTab {
  label: string;
  href: Href;
  path: string;
  icon: IconName;
  activeIcon: IconName;
}

const tabs: NavTab[] = [
  { label: 'Home', href: '/', path: '/', icon: 'home-outline', activeIcon: 'home' },
  { label: 'Messages', href: '/messages', path: '/messages', icon: 'chatbubble-ellipses-outline', activeIcon: 'chatbubble-ellipses' },
  { label: 'Tasks', href: '/tasks', path: '/tasks', icon: 'document-text-outline', activeIcon: 'document-text' },
  { label: 'Patients', href: '/patients', path: '/patients', icon: 'people-outline', activeIcon: 'people' },
  { label: 'Alerts', href: '/notifications', path: '/notifications', icon: 'notifications-outline', activeIcon: 'notifications' },
];

function isActive(tab: NavTab, pathname: string): boolean {
  if (tab.path === '/') return pathname === '/';
  return pathname === tab.path || pathname.startsWith(`${tab.path}/`);
}

// Bottom navigation shown on every screen of the logged-in app.
export function BottomNav() {
  const pathname = usePathname();
  const { bottom } = useLayoutInsets();

  return (
    <Nav bottomInset={bottom}>
      {tabs.map((tab) => {
        const active = isActive(tab, pathname);
        return (
          <NavItem
            key={tab.label}
            label={tab.label}
            icon={active ? tab.activeIcon : tab.icon}
            active={active}
            onPress={() => router.navigate(tab.href)}
          />
        );
      })}
    </Nav>
  );
}
