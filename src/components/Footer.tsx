'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { locale, t } = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">苏州Housing</h3>
            <p className="text-sm text-gray-400 mb-4">
              {locale === 'ja' ? '蘇州市で日本向の租房サービスを提供' : 
               locale === 'zh' ? '苏州专业日本人租房服务' : 
               'Professional Japanese housing service in Suzhou'}
            </p>
            <div className="space-y-2 text-sm">
              <p>Email: info@suzhouhousing.jp</p>
              <p>Tel: +86 512-XXXX-XXXX</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {locale === 'ja' ? 'クイックリンク' : locale === 'zh' ? '快速链接' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}`} className="hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/properties`} className="hover:text-white transition-colors">
                  {t('nav.properties')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {locale === 'ja' ? 'サービス' : locale === 'zh' ? '服务' : 'Services'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>{t('service.moving')}</li>
              <li>{t('service.life')}</li>
              <li>{t('service.translation')}</li>
              <li>{t('service.viewing')}</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4">
              {locale === 'ja' ? '法的情報' : locale === 'zh' ? '法律信息' : 'Legal'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>
            © {currentYear} {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              WeChat
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              LINE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
