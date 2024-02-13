import Head from '@/components/shared/Head';
import { useContext } from 'react';
import { UserContext } from '../shared/AuthProvider';

export default function HomeScreen() {
  const userContext = useContext(UserContext);
  return (
    <>
      <Head title="Home" />
      <div className="hero">
        <div className="hero-content text-center text-neutral-content">
          <h1 className="mb-5 text-5xl font-bold">Hello there {userContext?.name}</h1>
        </div>
      </div>
    </>
  );
}
