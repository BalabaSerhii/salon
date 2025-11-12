export default function MapSection() {
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-center text-[#979ca6]">
        Unser Studio auf der Karte
      </h2>

      <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Balaba Massage Studio"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2511.436254433595!2d9.012321215754908!3d50.32505127942621!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bd1ff68239fc3d%3A0xacd5e4c867c97da6!2sBalaba%20Massage%20Studio!5e0!3m2!1sde!2sde!4v1697098541234!5m2!1sde!2sde"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
