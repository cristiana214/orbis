import { Popover } from '@headlessui/react';
import { useRef, useState } from 'react';
import { AvatarUser } from './ui/AvatarUser';
import { Button } from './ui/Button';
import { Float } from '@headlessui-float/react';
import Link from 'next/link';
import { shorten } from '@/helpers/utils';
import { useCopy } from '@/composables/useCopy';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

export const UserPophover = ({ user }: { user: any }) => {
  const [show, setShow] = useState<boolean>(false);
  const timerOpen = useRef<any>(null);
  const timerClose = useRef<any>(null);
  const { copyToClipboard } = useCopy();

  const open = () => {
    if (timerClose.current !== null) {
      clearTimeout(timerClose.current);
      timerClose.current = null;
    }
    timerOpen.current = setTimeout(() => {
      setShow(true);
    }, 200);
  };

  const delayClose = () => {
    if (timerOpen.current !== null) {
      clearTimeout(timerOpen.current);
      timerOpen.current = null;
    }
    timerClose.current = setTimeout(() => {
      setShow(false);
    }, 150);
  };

  return (
    <Popover>
      <Float
        show={show}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        zIndex={50}
        offset={10}
        shift={16}
        flip={16}
        portal
      >
        <Popover.Button
          className="outline-none"
          onMouseEnter={open}
          onMouseLeave={delayClose}
        >
          <div className="flex items-center">
            <AvatarUser src={user?.metadata.address} size="28" />
            <span className="ml-2 text-skin-link">
              {shorten(user?.metadata.address)}
            </span>
          </div>
        </Popover.Button>
        <Popover.Panel
          static
          className="w-screen outline-none sm:max-w-sm"
          onMouseEnter={open}
          onMouseLeave={delayClose}
        >
          <div className="overflow-hidden rounded-2xl border border-skin-border bg-skin-header-bg shadow-lg">
            <div className="no-scrollbar max-h-[85vh] overflow-y-auto overscroll-contain">
              <div className="p-4">
                <div className="flex">
                  <div>
                    <AvatarUser src={user?.metadata.address} size="69" />
                  </div>
                  <div>
                    <div className="truncate px-3 text-lg font-semibold leading-10 text-skin-heading">
                      {shorten(user?.metadata.address)}
                    </div>
                    <div className="flex px-3 min-w-0 cursor-pointer items-center rounded-full text-sm text-skin-text">
                      <div
                        className="flex cursor-pointer items-center rounded border px-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(user?.metadata.address);
                        }}
                      >
                        {shorten(user?.metadata.address)}
                        <ClipboardDocumentIcon className="ml-1 w-[1em] h-[1em]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex w-full">
                  <div className="w-1/2 pr-2">
                    <Link href={`/${user?.did}`}>
                      <Button primary className="w-full">
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Float>
    </Popover>
  );
};
