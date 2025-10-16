export default function ButtonWA() {
  const whatsappLink = "https://wa.me/4915124908000";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Schreiben Sie uns bitte über WhatsApp"
      className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-colors"
    >
      WhatsApp
    </a>
  );
}
