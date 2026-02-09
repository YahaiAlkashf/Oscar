import React from 'react';
import { Link } from '@inertiajs/react';
import {
    BuildingOfficeIcon,
    ArrowsPointingOutIcon,
    SparklesIcon,
    PhoneIcon,
    ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';

const ProjectCard = ({ item }) => {
    const { t, i18n } = useTranslation();
    const language = i18n.language || 'ar';

    const formatCurrency = (num) => {
        if (!num) return '0';
        return Number(num).toLocaleString();
    };

    const getLocalizedField = (arField, enField) => {
        return language === 'en' && enField ? enField : arField;
    };

    // دالة لتنظيف وتجهيز الرقم للواتساب والاتصال
    const preparePhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';

        // تنظيف الرقم من أي أحرف غير رقمية
        let cleaned = phoneNumber.toString().replace(/\D/g, '');

        // إذا بدأ بـ 0، استبدله بـ 20+ (مصر)
        if (cleaned.startsWith('0')) {
            cleaned = '20' + cleaned.substring(1);
        }
        // إذا لم يكن فيه رمز دولة، أضف 20+ (مصر)
        else if (!cleaned.startsWith('+') && !cleaned.startsWith('20')) {
            cleaned = '20' + cleaned;
        }

        return cleaned;
    };

    // الحصول على رقم الهاتف من item (يجب أن يكون في بياناتك)
    const phoneNumber = item.phone_number || item.whatsapp_number || '';
    const whatsappNumber = item.whatsapp_number || item.phone_number || '';

    const preparedPhone = preparePhoneNumber(phoneNumber);
    const preparedWhatsApp = preparePhoneNumber(whatsappNumber);

    return (
        <div className="group bg-white dark:bg-[#111111] rounded-[2rem] overflow-hidden border border-gray-100 dark:border-[#1A1A1A] hover:shadow-2xl transition-all duration-500">
            <div className="relative h-64 overflow-hidden">
                <Link href={`/all-projects/${item.id}`}>
                    <img
                        src={item.image ? `/storage/${item.image}` : '/default-project.jpg'}
                        alt={getLocalizedField(item.name, item.name_en)}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </Link>
                <div className="absolute top-4 right-4 flex gap-2">
                    {item.top === 1 && (
                        <span className="bg-[#A86B06] text-white px-3 py-1 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-1">
                            <SparklesIcon className="w-3 h-3" /> {t("مشروع مميز")}
                        </span>
                    )}
                    <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[10px] font-bold">
                        {t("بواسطة:")} {getLocalizedField(item.developer, item.developer_en)}
                    </span>
                </div>
            </div>

            <div className="p-6 text-right" dir="rtl">
                <Link href={`/all-projects/${item.id}`} className="block mb-2">
                    <h3 className="text-xl font-black text-gray-800 dark:text-white group-hover:text-[#A86B06] transition-colors line-clamp-1">
                        {getLocalizedField(item.name, item.name_en)}
                    </h3>
                </Link>

                <div className="mb-4">
                    <p className="text-gray-400 text-[10px] font-bold uppercase mb-1">
                        {t("يبدأ السعر من")}
                    </p>
                    <p className="text-[#A86B06] font-black text-xl">
                        {formatCurrency(item.lowest_price)} <span className="text-xs font-normal">{t("ج.م")}</span>
                        {item.highest_price && (
                            <span className="text-gray-400 text-sm font-medium mr-1">
                                : {formatCurrency(item.highest_price)}
                            </span>
                        )}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 py-4 border-t border-gray-50 dark:border-[#1A1A1A]">
                    <IconDetail
                        icon={<ArrowsPointingOutIcon className="w-4 h-4" />}
                        label={t("المساحات")}
                        value={`${formatCurrency(item.smallest_area)} - ${formatCurrency(item.largest_area)} ${t("م²")}`}
                    />
                    <IconDetail
                        icon={<BuildingOfficeIcon className="w-4 h-4" />}
                        label={t("المطور")}
                        value={getLocalizedField(item.developer, item.developer_en)}
                    />
                </div>

                <div className="flex gap-3 mt-4" dir='ltr'>
                    {preparedWhatsApp && (
                        <a
                            href={`https://wa.me/${preparedWhatsApp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500 text-green-600 hover:text-white py-3 rounded-xl font-bold transition-all duration-300"
                        >
                            <ChatBubbleLeftRightIcon className="w-5 h-5" />
                            <span>{t("واتساب")}</span>
                        </a>
                    )}

                    {preparedPhone && (
                        <a
                            href={`tel:+${preparedPhone}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#A86B06]/10 hover:bg-[#A86B06] text-[#A86B06] hover:text-white py-3 rounded-xl font-bold transition-all duration-300"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            <span>{t("اتصال")}</span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const IconDetail = ({ icon, label, value }) => {
    return (
        <div className="flex flex-col items-center gap-1 text-right">
            <div className="flex items-center gap-1 text-[#A86B06]">
                {icon}
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                    {label}
                </span>
            </div>
            <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300 line-clamp-1">
                {value}
            </span>
        </div>
    );
};

export default ProjectCard;
