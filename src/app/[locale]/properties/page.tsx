'use client';

import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';

export default function PropertiesPage() {
  const { locale, t } = useLocale();
  const [showFilters, setShowFilters] = useState(false);

  // 筛选状态
  const [filters, setFilters] = useState({
    area: 'all',
    type: 'all',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'all',
    direction: 'all',
  });

  // 筛选房源
  const filteredProperties = sampleProperties.filter((property) => {
    if (filters.area !== 'all' && property.area !== filters.area) return false;
    if (filters.type !== 'all' && property.type !== filters.type) return false;
    if (filters.direction !== 'all' && property.direction !== filters.direction) return false;
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) return false;
    if (filters.bedrooms !== 'all' && property.bedrooms !== parseInt(filters.bedrooms)) return false;
    return true;
  });

  const resetFilters = () => {
    setFilters({
      area: 'all',
      type: 'all',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'all',
      direction: 'all',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {locale === 'ja' ? '物件一覧' : locale === 'zh' ? '房源列表' : 'Property List'}
          </h1>
          <p className="text-gray-600">
            {locale === 'ja' ? `${filteredProperties.length}件の物件が見つかりました` : 
             locale === 'zh' ? `共 ${filteredProperties.length} 套房源` : 
             `Found ${filteredProperties.length} properties`}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">{t('hero.advanced')}</h2>
                <button
                  onClick={resetFilters}
                  className="text-sm text-emerald-600 hover:text-emerald-700"
                >
                  {t('filter.reset')}
                </button>
              </div>

              {/* Area Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filter.area')}
                </label>
                <Select
                  value={filters.area}
                  onValueChange={(value) => setFilters({ ...filters, area: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('area.suzhou')}</SelectItem>
                    <SelectItem value="gusu">{t('area.gusu')}</SelectItem>
                    <SelectItem value="wuzhong">{t('area.wuzhong')}</SelectItem>
                    <SelectItem value="xiangcheng">{t('area.xiangcheng')}</SelectItem>
                    <SelectItem value="sip">{t('area.sip')}</SelectItem>
                    <SelectItem value="wujiang">{t('area.wujiang')}</SelectItem>
                    <SelectItem value="huigu">{t('area.huigu')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {locale === 'ja' ? '物件タイプ' : locale === 'zh' ? '房屋类型' : 'Property Type'}
                </label>
                <Select
                  value={filters.type}
                  onValueChange={(value) => setFilters({ ...filters, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('type.all')}</SelectItem>
                    <SelectItem value="apartment">{t('type.apartment')}</SelectItem>
                    <SelectItem value="house">{t('type.house')}</SelectItem>
                    <SelectItem value="villa">{t('type.villa')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filter.price')} (CNY)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    className="w-full"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filter.bedrooms')}
                </label>
                <Select
                  value={filters.bedrooms}
                  onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('type.all')}</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Direction */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('filter.direction')}
                </label>
                <Select
                  value={filters.direction}
                  onValueChange={(value) => setFilters({ ...filters, direction: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{locale === 'ja' ? 'すべて' : locale === 'zh' ? '全部' : 'All'}</SelectItem>
                    <SelectItem value="south">{t('direction.south')}</SelectItem>
                    <SelectItem value="north">{t('direction.north')}</SelectItem>
                    <SelectItem value="east">{t('direction.east')}</SelectItem>
                    <SelectItem value="west">{t('direction.west')}</SelectItem>
                    <SelectItem value="southeast">{t('direction.southeast')}</SelectItem>
                    <SelectItem value="southwest">{t('direction.southwest')}</SelectItem>
                    <SelectItem value="northeast">{t('direction.northeast')}</SelectItem>
                    <SelectItem value="northwest">{t('direction.northwest')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                {t('filter.search')}
              </Button>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full mb-4"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? 'フィルターを閉じる' : 'フィルターを表示'}
            </Button>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <div className="grid gap-4">
                  <Select
                    value={filters.area}
                    onValueChange={(value) => setFilters({ ...filters, area: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('filter.area')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('area.suzhou')}</SelectItem>
                      <SelectItem value="gusu">{t('area.gusu')}</SelectItem>
                      <SelectItem value="wuzhong">{t('area.wuzhong')}</SelectItem>
                      <SelectItem value="sip">{t('area.sip')}</SelectItem>
                      <SelectItem value="xiangcheng">{t('area.xiangcheng')}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={filters.type}
                    onValueChange={(value) => setFilters({ ...filters, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('type.all')}</SelectItem>
                      <SelectItem value="apartment">{t('type.apartment')}</SelectItem>
                      <SelectItem value="house">{t('type.house')}</SelectItem>
                      <SelectItem value="villa">{t('type.villa')}</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={resetFilters} variant="ghost" className="text-emerald-600">
                    {t('filter.reset')}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Property Grid */}
          <div className="flex-1">
            {filteredProperties.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  {t('common.noResults')}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
