import Image from "next/image";
import ButtonWA from "./ButtonWA";

export default function AboutUs() {
  return (
    <section>
      <p>
        Ihre Spezialisten für Massage und Pressotherapie Sergej und Marina
        bringen über 10 Jahre Erfahrung im Bereich Wellness-Massage mit. Im
        Balaba Studio in Glauburg erwartet Sie ein Ort der Ruhe, Entspannung und
        Erholung – fern vom Alltagsstress. Unsere Philosophie: Jeder Mensch
        verdient Zeit nur für sich. Mit wohltuenden Massagen und sanfter
        Pressotherapie schaffen wir eine Atmosphäre, in der Sie loslassen und
        neue Energie tanken können. Ob nach langen Stunden im Büro, körperlicher
        Arbeit oder intensiven Trainingseinheiten – bei uns finden Sie die
        passende Auszeit. Wir legen Wert auf Fachwissen, Einfühlungsvermögen und
        viel Liebe zum Detail. Jede Sitzung wird individuell auf Ihre
        Bedürfnisse abgestimmt, damit Sie genau die Art von Entspannung genießen
        können, die Sie sich wünschen. Im Balaba Studio kombinieren wir
        professionellen Anspruch mit einem persönlichen Ansatz. Es geht nicht um
        schnelle Lösungen, sondern darum, Ihnen Raum für Wohlbefinden und
        Leichtigkeit zu geben. ✨ Gönnen Sie sich eine kleine Pause vom Alltag –
        Sie haben es verdient. 📍 Balaba Studio, Glauburg 📲 Terminvereinbarung
        einfach und unkompliziert per WhatsApp oder Instagram
      </p>
      <Image src="/balabateam.jpg" alt="Balaba Team" width={700} height={400} />
      <ButtonWA />
    </section>
  );
}
