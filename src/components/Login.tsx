import { Button } from './ui/Button';
import { Orbis } from '@orbisclub/orbis-sdk';
import { useAppStore } from '@/store/useAppStore';
import toast from 'react-hot-toast';

const orbis = new Orbis();

export const Login = () => {
  const setUser = useAppStore((state) => state.setUser);

  const connect = async () => {
    const res = await orbis.connect();
    console.log(res);

    if (res.status == 200) {
      setUser(res.details.metadata.address);
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
