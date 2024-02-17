import LoginForm from '../shared/LoginForm';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../shared/AuthProvider';

export default function AuthenticationPage() {
  const userContext = useContext(UserContext);
  return userContext?.name ? (
    <Navigate to="/" />
  ) : (
    <div className="h-full flex-col p-10 text-white lg:flex">
      <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <LoginForm />
      </div>
    </div>
  );
}
