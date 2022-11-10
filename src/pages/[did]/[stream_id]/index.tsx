import { useRouter } from 'next/router';
import { Markdown } from '../../../components/ui/Markdown';
import { Layout } from '../../../components/Layout';
import Error from 'next/error';
import { useEffect, useState } from 'react';
import { useOrbis } from '@/orbis/useOrbis';
import { Block } from '@/components/ui/Block';
import { AvatarUser } from '@/components/ui/AvatarUser';
import { shorten } from '@/helpers/utils';
import { ButtonFollow } from '@/components/ButtonFollow';
import { UserPophover } from '@/components/UserPophover';
import { useInView } from 'react-cool-inview';
import { ButtonComment } from '@/components/ButtonComment';
import clsx from 'clsx';
import { Comments } from '@/components/Comments';
import { useCopy } from '@/composables/useCopy';
import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const Post = () => {
  const {
    query: { stream_id },
  } = useRouter();

  const orbis = useOrbis();
  const { observe, inView } = useInView();

  const { copyToClipboard } = useCopy();

  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<any>(null);

  const loadPost = async () => {
    setLoading(true);
    const { data, error } = await orbis.getPost(stream_id);

    if (error) {
      return <Error statusCode={404} />;
    }

    setPost(data);
    setLoading(false);
  };

  useEffect(() => {
    loadPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stream_id]);

  return (
    <Layout>
      <div className="lg:flex">
        <div className="relative w-full pr-0 lg:w-3/4 lg:pr-5">
          {!post && loading ? (
            <div className="space-y-3">
              <div className="lazy-loading rounded-md w-full h-[34px]" />
              <div className="lazy-loading rounded-md w-[40%] h-[34px]" />
              <div className="lazy-loading rounded-md w-[65px] h-[28px]" />
            </div>
          ) : (
            <>
              <div className="px-3 md:px-0">
                <h1 className="mb-3 break-words text-xl leading-8 sm:text-2xl">
                  {post?.content.title}
                </h1>
                <div className="mb-4 flex flex-col sm:flex-row sm:space-x-1">
                  <div className="flex grow items-center space-x-1 justify-between">
                    <UserPophover user={post?.creator_details} />
                  </div>
                </div>

                <Markdown source={post?.content.body} />

                <div
                  className={clsx(
                    !inView ? 'sticky flex bottom-3 justify-center' : 'hidden',
                  )}
                >
                  <div className="bg-skin-bg border border-skin-border text-skin-text shadow-lg h-[46px] px-[22px] rounded-[23px] flex items-center space-x-4">
                    <ButtonComment />
                  </div>
                </div>

                <div ref={observe} className="py-4 flex justify-between">
                  <div className="flex items-center space-x-4">
                    <ButtonComment />
                  </div>
                </div>

                <Comments postId={stream_id as string} />
              </div>
            </>
          )}
        </div>

        <div className="float-right w-full lg:w-1/4">
          <div className="mb-4 lg:fixed lg:mb-0 lg:w-[240px]">
            <Block className="overflow-hidden">
              <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                <div className="truncate lg:text-center">
                  <div className="flex truncate lg:mt-3 lg:block">
                    <div className="flex lg:justify-center">
                      <AvatarUser
                        src={post?.creator_details.metadata.address}
                        size="80"
                        className="lg:my-3"
                      />
                    </div>
                    <div className="mx-3 flex flex-col justify-center truncate text-left lg:block lg:text-center">
                      <h3 className="mb-[2px] flex items-center lg:justify-center">
                        <div className="mr-1 truncate">
                          {post?.creator_details.profile?.username ??
                            shorten(post?.creator_details.metadata.address)}
                        </div>
                      </h3>
                      <div className="mb-[12px] flex space-x-2 px-3 leading-5 lg:justify-center">
                        <div
                          className="flex cursor-pointer items-center rounded border px-1 text-xs"
                          onClick={() =>
                            copyToClipboard(
                              post?.creator_details.metadata.address,
                            )
                          }
                        >
                          {shorten(post?.creator_details.metadata.address)}
                          <ClipboardDocumentIcon className="ml-1 w-[1em] h-[1em]" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-grow items-start justify-end gap-x-2 lg:mb-4 lg:justify-center">
                    <ButtonFollow creator={post?.creator} />
                  </div>
                </div>
              </div>
            </Block>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
