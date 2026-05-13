import React from "react";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Input } from "@/components/ui/Input";

export default function HomePage() {
  const featuredProducts = [
    {
      id: "1",
      title: "The Crimson Cascade",
      price: "₹1,250",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdqGvcqualg5XOoTOkN8nWEzwwzs1mofh-vn8HPQtug117IcnWAAWkr71xkmIDvXTogg5Rk5gnB6Vfo0C0piFUzCpte2wEm6W8imzo2Jd9UwSOE9OEfgl2mbstdBxhIwBKMGSitxUKqmNr5epU2QStTStZkksyzPJiTwTd2BLRStT_tvlZ7gpLY1obb3bdIuxiGwZ9zDf8t2izxF3AhLb9WnTe6O0syqGvXFVNuDQ-k7JfebiGBCR7LUaxvT8GHOxNzMGd0tvHer0",
    },
    {
      id: "2",
      title: "Blush Silk Slip",
      price: "₹890",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6BWZFN3BnCd0myR7-kxJ48EXNzrET8ozYJ0ZuUroCZTiXwAbEROgdb0lhNd1cjZG5J6cXfQSdcEyY0TAvhvTkl-sd5pRdN8fkmcKoTe51XPbjrmEHCVwtxTHPeouLRWrwlg9Uof0rtuB-Bxqr0Q6BEVRPHRl8jlU5i-Ml590zUOXJ-7b9cM_N1EdLDEZzpQUmwz2boo6SiSd8behfZCF7LMT9o71WLrUBhhpbRmNpk4SVI4dDIVlkR7RcTzU7PrN7ck6gYyqsLcI",
    },
    {
      id: "3",
      title: "Ethereal Tulle Midi",
      price: "₹1,450",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7nDJX43n_MyMV_VlNZjQSIQ8zMWx3nTM3pSZzBdh4o65zny__Rttub60LHoqM3-uV_tkTZ8hV94gRrLiB43_mzVNWqco5Uj2jLZxzNiCnLCLgpKaV0YeAHTvL3BsO0RbL1P3F2Y4dDAHKCPHgJ_sIRgQP84vIIjiu6dkQzoqRmKMeNnTIbEKXUM5JFHBdfPZqIYWRcLEDMHQHmdHoMNtedx4d_N_KBJ8RukvCnvSZPT1KBEbFaId2EwMNXsGdb2X6tpDFt2kyGCc",
    },
    {
      id: "4",
      title: "Architectural Column",
      price: "₹1,800",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD22gU8v4unGsDn4CEpMjpgShVlQbXwefXYUICLTHfvw8dCk_QatlgDQgITCITfWWii06hdhbX6-I3-DviG0Dybv_BCX0kLuPoCMGq8EIgFwQON-aNVF344TomMeMitjlu9kWa8lPCBBfDFziXd_haHlxCZAIb7oYU3ztOjq-GheGd185KtmYr4gS5ISGvtNHWOciH85PoUlijqfutxMledIHVz7kYvUYvKFgktGNrh4leDzoniVb8eHb3Ts118Ly3MsGbXu5O-m0s",
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaB6Zz8sH_GQdtePqmNj-9gdDvuiC2IMDid2iJcCLizkxR5edp0BZhOyeU5PkwpGJSNdxsXpKj8ysqb5aHHgWc50gPrum72KjJ7ivSDrt0KPZG7-HR0Tk-vzwUH3Qjmb5qmzL5goucqoSaDOHSYNFXLKd422kwqf9swwxlZK_yHPdwuTFWd-Rbz0i0J1yePFc-t6m0zF3RboSyygp9EBHaLNZARKnwgI07RXtepDOfy63RNfzJyrEhX1-Bc1zRzrWPfyz7BCj3020"
            alt="Cinematic shot of a woman in a stunning flowing magenta evening gown"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-margin-x max-w-container-max mx-auto flex flex-col items-center">
          <h1 className="font-display-xl text-display-xl text-white mb-stack-md drop-shadow-lg">
            The Art of Elegance
          </h1>
          <p className="font-body-lg text-body-lg text-white/90 mb-stack-lg max-w-2xl drop-shadow-md">
            Discover our latest categories of handcrafted gowns, where minimal silhouette meets striking vibrant detail.
          </p>
          <Button href="/categories" variant="primary">
            Explore Categories
          </Button>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-section-gap px-margin-x max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter md:h-[600px] auto-rows-[400px] md:auto-rows-auto">
          {/* Tile 1 */}
          <a href="/products" className="group relative overflow-hidden flex items-end p-8 bg-surface-container-low h-full rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBb3s_GRuquaX2AFMrZQOnlhaX77hUo3SeCDd0NuTqJUTCqEQlO5JKpsPsXzCqsMkgkiwtGfxyJAVPR6IfZ1E6v-yROcnmDOm-ndMBWJdrb6eeHJmPTasXlyXHstHDqsbuKcA3aHHQyusFyh6Vu5461vuYFX0An7GA4TmwFy031zx377ydEczw-O8-4Y99WN76R_IQ1FJBu45eur6CZ6ERjVPiYNQBjIS6r0zF_qxE7v4DuL0SvxIpJFqCb2dQRNe_Jjchlc1e548E"
              alt="Summer Florals"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="relative z-10 w-full text-center">
              <h2 className="font-headline-md text-headline-md text-white mb-2">Summer Florals</h2>
              <span className="inline-block font-label-caps text-label-caps text-white border-b border-white pb-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Shop Now</span>
            </div>
          </a>

          {/* Tile 2 */}
          <a href="/products" className="group relative overflow-hidden flex items-end p-8 bg-surface-container-low h-full rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5vl1GhJBQ9h3J4-tuztm9APOnlk6Z3-P5obDc_cMnuFd3fProKZ1TOK2-gRfodAlXhu_DV7RSUhhKKT6zX3L-weB8dlW4Rm34E3MajVAKOwE_CmnuaonIwBjI20yn8hXshLcZEUCgm9FBhfeLNM4LNvhTuYrdmrCkiGGMB95H4LM44QNpQW-t5wvy_vW1Cy5tsx1On5Krd25Y8ffD11gJKJLIe2d0e8r3ylgTLcz9eIVJCvaSeaaSmPqCn4fE8WGKYOKBOUGc8hs"
              alt="Evening Couture"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="relative z-10 w-full text-center">
              <h2 className="font-headline-md text-headline-md text-white mb-2">Evening Couture</h2>
              <span className="inline-block font-label-caps text-label-caps text-white border-b border-white pb-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Shop Now</span>
            </div>
          </a>

          {/* Tile 3 */}
          <a href="/products" className="group relative overflow-hidden flex items-end p-8 bg-surface-container-low h-full rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuANAMuxUYDD6Upvtmnsr6N81_bBEKHtcDfK8AiVUBQFOE4cbVHKwPu7KyAohSW8idM6SrodZh7A9X4_-hSLUUyTuz8wPQWLXGt1_zMQ7TKSTHuLjJat9ZUryEtqWphfOFZVo6-ieb5F0FWOXRRUnsAN5ski5Yhdr1Vqaak9AFB5XF2exRsEsgAaYJ8rjFproko_mWGwLaFNYpCXv2W8qoN83rbvBPIlolkCz29l9nFHbbtE5gZi5IRm8vSBeY9J7atHQjz6dgplCYI"
              alt="The Bridal Edit"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
            <div className="relative z-10 w-full text-center">
              <h2 className="font-headline-md text-headline-md text-white mb-2">The Bridal Edit</h2>
              <span className="inline-block font-label-caps text-label-caps text-white border-b border-white pb-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">Shop Now</span>
            </div>
          </a>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-section-gap bg-surface-bright">
        <div className="px-margin-x max-w-container-max mx-auto mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Featured Collection</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Curated silhouettes for the modern aesthete.</p>
          </div>
          <Button href="/products" variant="ghost" className="hidden md:inline-flex">
            View All
          </Button>
        </div>
        <div className="px-margin-x max-w-container-max mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button href="/products" variant="ghost">
              View All
            </Button>
          </div>
        </div>
      </section>

      {/* Brand Story Split Screen */}
      <section className="py-section-gap px-margin-x max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
            {/* Glassmorphism decorative element */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/10 to-transparent blur-2xl -z-10 rounded-full"></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWvqWeFtU2cmqOOx1DXnUaP-RNNKygrfQAS3h_9NbtzsSjMBDYfk10XCvIFnGNXmHZ06OsbxFKcihGgiyOcKrA2g8WQlI7EG6GZqLckkkmYa0cAgKdBts_ju6j6awJwfnKnMcbgW2Aon7CLdOpeyJr27gXn2zGPzNkz1SGewl6IAnWmJEjctfEx6pRIp57QHbUTKaVt1YOg-DHbCFxoDwvARESVyl97jik2w8uN6-kX8zxx7afTXO3cy_QGAcNi9SD_YmqXno38T4"
              alt="Artisan tailor's hands"
              className="w-full h-full object-cover shadow-2xl shadow-secondary/5"
            />
          </div>
          
          {/* Text Side */}
          <div className="flex flex-col justify-center">
            <span className="font-label-caps text-label-caps text-[#ED4064] mb-4 tracking-widest uppercase">Our Philosophy</span>
            <h2 className="font-headline-lg text-headline-lg text-zinc-900 mb-6 font-serif italic">Perfecting the Silhouette</h2>
            <p className="font-body-lg text-lg text-zinc-600 mb-8 max-w-xl leading-relaxed">
              At WAAFA, we believe that luxury should be effortless. Our categories are designed for the modern woman who values both timeless style and exceptional quality. Every piece is a result of meticulous design and the finest fabric selection, ensuring you feel as elegant as you look.
            </p>
            <div>
              <button className="px-10 py-4 bg-zinc-900 text-white text-[11px] font-sans tracking-[0.3em] uppercase hover:bg-zinc-800 transition-all">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Community */}
      <section className="py-section-gap bg-surface text-center px-margin-x">
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Join the WAAFA Circle</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-8">Subscribe for exclusive previews of our upcoming collections and intimate atelier notes.</p>
          
          {/* Minimal Input */}
          <form className="flex gap-4 w-full max-w-md mx-auto">
            <Input id="email" type="email" placeholder="Enter your email" label="Email Address" />
            <button
              type="submit"
              className="shrink-0 font-label-caps text-label-caps text-primary hover:text-primary-container transition-colors duration-300 pb-2 border-b border-transparent hover:border-primary-container"
            >
              Subscribe
            </button>
          </form>
        </div>
        
        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-container-max mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIx0MZeztnckQ6mn6loA7h9SqB2Q6Bg_QB7EX3xIoB6pHRIiyMGrLK7a4eego3ascoTJx36w74k11KfaX64BEzyykAvE7zvO8kvN_oq7TPymL1pvZzk0IxP3Mg8lZFlz7E-l9nEKVv1e730vDFYwEQIv_mpk0SlwuZ6OkED5d82f3CJNqrfo7JT1Mu1orbMw5GdiLOomiTWPY_5GfrMphHUR-TyEtyIh7VdL_b65MZ3DOYEOG6wL8aATT_2Lg7wMgeWnMlNHCnTWs" alt="Instagram 1" className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC83bJkouMmmory91wX5Lm4gXWEpBGsGMJmd5XuQJ-YRFRVcU8xmXEYzHO2t9zZ67Agk3rCxPkANQ2mCm8tNee4oKj-eVuvVVzf7cYZdTZ1V2ItOIZQstG70buSnO4_E1i--nnnds7BFOcXCWlcNpD-p4rVgvale4n4i1jOQXcy-o9iCFWjm8OQnZPSPv0b2bERRgWBqMSAWks28K0ZCpMyZ6hca7jUiW2em-EdLLkG6ovvMl1C131iPmGhxrEkUSmpudFdaPFM5T4" alt="Instagram 2" className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMBbdRr0_6XJnGY53dMFLWmxD947BS9W4-0BI4NsiSfdRRjeSHffgEumyzSI9oDFoEfjvscC8HlasQUkejK7woLNg0nMljxJlHFUdq6cWjqqZSEKeY77HH7miyh_s7MEBPCHDUhO9K6o5olKoOzWBMRn7YqVc9Mnm7elsEMTBJI6oSeBuxhwsMR5yg_VIlM8cxMTlNkQIsN0iw-F2zUR2vWNKLTRJsd-z9DSxodE0VHaoDFESJzq4WcGh_aY1hHiBAHCo3g5zEacA" alt="Instagram 3" className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIqhRczNBvVB4k2KR1QEumflapJAMta-xdEs1iNqh8qOlGeV3DAYBrUuuSZ1QjJtmbvgFZFaYWXwX33C0bhf76_FZKFcZ1DS0U8VCkGqy8yUdMfcT2EeGjLr18YsiDsgO7TWwEo3eEF6YCuFWJOFCC19_J2d_49zI0iyPPxRvIg9rqeA3LFaVYf9B45iqr-2UPGCsnVp74_ZJBr1jCcA3e5-ihl1c1kp8sF9kzuiQl3RkmeFCT1Fe8ysLx2FbRvdn9AG_XV70Qp4c" alt="Instagram 4" className="w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer" />
        </div>
        <p className="font-label-caps text-label-caps text-on-surface-variant mt-8 uppercase tracking-widest">#WAAFAladies</p>
      </section>
    </>
  );
}
