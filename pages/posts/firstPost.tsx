import Head from "next/head";
import Link from "next/link";

export default function firstPost() {
  return (
    <div>
      <Head>
        <title>最初の投稿</title>
      </Head>
      <Link href="/">ホームへ戻る</Link>
    </div>
  );
}
