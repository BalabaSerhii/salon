export default function ButtonInsta() {
  const instaLink =
    "https://www.instagram.com/balabastudio_glauburg/?igshid=MzRlODBiNWFlZA==#direct";

  return (
    <a
      href={instaLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать нам в Instagram"
      className="inline-block px-6 py-3 bg-gradient-to-r from-[#E1306C] to-[#C13584] text-white rounded-lg hover:opacity-90 transition text-center"
    >
      Instagram
    </a>
  );
}
