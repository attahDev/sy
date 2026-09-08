import type { Metadata } from "next";
import PageHero from "../../components/site/PageHero";
import { Section } from "../../components/site/Section";
import NewsArchiveList from "../../components/site/NewsArchiveList";

export const metadata: Metadata = {
  title: "News",
  description:
    "Announcements, press coverage and updates from South Yorkshire Black Tech Expo.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="News &"
        accent="Announcements"
        lead="What's happening across South Yorkshire Black Tech Expo — programme updates, partner announcements, and press coverage."
        breadcrumb="News"
      />
      <Section tone="cream">
        <NewsArchiveList />
      </Section>
    </>
  );
}
