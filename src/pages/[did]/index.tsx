import { ModalProfileForm } from '@/components/ModalProfileForm';
import { Posts } from '@/components/Posts';
import { useCopy } from '@/composables/useCopy';
import { shorten } from '@/helpers/utils';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ButtonFollow } from '../../components/ButtonFollow';
import { Layout } from '../../components/Layout';
import { AvatarUser } from '../../components/ui/AvatarUser';
import { Block } from '../../components/ui/Block';
import { Button } from '../../components/ui/Button';

const Profile = () => {
  const {
    query: { did },
    pathname,
  } = useRouter();

  const orbis = useOrbis();
  const { copyToClipboard } = useCopy();
  const [loading, setLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [open, setIsOpen] = useState<boolean>(false);

  const user = useAppStore((state) => state.user);

  const loadProfile = async () => {
    setLoading(true);
    const { data, error } = await orbis.getProfile(did);

    if (error) {
      return <Error statusCode={404} />;
    }

    console.log(data);

    setProfile(data);
    setLoading(false);
  };

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [did]);

  return (
    <Layout>
      <div className="lg:flex">
        <div className="w-full lg:w-1/4">
          {!profile && loading ? (
            <div className="mb-4 lg:fixed lg:mb-0 lg:w-[240px]">
              <Block slim className="overflow-hidden">
                <div className="flex px-4 pt-3 text-center lg:block lg:h-[253px]">
                  <div className="mb-2 flex lg:mb-3 lg:block">
                    <div className="lazy-loading mx-auto h-[80px] w-[80px] rounded-full" />

                    <div className="ml-3 flex flex-col items-start justify-center lg:mt-3 lg:ml-0 lg:items-center">
                      <div className="lazy-loading mb-2 h-[28px] w-[130px] rounded-md bg-skin-text" />
                      <div className="lazy-loading h-[26px] w-[100px] rounded-md bg-skin-text" />
                    </div>
                  </div>
                  <div className="ml-3 flex items-center justify-center gap-x-2 lg:ml-0">
                    <Button className="w-[120px] cursor-wait">Follow</Button>
                  </div>
                </div>
              </Block>
            </div>
          ) : (
            <div className="mb-4 lg:fixed lg:mb-0 lg:w-[240px]">
              <Block slim className="overflow-hidden">
                <div className="lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto">
                  <div className="block px-4 pt-4 text-center md:flex lg:block lg:px-0 lg:pt-0">
                    <div className="flex lg:block">
                      <AvatarUser
                        src={profile?.address}
                        size="80"
                        className="lg:my-3"
                      />
                      <div className="mx-3 flex flex-col justify-center truncate text-left lg:block lg:text-center">
                        <h3 className="mb-[2px] flex items-center lg:justify-center">
                          <div className="mr-1 truncate">
                            {shorten(profile?.address)}
                          </div>
                        </h3>
                        <div className="mb-[12px] flex space-x-2 px-3 leading-5 lg:justify-center">
                          <div
                            className="flex cursor-pointer items-center rounded border px-1 text-xs"
                            onClick={() => copyToClipboard(profile?.address)}
                          >
                            {shorten(profile?.address)}
                            <ClipboardDocumentCheckIcon className="ml-1 w-[1em] h-[1em]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {user?.did === did ? (
                      <div className="flex flex-grow items-start justify-end gap-x-2 lg:mb-4 lg:justify-center">
                        <Button onClick={() => setIsOpen(true)}>
                          Edit profile
                        </Button>
                        <ModalProfileForm
                          open={open}
                          onClose={() => setIsOpen(false)}
                          profile={profile}
                        />
                      </div>
                    ) : (
                      <div className="flex flex-grow items-start justify-end gap-x-2 lg:mb-4 lg:justify-center">
                        <ButtonFollow creator={user?.did} />
                      </div>
                    )}
                  </div>

                  <div className="no-scrollbar mt-4 flex overflow-y-auto lg:my-3 lg:block">
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                              pathname === '/[did]',
                          },
                        )}
                      >
                        Posts
                      </div>
                    </Link>
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                              pathname === '/[did]/about',
                          },
                        )}
                      >
                        About
                      </div>
                    </Link>
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                              pathname === '/[did]/followers',
                          },
                        )}
                      >
                        <div className="flex space-x-2">
                          <span className="h-[20px] min-w-[20px] rounded-full bg-skin-text px-1 text-center text-xs leading-normal text-white my-auto">
                            {profile?.count_followers}
                          </span>
                          <span>Followers</span>
                        </div>
                      </div>
                    </Link>
                    <Link href="/">
                      <div
                        className={clsx(
                          'block cursor-pointer whitespace-nowrap px-4  py-2 text-skin-link hover:bg-skin-bg',
                          {
                            'border-l-[0px] border-b-[3px] !pl-[21px] lg:border-b-[0px] lg:border-l-[3px]':
                              pathname === '/[did]/following',
                          },
                        )}
                      >
                        <div className="flex space-x-2">
                          <span className="h-[20px] min-w-[20px] rounded-full bg-skin-text px-1 text-center text-xs leading-normal text-white my-auto">
                            {profile?.count_following}
                          </span>
                          <span>Following</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </Block>
            </div>
          )}
        </div>

        <div className="relative w-full pl-0 lg:w-3/4 lg:pl-5">
          <Block className="mb-3">{profile?.details.profile?.data.bio}</Block>

          <div className="relative mb-3 flex px-3 md:px-0">
            <div className="flex-auto">
              <div className="flex flex-auto items-center">
                <h2>Posts</h2>
              </div>
            </div>
          </div>

          <div className="my-4 space-y-4">
            <Posts options={{ did: profile?.did }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
