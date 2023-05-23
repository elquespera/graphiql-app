import { logOut, signIn } from '@/auth/firebaseAuth';
import Button from '@/components/Button';
import GraphQLIcon from '@/components/GraphQLIcon';
import LanguageSwitch from '@/components/LanguageSwitch';
import useTranslation from '@/hooks/useTranslation';
import { selectAuth } from '@/redux/auth';
import { useAppSelector } from '@/redux/hooks';
import Head from 'next/head';
import Image from 'next/image';
import pavelImage from '@/assets/images/pavel.png';
import sadulloImage from '@/assets/images/sadullo.png';
import tomasImage from '@/assets/images/tomas.png';

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
      <section className="flex flex-col gap-8 p-4 sm:p-8 mb-footer max-w-7xl mx-auto">
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

        <h2 className="text-3xl">{t('about')}</h2>
        <p>{t('about-description')}</p>

        <div>
          {isAuth ? (
            <Button onClick={logOut}>Test log out</Button>
          ) : (
            <Button onClick={signInTest}>Test sign in</Button>
          )}
          {userEmail}
        </div>

        <h2 className="text-3xl">{t('our-team')}</h2>
        <div className="mt-8 flex flex-row flex-wrap justify-center gap-5 sm:gap-12 md:gap-24">
          <div className="flex flex-col items-center">
            <Image src={pavelImage} alt="personal" height={100} width={100} />
            <p className="mt-4 mb-2 text-xl">Pavel</p>
            <p>{t('team-leader')}</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={sadulloImage} alt="personal" height={100} width={100} />
            <p className="mt-4 mb-2 text-xl">Sadullo</p>
            <p>{t('fe-developer')}</p>
          </div>
          <div className="flex flex-col items-center">
            <Image src={tomasImage} alt="personal" height={100} width={100} />
            <p className="mt-4 mb-2 text-xl">Tomas</p>
            <p>{t('fe-developer')}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-center text-3xl">{t('react-course')}</h2>
          <p className="text-center text-green-400 mb-6">{t('react-course-features')}</p>
          <h3 className="text-xl mb-4">{t('target-audience')}</h3>
          <p>{t('course-requirements')}</p>
          <ul className="list-outside list-disc ml-6 mb-5">
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>Git, GitHub (clone, add, commit, push, pull, merge, rebase, pull requests)</li>
            <li>NPM, Webpack</li>
            <li>CSS3 / HTML5</li>
            <li>Chrome DevTools, Figma</li>
            <li>REST APIs</li>
          </ul>
          <div className="flex">
            <Button
              href="https://wearecommunity.io/events/rs-react-2023q1"
              target="_blank"
              rel="noreferrer"
            >
              {t('enroll')}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export { default as getServerSideProps } from '../lib/defaultServerProps';
