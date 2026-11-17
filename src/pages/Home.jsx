import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Tools from '../components/Tools'
import Education from '../components/Education'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <Tools />
        </div>
      </section>

      <Education />
      <Contact />
    </>
  )
}