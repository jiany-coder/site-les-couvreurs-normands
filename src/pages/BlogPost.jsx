import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Clock, ArrowLeft, ArrowRight, Phone } from "lucide-react";
import SEO, { buildArticleSchema, buildBreadcrumbSchema, buildFAQSchema } from "../components/SEO";
import FAQAccordion from "../components/FAQAccordion";

import { COMPANY, telHref } from "../data/company";
import { BLOG_POSTS, getPost } from "../data/blog_all";
import ContactForm from "../components/ContactForm";

function md(content) {
  // Lightweight markdown -> HTML (h2/h3, **bold**, liens, lists, paragraphs, tables, hr)
  const lines = content.split("\n");
  let html = "";
  let inUl = false, inOl = false, inTable = false;
  const flush = () => {
    if (inUl) { html += "</ul>"; inUl = false; }
    if (inOl) { html += "</ol>"; inOl = false; }
    if (inTable) { html += "</table>"; inTable = false; }
  };
  const inline = (s) =>
    s
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#2F4331] underline">$1</a>')
      .replace(/\[([^\]]+)\]\((\/[^)]*)\)/g, '<a href="$2" class="text-[#2F4331] underline">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/`(.*?)`/g, "<code>$1</code>");

  for (let raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    if (line.startsWith("## ")) { flush(); html += `<h2>${inline(line.slice(3))}</h2>`; continue; }
    if (line.startsWith("### ")) { flush(); html += `<h3>${inline(line.slice(4))}</h3>`; continue; }
    if (line.startsWith("- ")) {
      if (!inUl) { flush(); html += "<ul>"; inUl = true; }
      html += `<li>${inline(line.slice(2))}</li>`;
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      if (!inOl) { flush(); html += "<ol>"; inOl = true; }
      html += `<li>${inline(line.replace(/^\d+\.\s/, ""))}</li>`;
      continue;
    }
    if (line.startsWith("|")) {
      if (!inTable) { flush(); html += "<table>"; inTable = true; }
      if (/^\|[-:\s|]+\|$/.test(line)) continue;
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      const isHeader = !html.includes("<tr>") || html.endsWith("<table>");
      html += "<tr>" + cells.map((c) => (isHeader ? `<th>${inline(c)}</th>` : `<td>${inline(c)}</td>`)).join("") + "</tr>";
      continue;
    }
    flush();
    html += `<p>${inline(line)}</p>`;
  }
  flush();
  return html;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <SEO
        title={post.metaTitle || post.title}
        description={post.excerpt}
        canonical={`${COMPANY.site}/blog/${slug}`}
        type="article"
        jsonLd={[buildArticleSchema(post), ...(post.faq ? [buildFAQSchema(post.faq)] : []), buildBreadcrumbSchema([["Accueil", COMPANY.site + "/"], ["Blog", COMPANY.site + "/blog"], [post.title, `${COMPANY.site}/blog/${slug}`]])]}
      />

      <article>
        <section className="pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#2F4331] font-sans font-semibold link-underline mb-8">
              <ArrowLeft className="w-4 h-4" /> Retour au blog
            </Link>
            <div className="flex items-center gap-3 text-xs font-sans text-[#4B5547] mb-5">
              <span className="font-semibold tracking-[0.18em] uppercase text-[#2F4331]">{post.category}</span>
              <span>·</span>
              <Clock className="w-3 h-3" /> {post.readTime}
              <span>·</span>
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</time>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#17231B] font-light leading-[1.05] tracking-tight mb-6">{post.title}</h1>
            <p className="text-xl text-[#4B5547] leading-relaxed">{post.excerpt}</p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="prose-blog" dangerouslySetInnerHTML={{ __html: md(post.content) }} />

            {post.faq && (
              <div className="mt-12">
                <h2 className="font-serif text-2xl sm:text-3xl text-[#17231B] font-semibold mb-6">Questions fréquentes</h2>
                <FAQAccordion items={post.faq} />
              </div>
            )}

            <div className="mt-14 p-8 rounded-2xl bg-[#2F4331] text-[#FBF7EE]">
              <p className="text-xs font-sans font-bold tracking-[0.3em] uppercase text-[#EADFC4] mb-3">Besoin d'un devis ?</p>
              <h3 className="font-serif text-3xl text-[#EADFC4] mb-4">Parlons de votre projet</h3>
              <p className="text-[#FBF7EE]/80 mb-6">Nous examinons la toiture puis vous remettons un devis gratuit.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-[#C2500B] text-white px-6 py-3 rounded-full font-sans font-semibold text-sm">Devis gratuit <ArrowRight className="w-4 h-4" /></Link>
                <a href={`${telHref}`} className="inline-flex items-center justify-center gap-2 border-2 border-[#EADFC4]/40 text-[#EADFC4] px-6 py-3 rounded-full font-sans font-semibold text-sm hover:bg-[#EADFC4] hover:text-[#2F4331] transition-colors"><Phone className="w-4 h-4" /> {COMPANY.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5EEDD]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#17231B] font-light mb-10">À lire également</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group block">
                  <h3 className="font-serif text-xl text-[#17231B] leading-tight mb-2 group-hover:text-[#2F4331]">{p.title}</h3>
                  <p className="text-sm text-[#4B5547]">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
