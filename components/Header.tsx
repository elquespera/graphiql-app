import NavLink from './NavLink';

export default function Header() {
  return (
    <header className="fixed left-0 right-0 top-0 h-12 w-full px-8 flex gap-2 justify-between items-center bg-slate-800 text-slate-100">
      <h1>GraphiQL</h1>
      <div className="flex gap-8">
        <NavLink label="Home" pathName="/" />
        <NavLink label="IDE" pathName="/editor" />
      </div>
      <div className="flex gap-4">
        <NavLink label="Sign-in" pathName="/sign-in" />
        <NavLink label="Sign-up" pathName="/sign-up" />
      </div>
    </header>
  );
}
