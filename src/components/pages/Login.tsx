import LoginForm from '../shared/LoginForm';

export default function AuthenticationPage() {
  return (
    <>
      <div className="container h-screen p-0 m-0">
        <div className="h-full bg-zinc-900 flex-col p-10 text-white lg:flex dark:border-r">
          <div className="z-20 flex items-center text-lg font-medium">Repo Tools</div>
          <div className="mx-auto h-full flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
}
