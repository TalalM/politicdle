import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      placeholder: "Ville",
      guess: "Deviner",
      share: "Partager",
      showOnGoogleMaps: "👀 sur Google Maps",
      welldone: "Bien joué !",
      unknownCity: "Ville inconnue !",
      copy: "Résultat copié !",
      showCountry: "🗺️ Afficher la carte !",
      cancelRotation: "🌀 Annule la rotation",
      settings: {
        title: "Paramètres",
        distanceUnit: "Unité de distance",
        theme: "Thème",
        difficultyModifiers: "Modificateurs de difficulté",
        startingNextDay: "A partir du lendemain !",
        noImageMode: "Cache l'image du pays pour plus de challenge.",
        rotationMode: "Tourne l'image du pays de manière aléatoire.",
      },
      stats: {
        title: "Statistiques",
        played: "Parties",
        win: "Victoires %",
        currentStreak: "Série Actuelle",
        maxStreak: "Série Max",
        averageBestDistance: "Moyenne Meilleures Distances",
        guessDistribution: "Répartitions des victoires:",
      },
      install: {
        title: "Politicdle",
        descritpionTitle: "Installer l'app:",
        description:
          "Ajouter Politicdle sur l'écran d'accueil pour le retrouver plus facilement !",
        instructionTitle: "Instructions :",
        instructionActionOk: "OK",
        instructionActionCancel: "Annuler",
        instructionActionInstall: "Installer",
        instructionFirefoxAction1: "- ouvrir les options du navigateur ",
        instructionFirefoxAction2: "- ajouter à votre écran d'accueil",
        instructionFirefoxNewAction1: "- ouvrir les options du navigateur ",
        instructionFirefoxNewAction2: '- sélectionner "Installer"',
        instructionIdeviceAction1: "- sur Safari, ouvrir le menu de partage ",
        instructionIdeviceAction2: "- sélectionner \"Sur l'écran d'accueil\"",
        instructionOperaAction1: "- appuyer sur le bouton menu ",
        instructionOperaAction2: "- ajouter à l'écran d'accueil",
        instructionNotSupported: "Impossible sur ce navigateur.",
      },
      support: {
        UA: "Soutenez la Croix Rouge Ukrainienne",
      },
      buyMeACoffee: "Offrez moi un ☕ !",
    },
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    interpolation: {
      escapeValue: false,
    },
    fallbackLng: "en",
  });

export default i18n;
