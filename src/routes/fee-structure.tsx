import { createFileRoute, Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { ArrowRight, Download, ExternalLink } from 'lucide-react'
import { SiteLayout } from '@/components/site/SiteLayout'
import feeStructureImage from '@/assets/fees-structure/FEE STRUCTURES 2026-27 -.jpg'

// Configuration for easy future updates
const FEE_DOCUMENT = {
  session: "2026–27",
  title: "Official Fee Structure 2026–27",
  lastUpdated: "Not specified",
}

export const Route = createFileRoute('/fee-structure')({
  component: FeeStructurePage,
})

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
}

function FeeStructurePage() {
  return (
    <SiteLayout>
      <main className="bg-background pt-[120px] pb-20 sm:pt-[140px]">
        
        {/* 1. Page Hero */}
        <section className="relative mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-8 pb-16 sm:pt-12 sm:pb-24">
            
            {/* Left: Text Content */}
            <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
              <motion.p {...fadeUp} className="text-sm font-bold tracking-[0.2em] text-primary uppercase">
                Academics
              </motion.p>
              <motion.h1 {...fadeUp} transition={{ delay: 0.1, duration: 0.8 }} className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Fee Structure
              </motion.h1>
              <motion.p {...fadeUp} transition={{ delay: 0.2, duration: 0.8 }} className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
                Transparent and easy-to-understand information about school fees.
              </motion.p>
            </div>

            {/* Right: Asymmetric Editorial Image Composition */}
            <div className="relative w-full max-w-[600px] mx-auto lg:max-w-none aspect-square sm:aspect-[4/3] lg:aspect-[5/4] mt-8 lg:mt-0">
              
              {/* Subtle Gold Accent Line */}
              <motion.div 
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="absolute top-[12%] left-[15%] w-[25%] h-1 bg-[#D4A94F]/80 z-0 origin-left rounded-full"
              />

              {/* Main Featured Image (IMAGE 1) */}
              <motion.div 
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="absolute top-0 right-0 w-[68%] h-[72%] rounded-[24px] overflow-hidden border-[6px] border-background shadow-xl z-10"
              >
                <img 
                  src="https://res.cloudinary.com/zvlxacfu/image/upload/v1788826061/IMG-20260829-WA0088.jpg" 
                  alt="Shandilya Public School" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                />
              </motion.div>

              {/* Supporting Image 1 (IMAGE 2) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                className="absolute bottom-[4%] left-0 w-[48%] h-[58%] rounded-[20px] overflow-hidden border-[6px] border-background shadow-lg z-20"
              >
                <img 
                  src="https://res.cloudinary.com/zvlxacfu/image/upload/v1788826062/IMG-20260829-WA0009.jpg" 
                  alt="Students and school activities at Shandilya Public School" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                />
              </motion.div>

              {/* Supporting Image 2 (IMAGE 3) */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="absolute bottom-0 right-[12%] w-[38%] h-[42%] rounded-[18px] overflow-hidden border-[6px] border-background shadow-md z-30"
              >
                <img 
                  src="https://res.cloudinary.com/zvlxacfu/image/upload/v1788826061/IMG-20260829-WA0010.jpg" 
                  alt="Student activities at Shandilya Public School" 
                  className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-[1.02]"
                />
              </motion.div>

            </div>
          </div>
        </section>

        {/* 2. Main Intro & Session */}
        <section className="mx-auto max-w-4xl px-5 sm:px-6 mt-20 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-bold tracking-widest text-primary uppercase">Fee Structure</p>
            <h2 className="mt-4 font-serif text-3xl font-bold text-foreground sm:text-4xl">Clear. Transparent. Simple.</h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              We believe parents should have clear and accessible information about the cost of education. View the applicable fee structure for the current academic session below.
            </p>
            
            <div className="mt-12 inline-flex flex-col items-center justify-center rounded-2xl bg-muted/30 px-10 py-6 border border-border">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Academic Session</span>
              <span className="mt-2 font-serif text-4xl font-bold text-primary">{FEE_DOCUMENT.session}</span>
            </div>
          </motion.div>
        </section>

        {/* 3. Document Display Area */}
        <section className="mx-auto max-w-5xl px-5 sm:px-6 mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-border">
              <div>
                <h3 className="text-xl font-bold text-foreground">{FEE_DOCUMENT.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Official Document • Last Updated: {FEE_DOCUMENT.lastUpdated}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a 
                  href={feeStructureImage} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink className="size-4" />
                  VIEW FULL PDF
                </a>
                <a 
                  href={feeStructureImage} 
                  download="Shandilya-Public-School-Fee-Structure-2026-27.jpg"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-transparent px-6 py-2.5 text-sm font-semibold text-foreground hover:bg-muted/50 transition-all duration-300 hover:scale-105"
                >
                  <Download className="size-4" />
                  DOWNLOAD PDF
                </a>
              </div>
            </div>

            {/* Actual Document Preview Image */}
            <div className="mt-12 flex justify-center w-full overflow-visible">
              <img 
                src={feeStructureImage} 
                alt="Official Fee Structure 2026–27 Document" 
                className="block mx-auto w-full max-w-[900px] h-auto rounded-lg shadow-sm border border-border/30 object-contain"
              />
            </div>
          </motion.div>
        </section>

        {/* 4. CTA */}
        <section className="mx-auto max-w-4xl px-5 sm:px-6 mt-32">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden rounded-[24px] bg-[#D4A94F]/10 px-6 py-12 text-center border border-[#D4A94F]/20 sm:px-12 sm:py-16"
          >
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Have Questions About Admissions?</h2>
            <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
              Our admissions team can help you understand the admission process and fee structure.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link 
                to="/admissions/apply"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-105"
              >
                APPLY FOR ADMISSION
                <ArrowRight className="size-4" />
              </Link>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-transparent px-8 py-3 text-sm font-semibold text-foreground transition-all hover:bg-foreground hover:text-background hover:scale-105"
              >
                CONTACT THE SCHOOL
              </Link>
            </div>
          </motion.div>
        </section>

      </main>
    </SiteLayout>
  )
}
