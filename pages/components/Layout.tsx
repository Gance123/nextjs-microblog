import { ReactNode } from "react";
import styles from "./layout.module.scss";
import utilStyles from "../../styles/utils.module.scss";

import Head from "next/head";
import Image from "next/image";

const name: string = "Gansu Code";
export const siteTitle = "Next.js blog";

type Props = {
  children: ReactNode;
};

export function Layout(props: Props) {
  const { children } = props;
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Image
          src="/images/profile.png"
          alt=""
          width={100}
          height={100}
          className={utilStyles.borderCircle}
        />
        <h1 className={utilStyles.heading2Xl} >{name}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
