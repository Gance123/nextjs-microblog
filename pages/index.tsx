import utilStyles from "../styles/utils.module.scss";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import Image from "next/image";

import { Layout, siteTitle } from "../components/Layout";
import { getPostsData } from "../lib/post";
import Head from "next/head";

// SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id, title, date, thumbnail
  return {
    props: {
      allPostsData,
    },
  };
}
//SSRの場合
// export async function getServerSideProps(context){
//   return{
//     props:{

//     }
//   }
// }

type Postdata = {
  title: string;
  date: string;
  thumbnail: string;
  id: string;
};
type Props = {
  allPostsData: Array<Postdata>;
};

export default function Home(props: Props) {
  const { allPostsData } = props;
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyles.headingSm}>
          私はエンジニアを目指している学生です。今はNext.jsを勉強しています。とても楽しいです。
        </p>
      </section>

      <section>
        <h2 className={utilStyles.headingMd}>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map((post) => (
            <article key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <Image
                  src={post.thumbnail}
                  alt=""
                  width={640}
                  height={426}
                  className={styles.thumbnailImage}
                />
              </Link>
              <Link href={`/posts/${post.id}`}>
                <p className={utilStyles.boldText}>{post.title}</p>
              </Link>
              <small className={utilStyles.lightText}>{post.date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
