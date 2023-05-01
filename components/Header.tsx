interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 h-12 w-full p-2 flex gap-2 items-center bg-slate-800 text-slate-100">
      <h1>GraphiQL</h1>
    </header>
  );
}
