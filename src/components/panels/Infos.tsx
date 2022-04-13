import { Guesses } from "../Guesses";
import { Panel } from "./Panel";
import React from "react";
import { Politicdle } from "../Politicdle";
import { formatDistance } from "../../domain/geography";
import { SettingsData } from "../../hooks/useSettings";
import { Twemoji } from "@teuteuf/react-emoji-render";

interface InfosProps {
  isOpen: boolean;
  close: () => void;
  settingsData: SettingsData;
}

export function Infos({ isOpen, close, settingsData }: InfosProps) {
  return (
    <Panel title="Comment jouer" isOpen={isOpen} close={close}>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div>
          {" "}
          Devinez le <Politicdle /> en 8 essais.
        </div>
        <div>
          Il s'agit de deviner la ville qui a eu les résultats affichés lors du premier tour de
          l'élection présidentielle de 2022.
        </div>
        <div>Chaque essai doit être une ville valide.
          Seules les villes ayant eu au moins 10.000 votes exprimés sont valides (pour information, il y en a 459).<br/>
          Après chaque essai, vous aurez la distance, la direction et la
          proximité entre votre essai et la ville cible.
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div className="font-bold">Exemples</div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Clermont-Ferrand",
                direction: "NW",
                distance: 369_000,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            Votre essai <span className="uppercase font-bold">Clermont-Ferrand</span> est à{" "}
            {formatDistance(369_000, settingsData.distanceUnit)} de la ville
            cible, la ville cible se trouve dans la direction Nord-Ouest et vous
            avez une proximité de 79% !
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Amiens",
                direction: "SW",
                distance: 113_000,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            Votre second essai{" "}
            <span className="uppercase font-bold">Amiens</span> est plus
            proche ! La bonne réponse est à{" "}
            {formatDistance(113_000, settingsData.distanceUnit)}, au Sud-Ouest
            et la proximité est de 93%!
          </div>
        </div>
        <div>
          <Guesses
            rowCount={1}
            guesses={[
              {
                name: "Poissy",
                direction: "N",
                distance: 0,
              },
            ]}
            settingsData={settingsData}
          />
          <div className="my-2">
            Prochain essai, <span className="uppercase font-bold">Poissy</span>,
            c&apos;est la ville à deviner ! Bien joué !{" "}
            <Twemoji text="🎉" options={{ className: "inline-block" }} />
          </div>
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3 font-bold">
        Un nouveau <Politicdle /> sera disponible toutes les 3 heures !
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <div>
          <Politicdle /> n'a pas de FAQ mais si vous avez des questions, vous pouvez me contacter sur {" "}
          <a
            className="underline"
            href="https://twitter.com/talalmazroui"
            target="_blank"
            rel="noopener noreferrer"
          >
            @talalmazroui
          </a>.
        </div>
      </div>
      <div className="space-y-3 text-justify border-b-2 border-gray-200 pb-3 mb-3">
        <Politicdle /> est <b>fortement</b> inspiré de{" "}
        <a
          className="underline"
          href="http://worldle.teuteuf.fr/"
          target="_blank"
          rel="noopener noreferrer"
        >Worldle</a>{" "} créé par {" "}
        <a
          className="underline"
          href="https://twitter.com/teuteuf"
          target="_blank"
          rel="noopener noreferrer"
        >
          @teuteuf
        </a>.
      </div>
      <div className="space-y-3 text-justify pb-3">
        <div>
          Fait par{" "}
          <a
            className="underline"
            href="https://twitter.com/talalmazroui"
            target="_blank"
            rel="noopener noreferrer"
          >
            @talalmazroui
          </a>{" "}
          - (
          <a
            className="underline"
            href="https://github.com/TalalM/politicdle/"
            target="_blank"
            rel="noopener noreferrer"
          >
            code source
          </a>
          )
        </div>
        <div>
          Vous pouvez aller voir mes autres projets du même type ici :{" "}
          <a
            className="underline"
            href="https://www.countrydle.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Countrydle
          </a>, {" "}
          <a
            className="underline"
            href="https://www.flagdle.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flagdle
          </a>, {" "}
          <a
            className="underline"
            href="https://www.stadiumdle.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stadiumdle
          </a>
        </div>
        <div>
          Vous voulez me soutenir ?{" "}
          <a
            className="underline"
            href="https://www.ko-fi.com/elpastoristo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twemoji
              text="Offrez moi un café ! ☕"
              options={{ className: "inline-block" }}
            />
          </a>
        </div>
      </div>
    </Panel>
  );
}
