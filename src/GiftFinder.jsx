import React, { useState } from 'react';
import { getAffiliateUrl } from './affiliate-config';

const questions = [
  {
    id: 1,
    question: "Die Person wird von Aliens entführt. Was nehmen sie mit?",
    emoji: "👽",
    options: [
      { value: "chips", label: "Die Snack-Schublade – Prioritäten!", icon: "🍕" },
      { value: "sushi", label: "Die komplette Vinyl-Sammlung", icon: "🎵" },
      { value: "schokolade", label: "Das Haustier (oder die Pflanze)", icon: "🌱" },
      { value: "energie", label: "Laufschuhe – auch im All fit bleiben!", icon: "👟" }
    ]
  },
  {
    id: 2,
    question: "Diese Person gewinnt 10.000€ – aber muss sie in 24h ausgeben!",
    emoji: "💸",
    options: [
      { value: "couch", label: "Mega Home-Cinema mit Popcorn-Maschine", icon: "🍿" },
      { value: "party", label: "Spontan-Trip nach Ibiza mit den Besties", icon: "✈️" },
      { value: "natur", label: "Camping-Ausrüstung für Weltreise", icon: "🏕️" },
      { value: "kreativ", label: "Komplettes Kunst-Studio einrichten", icon: "🎨" }
    ]
  },
  {
    id: 3,
    question: "Zombie-Apokalypse! Was ist die geheime Waffe dieser Person?",
    emoji: "🧟",
    options: [
      { value: "praktisch", label: "Schweizer Taschenmesser & Duct Tape", icon: "🔧" },
      { value: "schoen", label: "Die Zombies mit Style ablenken", icon: "💅" },
      { value: "essen", label: "Grill aufbauen – die Zombies riechen Steak!", icon: "🥩" },
      { value: "abenteuer", label: "Parkour bis zum Helikopter auf dem Dach", icon: "🚁" }
    ]
  },
  {
    id: 4,
    question: "Ein Flaschengeist erscheint! Was wünscht sich die Person NICHT?",
    emoji: "🧞",
    options: [
      { value: "teleport", label: "Unendlich Geld – zu stressig zu verwalten", icon: "💰" },
      { value: "zeitreise", label: "Ewiges Leben – die Langeweile!", icon: "⏳" },
      { value: "gedanken", label: "Gedankenlesen – will nicht wissen was Oma denkt", icon: "🙈" },
      { value: "unsichtbar", label: "Fliegen können – Höhenangst!", icon: "😰" }
    ]
  },
  {
    id: 5,
    question: "Die Person darf nur noch EINEN Social Media Account behalten!",
    emoji: "📱",
    options: [
      { value: "strand", label: "Instagram – für die Ästhetik", icon: "📸" },
      { value: "abenteuer", label: "YouTube – Rabbit Holes forever", icon: "🐰" },
      { value: "stadt", label: "TikTok – Entertainment non-stop", icon: "🎬" },
      { value: "wellness", label: "Pinterest – Inspiration tanken", icon: "📌" }
    ]
  }
];

const generatePrompt = (answers, relationship) => {
  const snackMap = {
    chips: "entspannt und unkompliziert",
    sushi: "kultiviert und anspruchsvoll",
    schokolade: "genussvoll und emotional",
    energie: "aktiv und immer unterwegs"
  };

  const activityMap = {
    couch: "entspannt gerne zu Hause mit Serien",
    party: "liebt es auszugehen und zu feiern",
    natur: "ist naturverbunden und liebt Outdoor-Aktivitäten",
    kreativ: "ist kreativ und macht gerne Dinge selbst"
  };

  const phraseMap = {
    praktisch: "sehr praktisch veranlagt",
    schoen: "ästhetisch orientiert und schätzt schöne Dinge",
    essen: "ein Genussmensch und Feinschmecker",
    abenteuer: "abenteuerlustig und spontan"
  };

  const superpowerMap = {
    teleport: "liebt Spontanität und Freiheit",
    zeitreise: "ist nostalgisch oder zukunftsorientiert",
    gedanken: "ist sehr empathisch und interessiert an anderen",
    unsichtbar: "ist eher introvertiert und beobachtend"
  };

  const vacationMap = {
    strand: "braucht Entspannung und Luxus",
    abenteuer: "sucht Action und Naturerlebnisse",
    stadt: "ist kulturinteressiert und liebt urbanes Leben",
    wellness: "schätzt Genuss und die schönen Dinge des Lebens"
  };

  const relationshipMap = {
    partner: "Partner/Partnerin (romantische Geschenke erwünscht)",
    eltern: "Elternteil (respektvoll, wertschätzend)",
    freund: "guter Freund/Freundin (persönlich, evtl. lustig)",
    kollege: "Kollege/Kollegin (professionell aber herzlich)"
  };

  return `Du bist ein kreativer Geschenkeberater. Basierend auf dieser Persönlichkeitsbeschreibung, schlage 3 kreative und liebevolle Last-Minute-Geschenkideen vor.

Beziehung zum Beschenkten: ${relationshipMap[relationship] || "nicht angegeben"}

Persönlichkeit:
- Die Person ist ${snackMap[answers[0]]}
- Sie ${activityMap[answers[1]]}
- Sie ist ${phraseMap[answers[2]]}
- Sie ${superpowerMap[answers[3]]}
- Sie ${vacationMap[answers[4]]}

Antworte NUR mit einem JSON-Array in diesem exakten Format, ohne Markdown-Backticks oder anderen Text:
[
  {
    "name": "Geschenkname",
    "beschreibung": "Kurze, charmante Beschreibung warum das perfekt passt (max 2 Sätze)",
    "preis": "ca. XX€",
    "shop": "Amazon/Etsy/Zalando/etc",
    "suchbegriff": "Suchbegriff für den Shop"
  }
]

Sei kreativ! Keine langweiligen Standardgeschenke wie Gutscheine. Denke an persönliche, überraschende Ideen zwischen 15-80€.`;
};

const LoadingAnimation = () => (
  <div className="loading-container">
    <div className="gift-box">
      <div className="gift-lid"></div>
      <div className="gift-body"></div>
    </div>
    <p className="loading-text">Die Geschenke-Magie wirkt...</p>
    <div className="sparkles">
      {[...Array(6)].map((_, i) => (
        <span key={i} className="sparkle" style={{ animationDelay: `${i * 0.2}s` }}>✨</span>
      ))}
    </div>
  </div>
);

const GiftCard = ({ gift, index }) => {
  const getShopUrl = () => {
    return getAffiliateUrl(gift.shop, gift.suchbegriff);
  };

  return (
    <div className="gift-card" style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="gift-number">{index + 1}</div>
      <h3 className="gift-name">{gift.name}</h3>
      <p className="gift-description">{gift.beschreibung}</p>
      <div className="gift-meta">
        <span className="gift-price">{gift.preis}</span>
        <span className="gift-shop">bei {gift.shop}</span>
      </div>
      <a 
        href={getShopUrl()} 
        target="_blank" 
        rel="noopener noreferrer"
        className="gift-button"
      >
        Jetzt shoppen →
      </a>
    </div>
  );
};

const relationships = [
  { value: "partner", label: "Partner/Partnerin", icon: "💕", description: "Meine bessere Hälfte" },
  { value: "eltern", label: "Eltern", icon: "👨‍👩‍👧", description: "Mama, Papa oder beide" },
  { value: "freund", label: "Freund/Freundin", icon: "🤝", description: "Mein/e beste/r Kumpel/in" },
  { value: "kollege", label: "Kollege/Kollegin", icon: "💼", description: "Aus dem Büro" }
];

export default function GiftFinder() {
  const [screen, setScreen] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [relationship, setRelationship] = useState(null);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = () => {
    setScreen('relationship');
    setCurrentQuestion(0);
    setAnswers([]);
    setRelationship(null);
  };

  const handleRelationshipSelect = (value) => {
    setRelationship(value);
    setScreen('quiz');
  };

  const handleAnswer = async (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen('loading');
      setLoading(true);
      
      try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "claude-sonnet-4-20250514",
            max_tokens: 1000,
            messages: [{ role: "user", content: generatePrompt(newAnswers, relationship) }]
          })
        });
        
        const data = await response.json();
        const text = data.content.map(item => item.text || "").join("");
        const cleanJson = text.replace(/```json|```/g, "").trim();
        const parsedGifts = JSON.parse(cleanJson);
        
        setGifts(parsedGifts);
        setScreen('results');
      } catch (err) {
        console.error("Error:", err);
        setError("Ups! Die Geschenke-Elfen sind gerade überfordert. Versuch's nochmal!");
        setScreen('error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRestart = () => {
    setScreen('start');
    setCurrentQuestion(0);
    setAnswers([]);
    setGifts([]);
    setError(null);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .app {
          min-height: 100vh;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          overflow-x: hidden;
          position: relative;
        }
        
        .app::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255, 177, 153, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 218, 185, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 140, 105, 0.05) 0%, transparent 30%);
          pointer-events: none;
        }
        
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 24px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          z-index: 1;
        }
        
        /* Start Screen */
        .start-screen {
          text-align: center;
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .logo {
          font-size: 4rem;
          margin-bottom: 16px;
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.5rem, 8vw, 4rem);
          font-weight: 700;
          background: linear-gradient(135deg, #FFB199 0%, #FF8C69 50%, #FFE5B4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        
        .subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }
        
        .start-button {
          background: linear-gradient(135deg, #FF8C69 0%, #FF6B4A 100%);
          border: none;
          padding: 20px 48px;
          font-size: 1.2rem;
          font-weight: 600;
          color: white;
          border-radius: 60px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(255, 107, 74, 0.4);
          font-family: 'DM Sans', sans-serif;
        }
        
        .start-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 40px rgba(255, 107, 74, 0.5);
        }
        
        .features {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 64px;
          flex-wrap: wrap;
        }
        
        .feature {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }
        
        .feature-icon {
          font-size: 1.2rem;
        }
        
        /* Quiz Screen */
        .quiz-screen {
          animation: slideIn 0.5s ease-out;
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .progress-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          margin-bottom: 48px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF8C69, #FFB199);
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        
        .question-number {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .question-emoji {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        
        .question-text {
          font-family: 'Playfair Display', serif;
          font-size: clamp(1.8rem, 5vw, 2.5rem);
          font-weight: 600;
          margin-bottom: 40px;
          line-height: 1.3;
        }
        
        .options {
          display: grid;
          gap: 16px;
        }
        
        .option {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 20px 24px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 16px;
          text-align: left;
        }
        
        .option:hover {
          background: rgba(255, 140, 105, 0.15);
          border-color: rgba(255, 140, 105, 0.4);
          transform: translateX(8px);
        }
        
        .option-icon {
          font-size: 1.8rem;
          flex-shrink: 0;
        }
        
        .option-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Relationship Screen */
        .relationship-subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          margin-bottom: 32px;
          margin-top: -24px;
        }

        .relationship-options {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        @media (max-width: 600px) {
          .relationship-options {
            grid-template-columns: 1fr;
          }
        }

        .relationship-option {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 24px 20px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          text-align: center;
        }

        .relationship-option:hover {
          background: rgba(255, 140, 105, 0.15);
          border-color: rgba(255, 140, 105, 0.4);
          transform: translateY(-4px);
        }

        .relationship-icon {
          font-size: 2.5rem;
        }

        .relationship-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .relationship-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .relationship-desc {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
        }

        /* Loading Screen */
        .loading-container {
          text-align: center;
          padding: 60px 0;
        }
        
        .gift-box {
          width: 100px;
          height: 100px;
          margin: 0 auto 32px;
          position: relative;
        }
        
        .gift-body {
          width: 80px;
          height: 60px;
          background: linear-gradient(135deg, #FF8C69, #FF6B4A);
          border-radius: 8px;
          position: absolute;
          bottom: 0;
          left: 10px;
        }
        
        .gift-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 12px;
          height: 100%;
          background: #FFE5B4;
        }
        
        .gift-lid {
          width: 90px;
          height: 20px;
          background: linear-gradient(135deg, #FF6B4A, #FF4A2A);
          border-radius: 4px;
          position: absolute;
          top: 20px;
          left: 5px;
          animation: lidBounce 1s ease-in-out infinite;
        }
        
        .gift-lid::before {
          content: '';
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 30px;
          background: #FFE5B4;
          border-radius: 50% 50% 0 0;
        }
        
        @keyframes lidBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        .loading-text {
          font-size: 1.3rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
        }
        
        .sparkles {
          display: flex;
          justify-content: center;
          gap: 12px;
        }
        
        .sparkle {
          font-size: 1.5rem;
          animation: sparkle 1.5s ease-in-out infinite;
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        /* Results Screen */
        .results-screen {
          animation: fadeIn 0.6s ease-out;
        }
        
        .results-header {
          text-align: center;
          margin-bottom: 48px;
        }
        
        .results-emoji {
          font-size: 3rem;
          margin-bottom: 16px;
        }
        
        .results-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 6vw, 2.8rem);
          font-weight: 700;
          background: linear-gradient(135deg, #FFB199 0%, #FF8C69 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        
        .results-subtitle {
          color: rgba(255, 255, 255, 0.6);
          font-size: 1.1rem;
        }
        
        .gifts-grid {
          display: grid;
          gap: 24px;
        }
        
        .gift-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 28px;
          position: relative;
          animation: cardSlide 0.5s ease-out backwards;
          transition: all 0.3s ease;
        }
        
        .gift-card:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 140, 105, 0.3);
          transform: translateY(-4px);
        }
        
        @keyframes cardSlide {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gift-number {
          position: absolute;
          top: -12px;
          left: 24px;
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #FF8C69, #FF6B4A);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.9rem;
        }
        
        .gift-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #fff;
        }
        
        .gift-description {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        
        .gift-meta {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
        }
        
        .gift-price {
          background: rgba(255, 140, 105, 0.2);
          color: #FFB199;
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }
        
        .gift-shop {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
        }
        
        .gift-button {
          display: inline-block;
          background: transparent;
          border: 1px solid rgba(255, 140, 105, 0.5);
          color: #FFB199;
          padding: 12px 24px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
        }
        
        .gift-button:hover {
          background: rgba(255, 140, 105, 0.2);
          border-color: #FF8C69;
        }
        
        .restart-button {
          display: block;
          margin: 48px auto 0;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.7);
          padding: 16px 32px;
          border-radius: 30px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'DM Sans', sans-serif;
        }
        
        .restart-button:hover {
          border-color: rgba(255, 255, 255, 0.4);
          color: #fff;
        }
        
        /* Error Screen */
        .error-screen {
          text-align: center;
          padding: 60px 0;
        }
        
        .error-emoji {
          font-size: 4rem;
          margin-bottom: 24px;
        }
        
        .error-text {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 32px;
        }
        
        /* Affiliate Notice */
        .affiliate-notice {
          text-align: center;
          margin-top: 48px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
      
      <div className="app">
        <div className="container">
          {screen === 'start' && (
            <div className="start-screen">
              <div className="logo">🎁</div>
              <h1 className="title">Geschenke-Finder</h1>
              <p className="subtitle">
                Beantworte 3 lustige Fragen über den Beschenkten und wir zaubern dir 
                die perfekten Last-Minute Geschenkideen!
              </p>
              <button className="start-button" onClick={handleStart}>
                Los geht's! ✨
              </button>
              <div className="features">
                <div className="feature">
                  <span className="feature-icon">⚡</span>
                  <span>Nur 30 Sekunden</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">🎯</span>
                  <span>Personalisiert</span>
                </div>
                <div className="feature">
                  <span className="feature-icon">💝</span>
                  <span>Kreativ & Liebevoll</span>
                </div>
              </div>
            </div>
          )}

          {screen === 'relationship' && (
            <div className="quiz-screen">
              <div className="question-emoji">👤</div>
              <h2 className="question-text">Für wen suchst du ein Geschenk?</h2>
              <p className="relationship-subtitle">Das hilft uns, passendere Vorschläge zu machen</p>
              <div className="relationship-options">
                {relationships.map((rel) => (
                  <button
                    key={rel.value}
                    className="relationship-option"
                    onClick={() => handleRelationshipSelect(rel.value)}
                  >
                    <span className="relationship-icon">{rel.icon}</span>
                    <div className="relationship-text">
                      <span className="relationship-label">{rel.label}</span>
                      <span className="relationship-desc">{rel.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {screen === 'quiz' && (
            <div className="quiz-screen" key={currentQuestion}>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
              <div className="question-number">
                Frage {currentQuestion + 1} von {questions.length}
              </div>
              <div className="question-emoji">{questions[currentQuestion].emoji}</div>
              <h2 className="question-text">{questions[currentQuestion].question}</h2>
              <div className="options">
                {questions[currentQuestion].options.map((option) => (
                  <button 
                    key={option.value}
                    className="option"
                    onClick={() => handleAnswer(option.value)}
                  >
                    <span className="option-icon">{option.icon}</span>
                    <span className="option-label">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {screen === 'loading' && <LoadingAnimation />}
          
          {screen === 'results' && (
            <div className="results-screen">
              <div className="results-header">
                <div className="results-emoji">🎉</div>
                <h2 className="results-title">Deine Geschenkideen!</h2>
                <p className="results-subtitle">Persönlich ausgewählt basierend auf deinen Antworten</p>
              </div>
              <div className="gifts-grid">
                {gifts.map((gift, index) => (
                  <GiftCard key={index} gift={gift} index={index} />
                ))}
              </div>
              <button className="restart-button" onClick={handleRestart}>
                🔄 Nochmal für jemand anderen
              </button>
              <div className="affiliate-notice">
                * Links führen zu Partner-Shops. Bei einem Kauf erhalten wir eine kleine Provision – 
                für dich entstehen keine Mehrkosten. Danke für deine Unterstützung! 💚
              </div>
            </div>
          )}
          
          {screen === 'error' && (
            <div className="error-screen">
              <div className="error-emoji">🙈</div>
              <p className="error-text">{error}</p>
              <button className="start-button" onClick={handleRestart}>
                Nochmal versuchen
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
