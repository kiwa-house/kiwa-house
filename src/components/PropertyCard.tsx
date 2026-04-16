'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from '@/contexts/LocaleContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bed, Bath, Maximize, MapPin } from 'lucide-react';

export interface Property {
  id: string;
  title: Record<string, string>;
  description: Record<string, string>;
  price: number;
  currency: 'CNY' | 'JPY';
  size: number;
  bedrooms: number;
  bathrooms: number;
  floor: number;
  totalFloors: number;
  direction: string;
  area: string;
  type: 'apartment' | 'house' | 'villa';
  facilities: string[];
  images: string[];
  featured?: boolean;
}

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { locale, t } = useLocale();
  
  // 格式化价格显示
  const formatPrice = () => {
    return `¥${property.price.toLocaleString()}`;
  };

  // 获取当前语言的标题
  const title = property.title[locale] || property.title['ja'];
  const areaName = t(`area.${property.area}`);

  // 房源类型徽章颜色
  const typeColors: Record<string, string> = {
    apartment: 'bg-blue-100 text-blue-800',
    house: 'bg-green-100 text-green-800',
    villa: 'bg-purple-100 text-purple-800',
  };

  return (
    <Link href={`/${locale}/properties/${property.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={property.images[0] || '/placeholder.jpg'}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
          {property.featured && (
            <Badge className="absolute top-2 left-2 bg-amber-500 hover:bg-amber-600">
              Featured
            </Badge>
          )}
          <Badge className={`absolute top-2 right-2 ${typeColors[property.type]}`}>
            {t(`type.${property.type}`)}
          </Badge>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          {/* Price */}
          <div className="text-xl font-bold text-emerald-600 mb-2">
            {formatPrice()}<span className="text-sm text-gray-500 font-normal">/{t('common.yen')}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            {areaName}
          </div>

          {/* Features */}
          <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t">
            <div className="flex items-center">
              <Maximize className="h-4 w-4 mr-1" />
              {property.size}{t('common.sqm')}
            </div>
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              {property.bedrooms}
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              {property.bathrooms}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
