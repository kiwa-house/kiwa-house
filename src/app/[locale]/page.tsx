'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import { PropertyCard } from '@/components/PropertyCard';
import { sampleProperties } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import {
  Truck,
  LifeBuoy,
  Languages,
  Eye,
  Search,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export default function HomePage() {
  const { locale, t } = useLocale();

  // 获取精选房源
  const featuredProperties = sampleProperties.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-50 to-teal-50 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                {t('hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8">
                {t('hero.subtitle')}
              </p>

              {/* Quick Search */}
              <Card className="p-4 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder={t('hero.search')}
                      className="h-12"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-12 w-full md:w-40">
                      <SelectValue placeholder={t('filter.area')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('type.all')}</SelectItem>
                      <SelectItem value="sip">{t('area.sip')}</SelectItem>
                      <SelectItem value="gusu">{t('area.gusu')}</SelectItem>
                      <SelectItem value="wuzhong">{t('area.wuzhong')}</SelectItem>
                      <SelectItem value="xiangcheng">{t('area.xiangcheng')}</SelectItem>
                      <SelectItem value="huigu">{t('area.huigu')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-12 w-full md:w-40">
                      <SelectValue placeholder={t('type.all')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('type.all')}</SelectItem>
                      <SelectItem value="apartment">{t('type.apartment')}</SelectItem>
                      <SelectItem value="house">{t('type.house')}</SelectItem>
                      <SelectItem value="villa">{t('type.villa')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button size="lg" className="h-12 bg-emerald-600 hover:bg-emerald-700">
                    <Search className="h-4 w-4 mr-2" />
                    {t('filter.search')}
                  </Button>
                </div>
              </Card>

              <div className="mt-6">
                <Link href={`/${locale}/properties`}>
                  <Button variant="outline" className="text-emerald-600 border-emerald-600">
                    {t('hero.advanced')}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800"
                  alt="Luxury apartment"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Card */}
              <Card className="absolute bottom-8 left-8 p-4 shadow-xl bg-white/95 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">500+ {locale === 'ja' ? 'お客様の信頼' : locale === 'zh' ? '客户信赖' : 'Happy Clients'}</p>
                    <p className="text-sm text-gray-500">{locale === 'ja' ? '年間成約数' : locale === 'zh' ? '年成交数' : 'Deals Yearly'}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {locale === 'ja' ? '注目の物件' : locale === 'zh' ? '精选房源' : 'Featured Properties'}
            </h2>
            <Link href={`/${locale}/properties`}>
              <Button variant="ghost" className="text-emerald-600">
                {t('detail.more')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {locale === 'ja' ? 'サービス' : locale === 'zh' ? '配套服务' : 'Our Services'}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Truck className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('service.moving')}</h3>
              <p className="text-gray-600 text-sm">{t('service.moving.desc')}</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <LifeBuoy className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('service.life')}</h3>
              <p className="text-gray-600 text-sm">{t('service.life.desc')}</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Languages className="h-7 w-7 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('service.translation')}</h3>
              <p className="text-gray-600 text-sm">{t('service.translation.desc')}</p>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mb-4">
                <Eye className="h-7 w-7 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{t('service.viewing')}</h3>
              <p className="text-gray-600 text-sm">{t('service.viewing.desc')}</p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href={`/${locale}/services`}>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                {locale === 'ja' ? '詳細を見る' : locale === 'zh' ? '了解更多' : 'Learn More'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {locale === 'ja' ? 'められる理由' : locale === 'zh' ? '为什么选择我们' : 'Why Choose Us'}
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-4">10+</div>
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ja' ? '年の経験' : locale === 'zh' ? '年行业经验' : 'Years Experience'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ja' ? '苏州市で日本向の租房サービスを始めた最初の企业' : 
                 locale === 'zh' ? '苏州首批专注于日本客户的租房服务企业' : 
                 'First company in Suzhou focused on Japanese housing services'}
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-4">500+</div>
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ja' ? '取引件数' : locale === 'zh' ? '成功案例' : 'Successful Cases'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ja' ? 'これまでの取引件数' : 
                 locale === 'zh' ? '累计服务客户数量' : 
                 'Total clients served'}
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-4">24/7</div>
              <h3 className="font-semibold text-lg mb-2">
                {locale === 'ja' ? 'サポート' : locale === 'zh' ? '全天候支持' : 'Support Available'}
              </h3>
              <p className="text-gray-600">
                {locale === 'ja' ? '日本人が言葉で問題を解決' : 
                 locale === 'zh' ? '日语支持随时解决问题' : 
                 'Japanese language support anytime'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {locale === 'ja' ? '蘇州での新生活を始めましょう' : 
             locale === 'zh' ? '开始在苏州的新生活' : 
             'Start Your New Life in Suzhou'}
          </h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            {locale === 'ja' ? 'まずはお気軽にお問い合わせください。专业的スタッフがあなたのご希望に沿って物件をご紹介します。' : 
             locale === 'zh' ? '请随时联系我们，专业团队将根据您的需求为您推荐合适的房源。' : 
             'Feel free to contact us. Our professional team will recommend suitable properties based on your needs.'}
          </p>
          <Link href={`/${locale}/contact`}>
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
              {t('contact.title')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
