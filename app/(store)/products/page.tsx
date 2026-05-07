import React from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";

export default function ProductListPage() {
  const products = [
    {
      id: "1",
      title: "The Midnight Silk Column",
      price: "₹2,450.00",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCjAuX614GZ8aV1fDFeLtibl1H7cW_zNA-JlWL18Lot-z4sR9L512d-Ynsf684diJW3VIXX5S2OGHMjORcOyDTePePcZQXjEiE6q342NqaEesOf6FxYDSbyqTNh-vyXIaAwVPmWMcnnpr8AtX4WLHQ0GKevjhNB6mT1yy6-U3rXYP4vpyFSjvNnV867GFdmALCBtHt-M-6whQYbynlaB3yrvrmzZgjJZb1F4XmnlH_B3awgh2PyakXTyWX20vUFfnzizjKD4TDZFCI",
    },
    {
      id: "2",
      title: "Ethereal Tulle Dream",
      price: "₹3,100.00",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZIaRf999kHqdr61KGP3tY1RTyzXLqwRz3ZV7cauCq45WmsheMF0ZxtKO-uWpugH8zspX_eztBFKjDdiixhxy0RaUi9dHv29we7P6zJRcbluGBJGC6pqJNfGr0yqcndW44xiNNz-_gbOtKKqHV2nmxagvPMrY9XtxekWKntshXoJP2kZEwOiEQJtBF0Gm9KFaHC_p45_pJGFWCRdM-Sxgrzh8bfz5e0W9SnZZ83_9wEXU-oCZQ8TlrtuPyMr3lFJavZOptQCNU91A",
    },
    {
      id: "3",
      title: "Sculpted Velvet Noir",
      price: "₹1,890.00",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqNrVtM5-GD-BaMvFITNabxUyecM1wNAho5x3WhW6j2Bu7gcCpC7Qs1FgEzVNuDgICSUhAxSZJgEE3OIaJEqR8hBeOqVIn2EPS0eAyrwGrV7jcNlKJo6tNpUYL4Cehkn8siHz6CFH3AIJfAIdl1sqfnrc03FxsqJ9Z26gBh9GvQSJNLan8Ayw-saQIkevGtxli-tuNvd2ECSt1299ZR5hmQ_TICWNSE6zHUM8E8wJomUHRlLHAtSuaRRqtc03Q3oalrIdbfDfsR8s",
    },
    {
      id: "4",
      title: "Floating Organza Wrap",
      price: "₹2,200.00",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwjwJeArOl12uPE2A4ViSpEWTimUSAKMy3FSLD5VXqLY0fIMTz2U5F1rJ1fTTszHUah8CD1NPXXAcJBQWxc0c2pa-ypFQpOFEgxM4s02_9k1lTRvEwu4vWgrwxz-wIVYLb4cdNGtSADWjJZmG7IPV7o06nK5UBEPWqb8Wc_clg9c-jMLgcYRBD2Myf0vVtnVMT0drh_y2ik3KzWJKXX5kdIDXuhXItCTh5RxVV-l6OXxpUnZyP-zYcHjtROQGXkKDRaoR3YF51eoI",
    },
    {
      id: "5",
      title: "The Crimson Siren",
      price: "₹3,400.00",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUD2BQCmzzkWsyMkegQ_dWzoEtkQgDtPTkMZPwTneA1sK91ylfwYK7NBymyNja9qjUo_KF2EcuYaP27a4l80BfrdEtEchOcYvDpCj31ygl5m7J4xY5aKY-ZAvqMZImHD7y2ydokjncq5Od6OijP1Y_xLYaIbl0ohNzLDxqfkhCZwhcaMD1O7d9JV9qpQqNv4HGGHynwjZXIGGk3At3sMLt1opYR-DKkK602QpMCCHDfTVUPUFeeYU8bb8Qh7nGwM8QMnirsMIQ5fw",
    },
    {
      id: "6",
      title: "Gilded Lace Mermaid",
      price: "₹4,200.00",
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCs6VnA1s3b-Mb3aGn2jPC7uLU-JSQ30B7-MOPKbighUH3v2jGV4TiJ2ZYowKuRSgIfTcI8E0-vAJUbUnBtj5canVV5ykvtkDtJ9C5zFIGmmo4qsnckq2GVEtHjYGcXs_-WNkcdpc4PhxcSafllgJyK9cDSq-K_Iy6CIMYTSJogU0GD1I_2paxDp9ua2k8_nwg4oARNI-LQHbz2D6UYgqUMZeMKBDpwInpepzaMOW2mwuWGG9mfgz6skFt6Y9E0HwQ0MztYK7RqXHo",
    }
  ];

  return (
    <>
      {/* Category Header */}
      <section className="px-[5vw] pt-20 pb-12">
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-label-caps font-label-caps text-neutral-400">
            <li><Link href="/" className="hover:text-primary transition-colors">HOME</Link></li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[12px]">chevron_right</span></li>
            <li><Link href="/products" className="hover:text-primary transition-colors">COLLECTIONS</Link></li>
            <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[12px]">chevron_right</span></li>
            <li className="text-[#ED4064]">EVENING GOWNS</li>
          </ol>
        </nav>
        <div className="max-w-4xl">
          <h1 className="font-display-xl text-display-xl text-[#ED4064] mb-4">Evening Gowns</h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-2xl">
            Discover our curation of ethereal silhouettes, meticulously crafted from the finest silks and tulles. Each piece is a testament to digital couture excellence.
          </p>
        </div>
      </section>

      {/* Refined Filtering & Sorting */}
      <section className="px-[5vw] mb-12 sticky top-[88px] z-40">
        <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-y border-neutral-100 dark:border-zinc-800 flex flex-wrap items-center justify-between py-4 px-6">
          <div className="flex items-center gap-10">
            <button className="group flex items-center gap-2 font-label-caps text-label-caps text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors">
              CATEGORY
              <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">keyboard_arrow_down</span>
            </button>
            <button className="group flex items-center gap-2 font-label-caps text-label-caps text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors">
              COLOR
              <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">keyboard_arrow_down</span>
            </button>
            <button className="group flex items-center gap-2 font-label-caps text-label-caps text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors">
              SIZE
              <span className="material-symbols-outlined text-[16px] group-hover:rotate-180 transition-transform">keyboard_arrow_down</span>
            </button>
          </div>
          <div className="flex items-center gap-6">
            <span className="font-label-caps text-[10px] text-neutral-400">12 ITEMS FOUND</span>
            <div className="h-4 w-[1px] bg-neutral-200 dark:bg-zinc-800"></div>
            <button className="group flex items-center gap-2 font-label-caps text-label-caps text-neutral-900 dark:text-neutral-100 hover:text-primary transition-colors">
              SORT BY: NEWEST
              <span className="material-symbols-outlined text-[16px]">swap_vert</span>
            </button>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="px-[5vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </section>

      {/* Pagination */}
      <section className="flex flex-col items-center justify-center section-gap py-20">
        <p className="font-label-caps text-[10px] text-neutral-400 mb-6 tracking-[0.3em]">6 OF 12 ITEMS DISPLAYED</p>
        <div className="w-64 h-[1px] bg-neutral-100 dark:bg-zinc-800 relative mb-12">
          <div className="absolute left-0 top-0 h-full bg-[#ED4064] w-1/2"></div>
        </div>
        <Button variant="secondary">
          DISCOVER MORE
        </Button>
      </section>
    </>
  );
}
