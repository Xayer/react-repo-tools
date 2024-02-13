import Head from '@/components/shared/Head';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function NotFoundScreen() {
  return (
    <>
      <Head title="Page not found" />
      <div className="hero flex-grow">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Page not found</h1>
            <Link to="/">
              <Button className="m-10 my-10">Go to homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
