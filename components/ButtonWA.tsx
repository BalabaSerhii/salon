export default function ButtonWA() {
  const whatsappLink = "https://wa.me/4915124908000";

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать нам в WhatsApp"
      className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-center"
    >
      WhatsApp
    </a>
  );
}
