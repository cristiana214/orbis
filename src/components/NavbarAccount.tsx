import { useAppStore } from '../store/useAppStore';
import { Button } from './ui/Button';
import { MenuAccount } from './ui/MenuAccount';
import { Modal } from './ui/Modal';
import { AvatarUser } from './ui/AvatarUser';
import { Login } from './Login';
import { shorten } from '@/helpers/utils';
import { useEffect, useState } from 'react';
import { useOrbis } from '@/orbis/useOrbis';

export const NavbarAccount = () => {
  const showAuthModal = useAppStore((state) => state.showAuthModal);
  const setShowAuthModal = useAppStore((state) => state.setShowAuthModal);
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const userLoading = useAppStore((state) => state.userLoading);
  const setUserLoading = useAppStore((state) => state.setUserLoading);

  const orbis = useOrbis();

  const checkUserIsConnected = async () => {
    setUserLoading(true);
    const res = await orbis.isConnected();

    if (res && res.status == 200) {
      setUser(res.details);
    }

    setUserLoading(false);
  };

  useEffect(() => {
    if (!user) {
      checkUserIsConnected();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return !user && userLoading ? (
    <Button loading />
  ) : user ? (
    <MenuAccount>
      <AvatarUser
        src={user?.metadata.address}
        size="18"
        className="-mr-1 -ml-1 sm:mr-2 md:mr-2 lg:mr-2 xl:mr-2"
      />
      <span className="hidden sm:block">
        {user?.profile?.username ?? shorten(user?.metadata.address)}
      </span>
    </MenuAccount>
  ) : (
    <>
      <Button onClick={() => setShowAuthModal(true)}>Login</Button>
      <Modal
        title="Login"
        open={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      >
        <div className="m-4 space-y-2">
          <Login />
        </div>
      </Modal>
    </>
  );
};
