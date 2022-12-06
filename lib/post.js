import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す
export function getPostsData() {
  // const fechData = await fetch("endpoint")

  // postDirectoryにあるファイル名を配列として返す。
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostData = fileNames.map((fileName) => {
    // マークダウンファイルのファイル名(id)・・拡張子(.md)を省く。
    const id = fileName.replace(/\.md$/, "");

    // 各マークダウンファイルのpathを(fileNameで区別して)取得
    const fullPath = path.join(postsDirectory, fileName);

    // マークダウンファイルを文字列として読み取る
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // title, date, thumbnail
    const matterResult = matter(fileContents);
  

    return {
      ...matterResult.data,
      id,
    };
    /* { ...mattterResult.data === 
  title: 'プリレンダリングについて',   
  date: '2020-02-21',
  thumbnail: '/images/thumbnail04.jpg' 
}
{
  title: 'プリレンダリングの2つの形態',
  date: '2022-02-22',
  thumbnail: '/images/thumbnail02.jpg'
}
{
  title: 'ReactとNext.jsはどちらを使うべき？',
  date: '2020-02-24',
  thumbnail: '/images/thumbnail03.jpeg'
}
{
  title: 'SSGとSSRの使い分けの場面はいつなのか？',
  date: '2020-02-23',
  thumbnail: '/images/thumbnail01.jpg'
}
*/
  });
  return allPostData;
}

//getStaticPathでretuenで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")
    return {
      params: {
        id: id,
      },
    };
  });
  /*
  [
    {
      params:{
        id: "ssg-ssr"
      }
    }
  ],
   [
    {
      params:{
        id: "next-react"
      }
    }
  ],

   */
}

//id(ファイル名)に基づいてブログ投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContent);

  // matterResult.data = メタデータ
  // matterResult.content = 本文; //ただの文字列(マークダウン記法✕)

  const blogContent = await remark().use(html).process(matterResult.content);
  const blogContentHTML = blogContent.toString();

  return {
    id,//引数・・・これから基づいた下の二つを返す
    blogContentHTML,
    ...matterResult.data,
  };
}
