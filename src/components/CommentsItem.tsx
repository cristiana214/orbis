import Link from 'next/link';
import { Block } from './ui/Block';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { UserPophover } from './UserPophover';

dayjs.extend(relativeTime);

export const CommentsItem = ({ post }: { post: any }) => {
  return (
    <Link
      href={`/${post.creator_details.metadata.address}/${post.stream_id}`}
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
            <p className="mb-2 break-words text-md line-clamp-2">
              {post.content.body}
            </p>
          </div>
        </div>
      </Block>
    </Link>
  );
};
