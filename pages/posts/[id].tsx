import { getAllPostIds, getPostData } from "../../lib/post";
import { Layout } from "../../components/Layout";

import utilStyles from "../../styles/utils.module.scss";
import Head from "next/head";

// このページ一つで4つのページを生成できる
// index.tsxでURLを決める
// そのURLに基づくページをここで生成する
export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths, //・・params:{id:id}
    fallback: false,
  };
}
export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }: any) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}> {postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
      </article>
    </Layout>
  );
}
