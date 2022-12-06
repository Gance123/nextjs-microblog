import { ReactNode } from "react";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.scss";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const name: string = "Gansu Code";
export const siteTitle = "Next.js blog";

type Props = {
  children: ReactNode;
  home?: any;
};

export function Layout(props: Props) {
  const { children, home } = props;
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              className={`${utilStyles.borderCircle} ${styles.headerHomeImage}`}
              src="/images/profile.png"
              alt=""
              width={100}
              height={100}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Image
              className={utilStyles.borderCircle}
              src="/images/profile.png"
              alt=""
              width={100}
              height={100}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div>
          <Link href="/">← ホームへ戻る</Link>
        </div>
      )}
    </div>
  );
}
