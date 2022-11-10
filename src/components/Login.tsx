import { Button } from './ui/Button';
import { useAppStore } from '@/store/useAppStore';
import { useOrbis } from '@/orbis/useOrbis';
import toast from 'react-hot-toast';

export const Login = () => {
  const orbis = useOrbis();
  const setUser = useAppStore((state) => state.setUser);

  const connect = async () => {
    const res = await orbis.connect();

    if (res.status == 200) {
      setUser(res.details);
    } else {
      toast.error('Error Connecting');
    }
  };

  return (
    <Button className="w-full" type="submit" onClick={() => connect()}>
      Continue with Metamask
    </Button>
  );
};
