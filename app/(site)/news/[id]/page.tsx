import { Section } from "../../../components/site/Section";
import NewsArticleDetail from "../../../components/site/NewsArticleDetail";

export default async function NewsArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Section tone="cream">
      <NewsArticleDetail id={id} />
    </Section>
  );
}
