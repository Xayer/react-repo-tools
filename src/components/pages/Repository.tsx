import { Outlet } from 'react-router-dom';

export default function Repository() {
  return (
    <div>
      <h2 className="text-lg mb-2 font-semibold tracking-tight">Repository</h2>
      <Outlet />
    </div>
  );
}
