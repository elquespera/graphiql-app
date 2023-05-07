import { logOut, signIn } from '@/auth/firebaseAuth';
import Button from '@/components/Button';
import GraphQLIcon from '@/components/GraphQLIcon';
import LanguageSwitch from '@/components/LanguageSwitch';
import useTranslation from '@/hooks/useTranslation';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import Head from 'next/head';

export default function Home() {
  const t = useTranslation();

  const { isAuth, userEmail } = useAppSelector(selectAuth);

  const signInTest = () => {
    signIn('test@email.com', '12345678');
  };

  return (
    <>
      <Head>
        <title>{`${t('app-name')} - ${t('title-welcome')}`}</title>
      </Head>
      <section className="flex flex-col gap-8 p-4 sm:p-8">
        <div className="flex gap-4 sm:gap-6 items-center">
          <LanguageSwitch className="mr-auto" />
          {isAuth ? (
            <Button href="/editor" className="whitespace-nowrap">
              {t('go-to-main')}
            </Button>
          ) : (
            <>
              <Button href="/sign-in" className="whitespace-nowrap">
                {t('sign-in')}
              </Button>
              {t('or')}
              <Button href="/sign-up" className="whitespace-nowrap">
                {t('sign-up')}
              </Button>
            </>
          )}
        </div>
        <h1 className="text-5xl flex flex-col items-center mt-16">
          <GraphQLIcon className="w-20 h-20" />
          {t('app-name')}
        </h1>

        <h2 className="text-3xl">About</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident laboriosam unde
          voluptatem dolores deserunt animi excepturi ipsam iusto commodi aperiam.
        </p>

        <h2 className="text-3xl">Our team</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi, natus quidem quae placeat
          obcaecati vero nostrum voluptatum fugit eos voluptatibus consectetur molestias ad
          doloremque ipsum illum dignissimos. Officiis officia ex laudantium repudiandae, eius
          repellendus cumque, nesciunt quia quod voluptas porro fugit suscipit ipsam vero et tenetur
          aspernatur esse? Magnam, harum.
        </p>
        <div>
          {isAuth ? (
            <Button onClick={logOut}>Test log out</Button>
          ) : (
            <Button onClick={signInTest}>Test sign in</Button>
          )}
          {userEmail}
        </div>
      </section>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
