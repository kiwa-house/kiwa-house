'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/contexts/LocaleContext';
import { sampleProperties, facilityLabels } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  MapPin,
  Maximize,
  Bed,
  Bath,
  Building,
  Compass,
  ArrowLeft,
  Check,
  Phone,
  Mail,
  Send,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { locale, t } = useLocale();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const property = sampleProperties.find((p) => p.id === params.id as string);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {locale === 'ja' ? '物件が見つかりません' : 
             locale === 'zh' ? '房源未找到' : 
             'Property Not Found'}
          </h1>
          <Link href={`/${locale}/properties`}>
            <Button>{t('detail.more')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const title = property.title[locale] || property.title['ja'];
  const description = property.description[locale] || property.description['ja'];
  const areaName = t(`area.${property.area}`);
  const directionName = t(`direction.${property.direction}`);
  const facilities = facilityLabels[locale] || facilityLabels['ja'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-gray-600"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {locale === 'ja' ? '戻る' : locale === 'zh' ? '返回' : 'Back'}
            </Button>
            <Badge className="bg-emerald-100 text-emerald-800">
              {t(`type.${property.type}`)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}`}>{t('nav.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${locale}/properties`}>
                {t('nav.properties')}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium">{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative h-[400px] lg:h-[500px]">
                <Image
                  src={property.images[currentImageIndex]}
                  alt={title}
                  fill
                  className="object-cover"
                />
                
                {/* Image Navigation */}
                {property.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === 0 ? property.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => 
                        prev === property.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="p-4">
                <div className="flex gap-2 overflow-x-auto">
                  {property.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex
                          ? 'border-emerald-600'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${title} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {title}
                </h1>

                <div className="flex items-center text-gray-600 mb-6">
                  <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                  {areaName}
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {description}
                </p>

                {/* Property Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Maximize className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                    <p className="text-2xl font-bold text-gray-900">{property.size}</p>
                    <p className="text-sm text-gray-500">{t('common.sqm')}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Bed className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                    <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                    <p className="text-sm text-gray-500">{t('detail.bedrooms')}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Bath className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                    <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                    <p className="text-sm text-gray-500">{t('detail.bathrooms')}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Building className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                    <p className="text-2xl font-bold text-gray-900">{property.floor}/{property.totalFloors}</p>
                    <p className="text-sm text-gray-500">{t('detail.floor')}</p>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Direction */}
                <div className="flex items-center">
                  <Compass className="h-5 w-5 mr-2 text-emerald-600" />
                  <span className="font-medium">{t('detail.direction')}:</span>
                  <span className="ml-2 text-gray-600">{directionName}</span>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {t('detail.facilities')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {property.facilities.map((facility) => (
                    <div key={facility} className="flex items-center">
                      <Check className="h-5 w-5 mr-2 text-emerald-600" />
                      <span className="text-gray-700">
                        {facilities[facility] || facility}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Price Card */}
              <Card className="bg-emerald-600 text-white">
                <CardContent className="p-6">
                  <p className="text-sm opacity-90 mb-1">{t('detail.price')}</p>
                  <p className="text-3xl font-bold mb-1">
                    ¥{property.price.toLocaleString()}
                  </p>
                  <p className="text-sm opacity-80">/ {locale === 'ja' ? '月' : locale === 'zh' ? '月' : 'month'}</p>
                </CardContent>
              </Card>

              {/* Inquiry Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">{t('contact.title')}</h3>
                  
                  <Dialog open={isInquiryOpen} onOpenChange={setIsInquiryOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mb-4">
                        <Send className="h-4 w-4 mr-2" />
                        {t('contact.submit')}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{t('contact.title')}</DialogTitle>
                        <DialogDescription>
                          {locale === 'ja' ? '物件についてのお問い合わせ' : 
                           locale === 'zh' ? '对此房源的咨询' : 
                           'Inquiry about this property'}
                        </DialogDescription>
                      </DialogHeader>
                      <form className="space-y-4 mt-4">
                        <div>
                          <label className="text-sm font-medium">{t('contact.name')}</label>
                          <Input placeholder={locale === 'ja' ? 'お名前' : '姓名'} />
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t('contact.email')}</label>
                          <Input type="email" placeholder="email@example.com" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t('contact.phone')}</label>
                          <Input placeholder="+81 XX XXXX XXXX" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">{t('contact.message')}</label>
                          <Textarea 
                            placeholder={locale === 'ja' ? 'メッセージを入力...' : 
                                         locale === 'zh' ? '请输入留言...' : 
                                         'Enter your message...'} 
                            rows={4}
                          />
                        </div>
                        <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                          {t('contact.submit')}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      +86 512-XXXX-XXXX
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      info@suzhouhousing.jp
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardContent className="p-4">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex justify-between">
                      <span>{t('filter.area')}:</span>
                      <span className="font-medium">{areaName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('filter.bedrooms')}:</span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('detail.size')}:</span>
                      <span className="font-medium">{property.size}㎡</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('detail.floor')}:</span>
                      <span className="font-medium">{property.floor}/{property.totalFloors}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
