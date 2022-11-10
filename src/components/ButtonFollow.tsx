import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { CheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from './ui/Button';

export const ButtonFollow = ({ creator }: { creator: any }) => {
  const orbis = useOrbis();
  const user = useAppStore((state) => state.user);
  const [isFollowing, setIsFollowing] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>();

  const getIsFollowing = async () => {
    const { data, error } = await orbis.getIsFollowing(user?.did, creator);

    if (error) {
      console.log('Error querying isfollowing: ', error);
      toast.error('Error querying isfollowing');
      return;
    }

    console.log(data);

    setIsFollowing(data);
  };

  const setFollow = async (follow: boolean) => {
    setLoading(true);
    const res = await orbis.setFollow(creator, follow);

    if (res.status === 200) {
      setIsFollowing(follow);
      toast.success(follow ? 'Followed' : 'Unfollowed');
    }

    setLoading(false);
  };

  useEffect(() => {
    getIsFollowing();
  }, [user]);

  if (user?.did === creator) {
    return null;
  }

  return (
    <Button
      loading={loading}
      className={clsx('group min-w-[140px]', {
        'hover:!border-red hover:!bg-red hover:!bg-opacity-5 hover:!text-red':
          isFollowing,
      })}
      onClick={() => setFollow(!isFollowing)}
    >
      {!isFollowing ? (
        <span>Follow</span>
      ) : (
        <span>
          <span className="flex items-center gap-2 group-hover:hidden">
            <CheckIcon className="w-[1.2em] h-[1.2em] text-green" /> Followed
          </span>
          <span className="hidden group-hover:block">Unfollow</span>
        </span>
      )}
    </Button>
  );
};
