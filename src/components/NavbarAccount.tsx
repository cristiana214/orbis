import { useAppStore } from '../store/useAppStore';
import { Button } from './ui/Button';
import { MenuAccount } from './ui/MenuAccount';
import { Modal } from './ui/Modal';
import { AvatarUser } from './ui/AvatarUser';
import { Login } from './Login';
import { shorten } from '@/helpers/utils';

export const NavbarAccount = () => {
  const showAuthModal = useAppStore((state) => state.showAuthModal);
  const setShowAuthModal = useAppStore((state) => state.setShowAuthModal);
  const user = useAppStore((state) => state.user);

  return user ? (
    <MenuAccount>
      <AvatarUser
        src={`https://robohash.org/${user?.metadata.address}`}
        size="18"
        className="-mr-1 -ml-1 sm:mr-2 md:mr-2 lg:mr-2 xl:mr-2"
      />
      <span className="hidden sm:block">{shorten(user?.metadata.address)}</span>
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
