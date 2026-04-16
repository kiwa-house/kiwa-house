'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLocale, Locale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Globe, X } from 'lucide-react';

const languages: { code: Locale; label: string; flag: string }[] = [
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
];

export function Navigation() {
  const { locale, setLocale, t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-emerald-700">
              苏州Housing
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link
              href={`/${locale}/properties`}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('nav.properties')}
            </Link>
            <Link
              href={`/${locale}/services`}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('nav.services')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('nav.about')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
            >
              {t('nav.contact')}
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>{currentLang.flag} {currentLang.label}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLocale(lang.code)}
                    className={locale === lang.code ? 'bg-emerald-50' : ''}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link
                href={`/${locale}`}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                href={`/${locale}/properties`}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.properties')}
              </Link>
              <Link
                href={`/${locale}/services`}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="text-sm font-medium text-gray-700 hover:text-emerald-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              {/* Mobile Language Selector */}
              <div className="pt-4 border-t">
                <div className="text-sm font-medium text-gray-500 mb-2">
                  {t('nav.language')}
                </div>
                <div className="flex space-x-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-sm ${
                        locale === lang.code
                          ? 'text-emerald-600 font-medium'
                          : 'text-gray-600'
                      }`}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
