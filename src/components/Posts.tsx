import { context } from '@/constants';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { PostsItem } from './PostsItem';
import { Block } from './ui/Block';

export const Posts = () => {
  const user = useAppStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any>(null);
  const orbis = useOrbis();

  const loadPosts = async () => {
    setLoading(true);
    const { data, error } = await orbis.getPosts({
      context,
      // only_master: true,
    });

    if (error) {
      console.log('Error querying posts: ', error);
      toast.error('Error querying posts');
      return;
    }

    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {!posts && loading ? (
        <Block>
          <div className="lazy-loading mb-2 rounded-md w-[80%] h-[20px]" />
          <div className="lazy-loading rounded-md w-[50%] h-[20px]" />
        </Block>
      ) : (
        <div className="space-y-4">
          {posts?.map((post: any, i: number) => (
            <PostsItem key={`${post.id}_${i}`} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
