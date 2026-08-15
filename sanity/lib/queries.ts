import { defineQuery } from "groq";

const articleCardFields = `
  _id,
  title,
  dek,
  "slug": slug.current,
  publishedAt,
  category,
  topics,
  featured,
  "coverImageUrl": coverImage.asset->url,
  "coverImageAlt": coverImage.alt,
  "author": author->{name, role, "imageUrl": image.asset->url, "imageAlt": image.alt},
  "estimatedWords": round(length(pt::text(body)) / 5)
`;

export const ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current) && defined(publishedAt)]
  | order(featured desc, publishedAt desc) {
    ${articleCardFields}
  }
`);

export const ARTICLE_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleCardFields},
    summary,
    body[]{..., asset->{url}},
    resources,
    faq,
    sourceUrl,
    seo,
    "comments": *[_type == "comment" && article._ref == ^._id && status == "approved"] | order(submittedAt desc) {
      _id,
      displayName,
      message,
      submittedAt
    },
    "likeCount": count(*[_type == "articleLike" && article._ref == ^._id])
  }
`);

export const ARTICLE_METADATA_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0] {
    title,
    dek,
    "slug": slug.current,
    publishedAt,
    _updatedAt,
    category,
    topics,
    "coverImageUrl": coalesce(seo.image.asset->url, coverImage.asset->url),
    "seoTitle": seo.title,
    "seoDescription": seo.description,
    "noIndex": seo.noIndex,
    "authorName": author->name
  }
`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current)][]{"slug": slug.current}
`);

export const SITEMAP_ARTICLES_QUERY = defineQuery(`
  *[_type == "article" && defined(slug.current) && coalesce(seo.noIndex, false) != true][]{
    "slug": slug.current,
    "lastModified": coalesce(_updatedAt, publishedAt)
  }
`);
