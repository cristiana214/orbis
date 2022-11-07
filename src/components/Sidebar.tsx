import { BeakerIcon, PlusIcon } from '@heroicons/react/24/solid';
import clsx from 'clsx';
import Link from 'next/link';
import { ButtonRounded } from './ui/ButtonRounded';

export const Sidebar = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={clsx(
        'no-scrollbar flex h-full flex-col items-end overflow-auto overscroll-contain py-2',
        className,
      )}
    >
      <div className="relative flex items-center px-2">
        <Link href="/">
          <ButtonRounded className="!border-0">
            <BeakerIcon className="h-[36px] w-[36px] text-orbis" />
          </ButtonRounded>
        </Link>
      </div>
      <div className="mt-2 px-2">
        <Link href="/new">
          <ButtonRounded>
            <PlusIcon className="h-[1.2em] w-[1.2em]" />
          </ButtonRounded>
        </Link>
      </div>
    </div>
  );
};
