import { context } from '@/constants';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { AddComment } from './AddComment';
import { CommentsItem } from './CommentsItem';
import { Block } from './ui/Block';

export const Comments = ({ postId }: { postId: string }) => {
  const user = useAppStore((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<any>(null);
  const orbis = useOrbis();

  const loadComments = async () => {
    setLoading(true);
    const { data, error } = await orbis.getPosts({
      context,
      master: postId,
    });

    if (error) {
      console.log('Error querying comments: ', error);
      toast.error('Error querying comments');
      return;
    }

    setComments(data);
    setLoading(false);
  };

  useEffect(() => {
    loadComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const callback = (post: any) => {
    const _comments = [...comments];

    setComments([post, ..._comments]);
  };

  return (
    <>
      {!comments && loading ? (
        <Block>
          <div className="lazy-loading mb-2 rounded-md w-[80%] h-[20px]" />
          <div className="lazy-loading rounded-md w-[50%] h-[20px]" />
        </Block>
      ) : (
        <div className="space-y-4">
          <AddComment callback={callback} postId={postId} />
          {comments?.map((post: any, i: number) => (
            <CommentsItem key={`${post.id}_${i}`} post={post} />
          ))}
        </div>
      )}
    </>
  );
};
