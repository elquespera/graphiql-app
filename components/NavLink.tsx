import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = {
  pathName: string;
  label: string;
};

export default function NavLink({ pathName, label }: NavLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={pathName}
      className={router.pathname == pathName ? 'underline underline-offset-8' : ''}
    >
      {label}
    </Link>
  );
}
