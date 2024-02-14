import { Outlet } from 'react-router-dom';

export default function Repository() {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold tracking-tight">Repository</h2>
      <Outlet />
    </div>
  );
}
