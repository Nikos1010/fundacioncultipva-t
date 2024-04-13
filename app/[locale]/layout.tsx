import i18nConfig from '@/i18nConfig';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { dir } from 'i18next';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import Header from '../../components/Header';
import Footer from '../../components/Footer/Footer';
import { ROUTES } from '@/constants/routes';
import bg from '../../public/background.png';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '@/app/i18n';
import LanguageChanger from '@/components/LanguageChanger';
import DonateModal from '../../components/IconDonate/IconDonate';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fundacion Cultipva-t',
  description: 'Fundación cultivando principios y valores'
};

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

const i18nNamespaces = ['all'];

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  const headerPages = [
    ROUTES.HOME,
    ROUTES.ACTION,
    ROUTES.PARTICIPATE,
    ROUTES.HISTORY,
    ROUTES.CONTACT
  ];

  return (
    <html lang={locale} dir={dir(locale)}>
      <body
        className={inter.className}
        style={{
          backgroundImage: `url(${bg.src})`
        }}>
        <AppRouterCacheProvider>
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}>
            <Header pages={headerPages} />
            <LanguageChanger />
            {false && <DonateModal /> }
            <main>{children}</main>
            <Footer />
          </TranslationsProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
