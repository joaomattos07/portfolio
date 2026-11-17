import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'lang'
const LanguageContext = createContext(null)

// escolha salva > idioma do navegador (inglês) > português
function getInitialLang() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'pt' || saved === 'en') return saved
    } catch {
        // sem acesso ao armazenamento: segue para o idioma do navegador
    }
    const browser = (typeof navigator !== 'undefined' && navigator.language) || 'pt'
    return browser.toLowerCase().startsWith('en') ? 'en' : 'pt'
}

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(getInitialLang)

    useEffect(() => {
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
        try {
            localStorage.setItem(STORAGE_KEY, lang)
        } catch {
            // sem acesso ao armazenamento: ignora
        }
    }, [lang])

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
    const ctx = useContext(LanguageContext)
    if (!ctx) throw new Error('useLanguage precisa estar dentro de <LanguageProvider>')
    return ctx
}