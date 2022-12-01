import { getAllPostIds, getPostData } from "../../lib/post";
import { Layout } from "../components/Layout";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  console.log(paths)
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }:any) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export default function Post({ postData }:any) {
  return (
    <Layout>
      {postData.title}
      <br />
    </Layout>
  );
}
