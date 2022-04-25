import React, {
  ReactText,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  cities,
  getCityName,
  sanitizeCityName,
} from "../domain/cities";
import { CityInput } from "./CityInput";
import * as geolib from "geolib";
import { Share } from "./Share";
import { Guesses } from "./Guesses";
import { useTranslation } from "react-i18next";
import { SettingsData } from "../hooks/useSettings";
import { useMode } from "../hooks/useMode";
import { getDayString, useTodays } from "../hooks/useTodays";
import { Twemoji } from "@teuteuf/react-emoji-render";
import { City } from "../domain/cities";
import { Direction } from "../domain/geography";

const MAX_TRY_COUNT = 8;

interface Person {
        name: string;
        firstName: string;
}

const candidates: Person[] = [
        {name:"MACRON", firstName:"Emmanuel"},
        {name:"LE PEN", firstName:"Marine"},
        {name:"MÉLENCHON", firstName:"Jean-luc"},
        {name:"ZEMMOUR", firstName:"Eric"},
        {name:"JADOT", firstName:"Yannick"},
        {name:"PÉCRESSE", firstName:"Valérie"},
        {name:"LASSALLE", firstName:"Jean"},
        {name:"ROUSSEL", firstName:"Fabien"},
        {name:"DUPONT-AIGNAN", firstName:"Nicolas"},
        {name:"POUTOU", firstName:"Philippe"},
        {name:"HIDALGO", firstName:"Anne"},
        {name:"ARTHAUD", firstName:"Nathalie"},
        ];

interface GameProps {
  settingsData: SettingsData;
  updateSettings: (newSettings: Partial<SettingsData>) => void;
}

export function Game({ settingsData, updateSettings }: GameProps) {
  const { t, i18n } = useTranslation();
  const dayString = useMemo(
    () => getDayString(settingsData.shiftDayCount),
    [settingsData.shiftDayCount]
  );

  const cityInputRef = useRef<HTMLInputElement>(null);

  const [todays, addGuess, randomAngle, imageScale] = useTodays(dayString);
  const { city, guesses } = todays;

  const [currentGuess, setCurrentGuess] = useState("");
  const [hideImageMode, setHideImageMode] = useMode(
    "hideImageMode",
    dayString,
    settingsData.noImageMode
  );
  const [rotationMode, setRotationMode] = useMode(
    "rotationMode",
    dayString,
    settingsData.rotationMode
  );

  const gameEnded =
    guesses.length === MAX_TRY_COUNT ||
    guesses[guesses.length - 1]?.distance === 0;

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      if (city == null) {
        return;
      }
      e.preventDefault();
      const guessedCity = cities.find(
        (city) =>
          sanitizeCityName(
            getCityName(i18n.resolvedLanguage, city)
          ) === sanitizeCityName(currentGuess)
      );

      if (guessedCity == null) {
        toast.error(t("unknownCity"));
        return;
      }

      const distance= geolib.getDistance(guessedCity, city)
      const newGuess = {
        name: currentGuess,
        distance: distance,
        direction: getCompassDirection(guessedCity, city, distance),
      };

      addGuess(newGuess);
      setCurrentGuess("");

      if (newGuess.distance === 0) {
        toast.success(t("welldone"), { delay: 2000 });
      }
    },
    [addGuess, city, currentGuess, i18n.resolvedLanguage, t]
  );

  function getCompassDirection(origin: City, dest: City, distance: Number) {
      var offset = distance >= 100_000 ? 0.5 : 0.1
      var ewdirection = ""
      if (origin.latitude + offset < dest.latitude) {
        ewdirection = "E"
      }
      if (dest.latitude + offset < origin.latitude) {
        ewdirection = "W"
      }

      var nsdirection = ""
      if (origin.longitude + offset < dest.longitude) {
        nsdirection = "N"
      }
      if (dest.longitude + offset < origin.longitude) {
        nsdirection = "S"
      }

      var direction = nsdirection + ewdirection

      if (direction == "") {
        var latDiff = Math.abs(origin.latitude - dest.latitude)
        var lonDiff = Math.abs(origin.longitude- dest.longitude)
        if (latDiff > lonDiff) {
          if (origin.latitude < dest.latitude) {
            direction = "E"
          }
          if (dest.latitude < origin.latitude) {
            direction = "W"
          }
        } else {
          if (origin.longitude < dest.longitude) {
            direction = "N"
          }
          if (dest.longitude < origin.longitude) {
            direction = "S"
          }
        }
      }

      return direction as Direction;
  };

  useEffect(() => {
    let toastId: ReactText;
    const { city, guesses } = todays;
    if (
      city &&
      guesses.length === MAX_TRY_COUNT &&
      guesses[guesses.length - 1].distance > 0
    ) {
      toastId = toast.info(
        getCityName(i18n.resolvedLanguage, city).toUpperCase(),
        {
          autoClose: false,
          delay: 2000,
        }
      );
    }

    return () => {
      if (toastId != null) {
        toast.dismiss(toastId);
      }
    };
  }, [todays, i18n.resolvedLanguage]);

  return (
    <div className="flex-grow flex flex-col mx-2">
      {hideImageMode && !gameEnded && (
        <button
          className="border-2 uppercase my-2 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
          type="button"
          onClick={() => setHideImageMode(false)}
        >
          <Twemoji
            text={t("showCity")}
            options={{ className: "inline-block" }}
          />
        </button>
      )}
      <h1>Premier tour</h1>
      <table>
        <thead>
          <tr>
            <th>Candidat</th>
            <th>Résultat</th>
          </tr>
        </thead>
        <tbody>
          {
          city?.c.map((value, index) => {
          return (
          <tr className={value.n.replace(" ", "").toLowerCase()}>
            <td>{candidates.filter((c) => c.name == value.n)[0]?.firstName} {value.n}</td>
            <td>{value.r}%</td>
          </tr>
          )
          })}
        </tbody>
      </table>
      <br></br>
      <h1>Deuxième tour</h1>
      <table>
        <thead>
          <tr>
            <th>Candidat</th>
            <th>Résultat</th>
          </tr>
        </thead>
        <tbody>
          {
          city?.c2.map((value, index) => {
          return (
          <tr className={value.n.replace(" ", "").toLowerCase()}>
            <td>{candidates.filter((c) => c.name == value.n)[0]?.firstName} {value.n}</td>
            <td>{value.r}%</td>
          </tr>
          )
          })}
        </tbody>
      </table>
      <br></br>
      <div className="flex my-1">
        {settingsData.allowShiftingDay && settingsData.shiftDayCount > 0 && (
          <button
            type="button"
            onClick={() =>
              updateSettings({
                shiftDayCount: Math.max(0, settingsData.shiftDayCount - 1),
              })
            }
          >
            <Twemoji text="↪️" className="text-xl" />
          </button>
        )}
        {settingsData.allowShiftingDay && settingsData.shiftDayCount < 7 && (
          <button
            type="button"
            onClick={() =>
              updateSettings({
                shiftDayCount: Math.min(7, settingsData.shiftDayCount + 1),
              })
            }
          >
            <Twemoji text="↩️" className="text-xl" />
          </button>
        )}
      </div>
      <Guesses
        rowCount={MAX_TRY_COUNT}
        guesses={guesses}
        settingsData={settingsData}
        cityInputRef={cityInputRef}
      />
      <div className="my-2">
        {gameEnded && city ? (
          <>
            <Share
              guesses={guesses}
              dayString={dayString}
              settingsData={settingsData}
              hideImageMode={hideImageMode}
              rotationMode={rotationMode}
            />
            <a
              className="underline w-full text-center block mt-4"
              href={`https://www.google.com/maps?q=${getCityName(
                i18n.resolvedLanguage,
                city
              )}+${city.code.toUpperCase()}&hl=${i18n.resolvedLanguage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twemoji
                text={t("showOnGoogleMaps")}
                options={{ className: "inline-block" }}
              />
            </a>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <CityInput
                inputRef={cityInputRef}
                currentGuess={currentGuess}
                setCurrentGuess={setCurrentGuess}
              />
              <button
                className="rounded font-bold p-1 flex items-center justify-center border-2 uppercase my-0.5 hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-slate-800 dark:active:bg-slate-700"
                type="submit"
              >
                <Twemoji
                  text="🇫🇷"
                  options={{ className: "inline-block" }}
                  className="flex items-center justify-center"
                />{" "}
                <span className="ml-1">{t("guess")}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
