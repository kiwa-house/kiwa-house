'use client';

import { useState } from 'react';
import { useLocale } from '@/contexts/LocaleContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const { locale, t } = useLocale();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: locale === 'ja' ? '送信完了' : locale === 'zh' ? '提交成功' : 'Submitted',
      description: locale === 'ja' ? '近日中にご返答いたします' : 
                  locale === 'zh' ? '我们将尽快回复您' : 
                  'We will get back to you soon',
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {locale === 'ja' ? '物件についてのお問い合わせやサービスのご質問は、こちらから':
             locale === 'zh' ? '房源咨询或服务问题，请通过以下方式联系我们':
             'Contact us for property inquiries or service questions'}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {locale === 'ja' ? 'お問い合わせフォーム' : 
                   locale === 'zh' ? '咨询表单' : 
                   'Inquiry Form'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.name')} *
                    </label>
                    <Input 
                      placeholder={locale === 'ja' ? 'お名前' : 
                                   locale === 'zh' ? '请输入姓名' : 
                                   'Enter your name'}
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.email')} *
                    </label>
                    <Input 
                      type="email"
                      placeholder="email@example.com"
                      required 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.phone')}
                    </label>
                    <Input 
                      type="tel"
                      placeholder={locale === 'ja' ? '+81 XX-XXXX-XXXX' : 
                                   locale === 'zh' ? '+86 XXX-XXXX-XXXX' : 
                                   '+86 XXX-XXXX-XXXX'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {locale === 'ja' ? '件名' : locale === 'zh' ? '主题' : 'Subject'}
                    </label>
                    <Input 
                      placeholder={locale === 'ja' ? '物件について' : 
                                   locale === 'zh' ? '关于房源' : 
                                   'About properties'}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.message')} *
                    </label>
                    <Textarea 
                      rows={5}
                      placeholder={locale === 'ja' ? 'お問い合わせ内容...' : 
                                   locale === 'zh' ? '请输入咨询内容...' : 
                                   'Enter your message...'}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      locale === 'ja' ? '送信中...' : locale === 'zh' ? '提交中...' : 'Submitting...'
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        {t('contact.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {locale === 'ja' ? '電話番号' : locale === 'zh' ? '电话' : 'Phone'}
                      </h3>
                      <p className="text-gray-600">+86 512-XXXX-XXXX</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {locale === 'ja' ? '対応時間: 9:00-18:00 (月-金)' : 
                         locale === 'zh' ? '服务时间: 9:00-18:00 (周一至周五)' : 
                         'Hours: 9:00-18:00 (Mon-Fri)'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <p className="text-gray-600">info@suzhouhousing.jp</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {locale === 'ja' ? '24時間受付' : 
                         locale === 'zh' ? '24小时接收' : 
                         '24/7 available'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {locale === 'ja' ? '住所' : locale === 'zh' ? '地址' : 'Address'}
                      </h3>
                      <p className="text-gray-600">
                        {locale === 'ja' ? '苏州市工业园区月光码头XXXビル XX楼' : 
                         locale === 'zh' ? '苏州市工业园区月光码头XXX大厦 XX层' : 
                         'XX Floor, XXX Building, Moonlight Dock, SIP, Suzhou'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {locale === 'ja' ? '対応時間' : locale === 'zh' ? '服务时间' : 'Service Hours'}
                      </h3>
                      <div className="text-gray-600 space-y-1">
                        <p>{locale === 'ja' ? '月曜日 - 金曜日: 9:00 - 18:00' : 
                            locale === 'zh' ? '周一至周五: 9:00 - 18:00' : 
                            'Monday - Friday: 9:00 - 18:00'}</p>
                        <p>{locale === 'ja' ? '土曜日: 10:00 - 17:00' : 
                            locale === 'zh' ? '周六: 10:00 - 17:00' : 
                            'Saturday: 10:00 - 17:00'}</p>
                        <p>{locale === 'ja' ? '日曜日: 要予約' : 
                            locale === 'zh' ? '周日: 预约制' : 
                            'Sunday: By appointment'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WeChat QR */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-4">
                    {locale === 'ja' ? 'WeChatでもお問い合わせ' : 
                     locale === 'zh' ? '微信咨询' : 
                     'WeChat Inquiry'}
                  </h3>
                  <div className="w-32 h-32 bg-gray-200 mx-auto flex items-center justify-center rounded-lg">
                    <span className="text-gray-500 text-sm">QR Code</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
