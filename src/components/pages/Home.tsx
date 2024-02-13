import Head from '@/components/shared/Head';
import { useContext } from 'react';
import { UserContext } from '../shared/AuthProvider';

export default function HomeScreen() {
  const userContext = useContext(UserContext);
  return (
    <>
      <Head title="Home" />
      <div className="hero md:bg-md flex flex-grow">
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there {userContext?.name}</h1>
            <p className="mb-5">
              Template for lightning-fast startups with instant hot module replacement and complex responsive layout
              creation
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
