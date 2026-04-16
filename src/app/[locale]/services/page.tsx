'use client';

import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Truck,
  LifeBuoy,
  Languages,
  Eye,
  ArrowRight,
  Clock,
  Users,
  Shield,
  Heart,
} from 'lucide-react';

const services = [
  {
    icon: Truck,
    key: 'moving',
    features: [
      'ja:日本品質の梱包・搬运',
      'zh:日式精品包装搬运',
      'en:Japanese-quality packing & moving',
    ],
  },
  {
    icon: LifeBuoy,
    key: 'life',
    features: [
      'ja:蘇州市の生活サポート（病院、银行、行政手続き）',
      'zh:苏州生活支持（医院、银行、行政手续）',
      'en:Life support in Suzhou (hospital, bank, admin)',
    ],
  },
  {
    icon: Languages,
    key: 'translation',
    features: [
      'ja:契約書の翻訳・中日同時、通訳',
      'zh:合同翻译、中日同声传译',
      'en:Contract translation & simultaneous interpreting',
    ],
  },
  {
    icon: Eye,
    key: 'viewing',
    features: [
      'ja:日本語堪能なスタッフが同行',
      'zh:日语流利的工作人员陪同',
      'en:Japanese-fluent staff accompaniment',
    ],
  },
];

export default function ServicesPage() {
  const { locale, t } = useLocale();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {locale === 'ja' ? '付帯サービス' : locale === 'zh' ? '配套服务' : 'Support Services'}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'ja' ? '蘇州での新生活を全面的にサポート':
             locale === 'zh' ? '全方位支持您在苏州的新生活':
             'Full support for your new life in Suzhou'}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              const description = service.features.find(f => f.startsWith(locale === 'ja' ? 'ja:' : locale === 'zh' ? 'zh:' : 'en:'))?.split(':').pop() || '';
              
              return (
                <Card key={service.key} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-8 w-8 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t(`service.${service.key}`)}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {t(`service.${service.key}.desc`)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Our Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {locale === 'ja' ? 'サービスの特徴' : locale === 'zh' ? '服务特点' : 'Service Features'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">
                {locale === 'ja' ? '素的対応' : locale === 'zh' ? '快速响应' : 'Quick Response'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? '24時間以内に返答':
                 locale === 'zh' ? '24小时内回复':
                 'Response within 24 hours'}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">
                {locale === 'ja' ? '日本語対応' : locale === 'zh' ? '日语服务' : 'Japanese Support'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? '日本語で気軽に相談':
                 locale === 'zh' ? '日语咨询无障碍':
                 'Consult in Japanese freely'}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">
                {locale === 'ja' ? '安心·安全' : locale === 'zh' ? '安心安全' : 'Safe & Secure'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? '信頼できる取引先':
                 locale === 'zh' ? '可靠的合作方':
                 'Trusted partners'}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">
                {locale === 'ja' ? '寄り添う' : locale === 'zh' ? '贴心服务' : 'Personal Care'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? 'お客様の立場で':
                 locale === 'zh' ? '站在客户角度':
                 'From your perspective'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {locale === 'ja' ? 'サービス预约·お問い合わせ':
             locale === 'zh' ? '服务预约·咨询':
             'Service Booking & Inquiry'}
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            {locale === 'ja' ? 'サービス内容や料金について詳しくお伝えします':
             locale === 'zh' ? '详细介绍服务内容和费用':
             'Detailed information on services and pricing'}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
              {t('contact.title')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
