import AboutUs from "@/components/AboutUs";
import Gallery from "@/components/Gallery";

export default function About(){
    return(
       <>
        {/* === ABOUT US === */}
      <section className="py-16 md:py-20 " aria-labelledby="about-title">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2
            id="about-title"
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center"
          >
            Über uns
          </h2>
          <AboutUs />
        </div>
      </section>
        {/* === GALLERY === */}
            <section
              className="py-16 md:py-20 bg-white"
              aria-labelledby="gallery-title"
            >
              <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                  <h2
                    id="gallery-title"
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                  >
                    Unsere Räumlichkeiten
                  </h2>
                  <div className="w-20 h-1 mx-auto rounded-full mb-6"></div>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Entdecken Sie unsere entspannende Atmosphäre – designed für Ihr
                    Wohlbefinden.
                  </p>
                </div>
                <Gallery />
              </div>
            </section>
       </>
    )
}