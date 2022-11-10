import Link from 'next/link';
import { Block } from './ui/Block';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserPophover } from './UserPophover';

dayjs.extend(relativeTime);

export const PostsItem = ({ post }: { post: any }) => {
  return (
    <Link
      href={`/${post.creator}/${post.stream_id}`}
      className="block text-skin-text"
    >
      <Block className="hover:border-skin-text">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <UserPophover user={post.creator_details} />
            </div>
          </div>
          <div className="relative mb-1 break-words pr-[80px] leading-7">
            <h3 className="inline pr-2">{post.content.title ?? 'Untitled'}</h3>
            <p className="mb-2 break-words text-md line-clamp-2">
              {post.content.body}
            </p>
          </div>
        </div>
        <div className="mt-3">
          {dayjs(new Date(post.timestamp * 1000)).fromNow()}
        </div>
      </Block>
    </Link>
  );
};
