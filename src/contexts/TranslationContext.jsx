import React, { createContext, useState, useEffect, useContext } from "react";

import frbasic from "../translation/fr/basic.json";
import frHome from "../translation/fr/home.json";
import frFaqs from "../translation/fr/faqs.json";
import frContact from "../translation/fr/contactus.json";
import frSupplier from "../translation/fr/supplier.json";
import frPrivacy from "../translation/fr/privacy.json";

import rubasic from "../translation/ru/basic.json";
import ruHome from "../translation/ru/home.json";
import ruFaqs from "../translation/ru/faqs.json";
import ruContact from "../translation/ru/contactus.json";
import ruSupplier from "../translation/ru/supplier.json";
import ruPrivacy from "../translation/ru/privacy.json";

const allTranslations = {
  fr: {
    ...frbasic,
    ...frHome,
    ...frFaqs,
    ...frContact,
    ...frSupplier,
    ...frPrivacy,
  },
  ru: {
    ...rubasic,
    ...ruHome,
    ...ruFaqs,
    ...ruContact,
    ...ruSupplier,
    ...ruPrivacy,
  },
};

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const savedLocale = localStorage.getItem("appLocale");
    return savedLocale || "en";
  });

  const [currentTranslations, setCurrentTranslations] = useState({});

  useEffect(() => {
    if (locale === "en" || !allTranslations[locale]) {
      setCurrentTranslations({});
    } else {
      setCurrentTranslations(allTranslations[locale]);
    }
    localStorage.setItem("appLocale", locale);

    document.documentElement.dir = "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const t = (key, arg2, arg3) => {
    let defaultValue = undefined;
    let replacements = {};

    if (typeof arg2 === "object" && arg2 !== null) {
      // Scenario: t(key, { replacements })
      replacements = arg2;
    } else if (arg2 !== undefined) {
      // Scenario: t(key, defaultValue) or t(key, defaultValue, { replacements })
      defaultValue = arg2;
      if (typeof arg3 === "object" && arg3 !== null) {
        replacements = arg3;
      }
    }

    let text = currentTranslations[key];

    if (text === undefined) {
      text = defaultValue !== undefined ? defaultValue : key;
    }

    if (
      typeof replacements === "object" &&
      replacements !== null &&
      Object.keys(replacements).length > 0
    ) {
      for (const placeholder in replacements) {
        text = text.replace(new RegExp(`\\{${placeholder}\\}`, "g"), replacements[placeholder]);
      }
    }

    return text;
  };

  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
