import type { Post } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'

import { EPostDisplayType } from 'src/types/post-display-type.enum'

import { EPostType } from '../../ArticleTypeIcon/ArticleTypeIcon'

import ArticleArticle from './ArticleArticle'
import ArticleChotto from './ArticleChotto'
import ArticleHaiku from './ArticleHaiku'
import ArticleVideo from './ArticleVideo'

interface Props {
  article: Post
}

const ArticlePreview = ({ article }: Props) => {
  const border =
    article.type === EPostType.HAIKU
      ? `border-y-2 border-x-0 rounded-none`
      : article.type === EPostType.CHOTTO
      ? `border-dashed`
      : `border-solid`

  return (
    <article
      className={`rounded border-2 p-2 hover:cursor-pointer hover:border-black ${border}`}
      onClick={() => navigate(routes.article({ id: article.id }))}
      tabIndex={0}
    >
      {article.type === EPostType.ARTICLE && (
        <ArticleArticle
          article={article}
          displayType={EPostDisplayType.PREVIEW}
        />
      )}

      {article.type === EPostType.VIDEO && (
        <ArticleVideo
          article={article}
          displayType={EPostDisplayType.PREVIEW}
        />
      )}

      {article.type === EPostType.CHOTTO && (
        <ArticleChotto
          article={article}
          displayType={EPostDisplayType.PREVIEW}
        />
      )}

      {article.type === EPostType.HAIKU && (
        <ArticleHaiku
          article={article}
          displayType={EPostDisplayType.PREVIEW}
        />
      )}
    </article>
  )
}

export default ArticlePreview