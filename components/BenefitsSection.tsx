export default function BenefitsSection() {
  const benefits = [
    {
      icon: "💆‍♀️",
      title: "Stressabbau",
      description:
        "Reduzieren Sie Ihren Stresslevel und finden Sie innere Ruhe",
    },
    {
      icon: "🩸",
      title: "Bessere Durchblutung",
      description: "Fördert die Blutzirkulation und Sauerstoffversorgung",
    },
    {
      icon: "😴",
      title: "Verbesserter Schlaf",
      description: "Tiefenentspannung für erholsame Nächte",
    },
    {
      icon: "⚡",
      title: "Mehr Energie",
      description: "Steigert Ihr Wohlbefinden und Vitalität",
    },
    {
      icon: "🦵",
      title: "Schmerzlinderung",
      description: "Löst Verspannungen und reduziert Schmerzen",
    },
    {
      icon: "🛡️",
      title: "Stärkt Immunsystem",
      description: "Aktiviert die Selbstheilungskräfte des Körpers",
    },
  ];

  return (
    <section>
      <div>
        <div>
          <h2>Warum regelmäßige Massage?</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#62733f] to-green-600 mx-auto rounded-full mb-6"></div>
          <p>
            {" "}
            Entdecken Sie die vielfältigen gesundheitlichen Vorteile
            professioneller Massagetherapie
          </p>
        </div>
        <div>
          {benefits.map((benefit, index) => (
            <div key={index}>
              {" "}
              <div>{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
