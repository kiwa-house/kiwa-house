'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type Locale = 'ja' | 'zh' | 'en';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

// 翻译数据
const translations: Record<Locale, Record<string, string>> = {
  ja: {
    // Navigation
    'nav.home': 'ホーム',
    'nav.properties': '物件情報',
    'nav.services': 'サービス',
    'nav.about': '会社概要',
    'nav.contact': 'お問い合わせ',
    'nav.language': '言語',

    // Hero
    'hero.title': '蘇州で理想のお部屋を見つけよう',
    'hero.subtitle': '蘇州で働く日本の方へプロフェッショナルな租房サービス',
    'hero.search': '検索',
    'hero.advanced': '詳細検索',

    // Property Types
    'type.apartment': 'アパートメント',
    'type.house': '戸建住宅',
    'type.villa': 'Villa',
    'type.all': 'すべて',

    // Filters
    'filter.price': '家賃',
    'filter.area': 'エリア',
    'filter.bedrooms': '寝室数',
    'filter.direction': '向き',
    'filter.facilities': '設備',
    'filter.search': '検索する',
    'filter.reset': 'リセット',

    // Property Details
    'detail.price': '家賃',
    'detail.size': '面積',
    'detail.floor': '階',
    'detail.direction': '向き',
    'detail.bedrooms': '寝室',
    'detail.bathrooms': 'バスルーム',
    'detail.facilities': '設備・施設',
    'detail.images': '写真',
    'detail.inquiry': '問い合わせ',
    'detail.more': 'もっと見る',

    // Services
    'service.moving': '引越サービス',
    'service.moving.desc': '日本品質の丁寧な引越サービス',
    'service.life': '生活サポート',
    'service.life.desc': '蘇州での生活を全面サポート',
    'service.translation': '翻訳・、不通',
    'service.translation.desc': '中日翻訳・同時、通訳サービス',
    'service.viewing': '内覧同行',
    'service.viewing.desc': '専門的な内覧サポート',

    // Contact
    'contact.title': 'お問い合わせ',
    'contact.name': 'お名前',
    'contact.email': 'メールアドレス',
    'contact.phone': '電話番号',
    'contact.message': 'メッセージ',
    'contact.submit': '送信する',
    'contact.success': '送信されました',
    'contact.error': 'エラーが発生しました',

    // Footer
    'footer.company': '会社概要',
    'footer.privacy': 'プライバシー Policy',
    'footer.terms': '利用規約',
    'footer.copyright': '© 2024 蘇州housing. All rights reserved.',

    // Areas
    'area.suzhou': '蘇州市全域',
    'area.gusu': '姑蘇区',
    'area.wuzhong': '呉中区',
    'area.xiangcheng': '相城区',
    'area.sip': '工業園区',
    'area.wujiang': '呉江区',
    'area.huigu': '虎丘区',

    // Directions
    'direction.south': '南向き',
    'direction.north': '北向き',
    'direction.east': '東向き',
    'direction.west': '西区',
    'direction.southeast': '南東向き',
    'direction.southwest': '南西向き',
    'direction.northeast': '北東向き',
    'direction.northwest': '北西向き',

    // Common
    'common.loading': '読み込み中...',
    'common.noResults': '該当する物件がありません',
    'common.yen': '元/月',
    'common.sqm': '㎡',
    'common.viewDetails': '詳細を見る',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.properties': '房源',
    'nav.services': '服务',
    'nav.about': '关于我们',
    'nav.contact': '联系我们',
    'nav.language': '语言',

    // Hero
    'hero.title': '在苏州找到您的理想之家',
    'hero.subtitle': '为在苏州工作的日本人提供专业租房服务',
    'hero.search': '搜索',
    'hero.advanced': '高级搜索',

    // Property Types
    'type.apartment': '公寓',
    'type.house': '住宅',
    'type.villa': '别墅',
    'type.all': '全部',

    // Filters
    'filter.price': '价格',
    'filter.area': '区域',
    'filter.bedrooms': '卧室数',
    'filter.direction': '朝向',
    'filter.facilities': '设施',
    'filter.search': '搜索',
    'filter.reset': '重置',

    // Property Details
    'detail.price': '租金',
    'detail.size': '面积',
    'detail.floor': '楼层',
    'detail.direction': '朝向',
    'detail.bedrooms': '卧室',
    'detail.bathrooms': '卫生间',
    'detail.facilities': '设施配置',
    'detail.images': '图片',
    'detail.inquiry': '咨询',
    'detail.more': '查看更多',

    // Services
    'service.moving': '搬家服务',
    'service.moving.desc': '日式精品搬家服务',
    'service.life': '生活支持',
    'service.life.desc': '全方位苏州生活支持',
    'service.translation': '翻译口译',
    'service.translation.desc': '中日翻译同传服务',
    'service.viewing': '看房陪同',
    'service.viewing.desc': '专业看房全程陪同',

    // Contact
    'contact.title': '联系我们',
    'contact.name': '姓名',
    'contact.email': '邮箱',
    'contact.phone': '电话',
    'contact.message': '留言',
    'contact.submit': '提交',
    'contact.success': '提交成功',
    'contact.error': '提交失败',

    // Footer
    'footer.company': '公司简介',
    'footer.privacy': '隐私政策',
    'footer.terms': '使用条款',
    'footer.copyright': '© 2024 苏州租房. 保留所有权利.',

    // Areas
    'area.suzhou': '苏州全城',
    'area.gusu': '姑苏区',
    'area.wuzhong': '吴中区',
    'area.xiangcheng': '相城区',
    'area.sip': '工业园区',
    'area.wujiang': '吴江区',
    'area.huigu': '虎丘区',

    // Directions
    'direction.south': '南',
    'direction.north': '北',
    'direction.east': '东',
    'direction.west': '西',
    'direction.southeast': '东南',
    'direction.southwest': '西南',
    'direction.northeast': '东北',
    'direction.northwest': '西北',

    // Common
    'common.loading': '加载中...',
    'common.noResults': '暂无符合条件房源',
    'common.yen': '元/月',
    'common.sqm': '平米',
    'common.viewDetails': '查看详情',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.properties': 'Properties',
    'nav.services': 'Services',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.language': 'Language',

    // Hero
    'hero.title': 'Find Your Ideal Home in Suzhou',
    'hero.subtitle': 'Professional housing services for Japanese in Suzhou',
    'hero.search': 'Search',
    'hero.advanced': 'Advanced Search',

    // Property Types
    'type.apartment': 'Apartment',
    'type.house': 'House',
    'type.villa': 'Villa',
    'type.all': 'All',

    // Filters
    'filter.price': 'Price',
    'filter.area': 'Area',
    'filter.bedrooms': 'Bedrooms',
    'filter.direction': 'Direction',
    'filter.facilities': 'Facilities',
    'filter.search': 'Search',
    'filter.reset': 'Reset',

    // Property Details
    'detail.price': 'Rent',
    'detail.size': 'Size',
    'detail.floor': 'Floor',
    'detail.direction': 'Direction',
    'detail.bedrooms': 'Bedrooms',
    'detail.bathrooms': 'Bathrooms',
    'detail.facilities': 'Facilities',
    'detail.images': 'Images',
    'detail.inquiry': 'Inquiry',
    'detail.more': 'View More',

    // Services
    'service.moving': 'Moving Service',
    'service.moving.desc': 'Japanese-quality moving service',
    'service.life': 'Life Support',
    'service.life.desc': 'Full support for life in Suzhou',
    'service.translation': 'Translation',
    'service.translation.desc': 'Japanese-Chinese translation & interpreting',
    'service.viewing': 'Viewing Support',
    'service.viewing.desc': 'Professional viewing accompaniment',

    // Contact
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.message': 'Message',
    'contact.submit': 'Submit',
    'contact.success': 'Submitted successfully',
    'contact.error': 'Submission failed',

    // Footer
    'footer.company': 'About Us',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2024 Suzhou Housing. All rights reserved.',

    // Areas
    'area.suzhou': 'All Suzhou',
    'area.gusu': 'Gusu District',
    'area.wuzhong': 'Wuzhong District',
    'area.xiangcheng': 'Xiangcheng District',
    'area.sip': 'SIP',
    'area.wujiang': 'Wujiang District',
    'area.huigu': 'Huigu District',

    // Directions
    'direction.south': 'South',
    'direction.north': 'North',
    'direction.east': 'East',
    'direction.west': 'West',
    'direction.southeast': 'Southeast',
    'direction.southwest': 'Southwest',
    'direction.northeast': 'Northeast',
    'direction.northwest': 'Northwest',

    // Common
    'common.loading': 'Loading...',
    'common.noResults': 'No matching properties found',
    'common.yen': '/month',
    'common.sqm': '㎡',
    'common.viewDetails': 'View Details',
  },
};

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ja');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 从URL或localStorage获取语言设置
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale);
    }
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    
    // 更新URL路径
    const segments = pathname.split('/');
    if (['ja', 'zh', 'en'].includes(segments[1])) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/') || '/');
  };

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}

export type { Locale };
