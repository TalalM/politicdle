import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Game } from "./components/Game";
import React, { useEffect, useMemo, useState } from "react";
import { Infos } from "./components/panels/Infos";
import { useTranslation } from "react-i18next";
import { useSettings } from "./hooks/useSettings";
import { Politicdle } from "./components/Politicdle";
import { Stats } from "./components/panels/Stats";
import { useReactPWAInstall } from "@teuteuf/react-pwa-install";
import { InstallButton } from "./components/InstallButton";
import { Twemoji } from "@teuteuf/react-emoji-render";
import { getDayString, useTodays } from "./hooks/useTodays";

const supportLink: Record<string, string> = {
  UA: "https://donate.redcrossredcrescent.org/ua/donate/~my-donation?_cv=1",
};

function App() {
  const { t, i18n } = useTranslation();

  const dayString = useMemo(getDayString, []);
  const [{ city }] = useTodays(dayString);

  const { pwaInstall, supported, isInstalled } = useReactPWAInstall();

  const [infoOpen, setInfoOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);

  const [settingsData, updateSettings] = useSettings();

  useEffect(() => {
      document.documentElement.classList.remove("dark");
  }, [settingsData.theme]);

  return (
    <>
      <ToastContainer
        hideProgressBar
        position="top-center"
        transition={Flip}
        theme={settingsData.theme}
        autoClose={2000}
        bodyClassName="font-bold text-center"
      />
      <Infos
          isOpen={infoOpen}
          close={() => setInfoOpen(false)}
          settingsData={settingsData}
      />
      <Stats
        isOpen={statsOpen}
        close={() => setStatsOpen(false)}
        distanceUnit={settingsData.distanceUnit}
      />
      <div className="flex justify-center flex-auto dark:bg-slate-900 dark:text-slate-50">
        <div className="w-full max-w-lg flex flex-col">
          <header className="border-b-2 px-3 border-gray-200 flex">
            <button
              className="mr-3 text-xl"
              type="button"
              onClick={() => setInfoOpen(true)}
            >
              <Twemoji text="❓" />
            </button>
            {supported() && !isInstalled() && (
              <InstallButton pwaInstall={pwaInstall} />
            )}
            <h1 className="text-4xl font-bold uppercase tracking-wide text-center my-1 flex-auto">
              Politic<span className="text-green-600">d</span>le
            </h1>
            <button
              className="ml-3 text-xl"
              type="button"
              onClick={() => setStatsOpen(true)}
            >
              <Twemoji text="📈" />
            </button>
          </header>
          <Game settingsData={settingsData} updateSettings={updateSettings} />
          <footer className="flex justify-center items-center text-sm mt-8 mb-1">
            <Twemoji
              text="❤️"
              className="flex items-center justify-center mr-1"
            />{" "}
            <Politicdle />? -
            {city && supportLink[city.code] != null ? (
              <a
                className="underline pl-1"
                href={supportLink[city.code]}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-max">{t(`support.${city.code}`)}</div>
              </a>
            ) : (
              <a
                className="underline pl-1"
                href="https://www.ko-fi.com/elpastoristo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-max">
                  <Twemoji
                    text={t("buyMeACoffee")}
                    options={{ className: "inline-block" }}
                  />
                </div>
              </a>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
