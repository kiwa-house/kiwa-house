'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, Target, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  const { locale, t } = useLocale();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('nav.about')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'ja' ? '蘇州で日本向の租房サービスNo.1':
             locale === 'zh' ? '苏州日本租房服务领先品牌':
             'Leading Japanese Housing Service in Suzhou'}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {locale === 'ja' ? '会社理念' : locale === 'zh' ? '公司理念' : 'Our Philosophy'}
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  {locale === 'ja' ? '苏州Housingは、蘇州市で日本人が安心して暮らせる住環境を提供することを使命としています。':
                   locale === 'zh' ? '苏州Housing的使命是为在苏州的日本人提供安心舒适的居住环境。':
                   'Our mission is to provide a safe and comfortable living environment for Japanese people in Suzhou.'}
                </p>
                <p>
                  {locale === 'ja' ? '苏州市は中国经济の花形都市として、近年ますます多くの日本企业和和日本人が进驻しています。しかし、言葉の壁や文化の違いから、租房に困っている日本人が多くいらっしゃいます。':
                   locale === 'zh' ? '苏州作为中国经济的重要城市，近年来越来越多的日本企业和日本人入驻。然而，由于语言障碍和文化差异，许多日本人在租房方面遇到困难。':
                   'As a major economic hub in China, Suzhou has seen an increasing number of Japanese companies and residents. However, many Japanese people struggle with housing due to language barriers and cultural differences.'}
                </p>
                <p>
                  {locale === 'ja' ? '苏州Housingは、日本人ならではの目線で、蘇州の信頼できる房源信息と专业的サービスを提供しています。':
                   locale === 'zh' ? '苏州Housing从日本人的角度出发，提供苏州可靠的房源信息和专业的服务。':
                   'Suzhou Housing provides reliable property information and professional services from a Japanese perspective.'}
                </p>
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"
                alt="Office"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {locale === 'ja' ? '価値観' : locale === 'zh' ? '核心价值观' : 'Our Values'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                <Users className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ja' ? '顧客第一' : locale === 'zh' ? '客户至上' : 'Customer First'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? '常にお客樣の立場で考えます':
                 locale === 'zh' ? '始终站在客户角度思考':
                 'Always think from customer perspective'}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ja' ? '専門性' : locale === 'zh' ? '专业精神' : 'Professionalism'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? '丰富的知識と経験':
                 locale === 'zh' ? '丰富的知识和经验':
                 'Rich knowledge and experience'}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ja' ? '真心' : locale === 'zh' ? '真诚用心' : 'Sincerity'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? '真心を込めてお手伝い':
                 locale === 'zh' ? '用心真诚帮助':
                 'Help with genuine sincerity'}
              </p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Award className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ja' ? '品質' : locale === 'zh' ? '品质保证' : 'Quality'}
              </h3>
              <p className="text-sm text-gray-600">
                {locale === 'ja' ? '高品質な房源与服务':
                 locale === 'zh' ? '高质量房源与服务':
                 'High-quality properties & service'}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {locale === 'ja' ? '会社概要の詳細':
             locale === 'zh' ? '了解更多关于我们':
             'Learn More About Us'}
          </h2>
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
