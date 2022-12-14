import { Float } from '@headlessui-float/react';
import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import type { Placement } from '@floating-ui/dom';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';

export const MenuAccount = ({
  children,
  placement = 'bottom-end',
}: {
  children: ReactNode;
  placement?: Placement;
}) => {
  const { push, reload } = useRouter();
  const orbis = useOrbis();
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  const logout = () => {
    const res = orbis.logout();
    if (res.status === 200) {
      setUser(null);
    }

    reload();
  };

  return (
    <Menu as="div" className="inline-block h-full text-left">
      <Float
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        offset={8}
        shift={6}
        flip={16}
        zIndex={50}
        placement={placement}
      >
        <Menu.Button className="button px-[22px] border border-skin-border bg-transparent text-skin-link text-[18px] rounded-[23px] h-[46px] flex items-center hover:border-skin-text">
          {children}
        </Menu.Button>
        <Menu.Items className="overflow-hidden z-50 rounded-2xl border bg-skin-header-bg shadow-lg outline-none">
          <div className="no-scrollbar max-h-[300px] overflow-auto">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(
                    active
                      ? 'bg-skin-border text-skin-link'
                      : 'bg-skin-header-bg text-skin-text',
                    'cursor-pointer whitespace-nowrap px-3 py-2',
                  )}
                  onClick={() => push(`/${user.did}`)}
                >
                  View profile
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={clsx(
                    active
                      ? 'bg-skin-border text-skin-link'
                      : 'bg-skin-header-bg text-skin-text',
                    'cursor-pointer whitespace-nowrap px-3 py-2',
                  )}
                  onClick={() => logout()}
                >
                  Log out
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Float>
    </Menu>
  );
};
