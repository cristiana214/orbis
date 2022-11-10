import { Posts } from '@/components/Posts';
import { Layout } from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="lg:flex">
        <div className="relative w-full pr-0 lg:w-3/4 lg:pr-5">
          <Posts />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
