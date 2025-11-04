import { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "ja";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations object
const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navbar
        "nav.home": "Home",
        "nav.shop": "Shop",
        "nav.collection": "Collection",
        "nav.about": "About",

        // Index Page
        "index.hero.title1": "Timeless Style",
        "index.hero.title2": "Modern Elegance",
        "index.hero.subtitle": "Curated fashion essentials for your modern wardrobe. High-quality craftsmanship meets contemporary style.",
        "index.hero.cta1": "View Collection",
        "index.hero.cta2": "Learn More",

        "index.featured.title": "Featured Products",
        "index.featured.subtitle": "Carefully selected items from our latest collection",
        "index.featured.cta": "View All Products",

        "index.categories.title": "Shop by Category",
        "index.categories.subtitle": "Explore the collection",
        "index.categories.outerwear": "Outerwear",
        "index.categories.dresses": "Dresses",
        "index.categories.tops": "Tops",
        "index.categories.accessories": "Accessories",

        "index.about.title": "Our Story",
        "index.about.text1": "Founded on the principles of timeless style and quality craftsmanship, KARU delivers curated fashion essentials that transcend trends.",
        "index.about.text2": "Each item in our collection is carefully selected to ensure premium materials and perfect design.",
        "index.about.cta": "Explore Collection",

        "footer.description": "Curating timeless fashion for the modern individual.",
        "footer.quickLinks": "Quick Links",

        // Common
        "common.loading": "Loading...",
        "common.error": "Error",

        // Footer
        "footer.shop": "Shop",
        "footer.about": "About",
        "footer.contact": "Contact",
        "footer.brand": "KARU",
        "footer.tagline": "Elevating style with timeless elegance and sophisticated designs.",
        "footer.shop.heading": "Shop",
        "footer.shop.clothing": "Clothing",
        "footer.shop.jewelry": "Jewelry",
        "footer.shop.collections": "Collections",
        "footer.shop.newArrivals": "New Arrivals",
        "footer.customerCare.heading": "Customer Care",
        "footer.customerCare.contactUs": "Contact Us",
        "footer.customerCare.faq": "FAQ",
        "footer.connect.heading": "Connect",
        "footer.connect.tagline": "Follow us for style inspiration and exclusive offers",
        "footer.copyright": "© 2025 KARU. All rights reserved.",
        "footer.privacy": "Privacy Policy",
        "footer.terms": "Terms of Service",

        // FAQ
        "faq.title": "Frequently Asked Questions",
        "faq.q1": "What is your return policy?",
        "faq.a1": "We offer a 30-day return policy for unworn items with original tags. Free returns on all orders over $100.",
        "faq.q2": "How long does shipping take?",
        "faq.a2": "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.",
        "faq.q3": "Do you ship internationally?",
        "faq.a3": "Yes, we ship to over 50 countries worldwide. International shipping takes 7-14 business days.",
        "faq.q4": "What payment methods do you accept?",
        "faq.a4": "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for your convenience.",
        "faq.q5": "How do I track my order?",
        "faq.a5": "Once your order ships, you'll receive a tracking number via email. You can track your package in real-time.",
        "faq.q6": "Are your products authentic?",
        "faq.a6": "Absolutely. We guarantee 100% authentic products sourced directly from official brands and authorized distributors.",

        // Cart
        "cart.title": "Shopping Cart",
        "cart.empty.title": "Your cart is empty",
        "cart.empty.subtitle": "Add some items to get started!",
        "cart.empty.cta": "View Products",
        "cart.size": "Size",
        "cart.quantity": "Quantity",
        "cart.summary.title": "Order Summary",
        "cart.subtotal": "Subtotal",
        "cart.shipping": "Shipping",
        "cart.shipping.free": "Free",
        "cart.total": "Total",
        "cart.checkout": "Proceed to Checkout",
        "cart.continue": "Continue Shopping",
        "cart.freeShipping": "Free shipping on orders over $100",

        // Checkout
        "checkout.empty.title": "Your cart is empty",
        "checkout.empty.cta": "Continue Shopping",
        "checkout.back": "Back to Cart",
        "checkout.title": "Payment",
        "checkout.shipping.title": "Shipping Information",
        "checkout.payment.title": "Payment Information",
        "checkout.firstName": "First Name",
        "checkout.lastName": "Last Name",
        "checkout.email": "Email Address",
        "checkout.address": "Address",
        "checkout.city": "City",
        "checkout.zipCode": "Postal Code",
        "checkout.cardName": "Cardholder Name",
        "checkout.cardNumber": "Card Number",
        "checkout.expiryDate": "Expiry Date",
        "checkout.cvv": "Security Code",
        "checkout.required": "*",
        "checkout.submit": "Complete Payment",
        "checkout.success.title": "Thank You for Your Order!",
        "checkout.success.description": "Your order has been successfully placed. We've sent you a confirmation email.",
        "checkout.success.orderNumber": "Order Number",
        "checkout.success.download": "Download Receipt",
        "checkout.success.home": "Return to Home",
        "checkout.error.title": "Missing Information",
        "checkout.error.description": "Please fill in all required fields",
        "checkout.summary.title": "Order Summary",
        "checkout.summary.size": "Size",
        "checkout.summary.subtotal": "Subtotal",
        "checkout.summary.shipping": "Shipping",
        "checkout.summary.total": "Total",

        // About Page
        "about.hero.title": "About KARU",
        "about.hero.subtitle": "We deliver refined style to your daily life through the highest quality fashion items.",
        "about.story.title": "Our Story",
        "about.story.p1": "KARU is a premium fashion brand that fuses timeless beauty with modern sophistication.",
        "about.story.p2": "Through carefully selected materials and craftsmanship, each item enhances your individuality and gives you confidence.",
        "about.story.p3": "Our mission is to enrich people's lives through fashion and color special moments.",
        "about.contact.title": "Contact Us",
        "about.contact.email": "Email",
        "about.contact.phone": "Phone",
        "about.contact.address": "Address",
        "about.contact.hours": "Business Hours",
        "about.contact.hours.weekday": "Monday - Friday: 10:00 - 19:00",
        "about.contact.hours.weekend": "Saturday - Sunday: 11:00 - 18:00",
    },
    ja: {
        // Navbar
        "nav.home": "ホーム",
        "nav.shop": "ショップ",
        "nav.collection": "コレクション",
        "nav.about": "アバウト",

        // Index Page
        "index.hero.title1": "タイムレススタイル",
        "index.hero.title2": "モダンエレガンス",
        "index.hero.subtitle": "モダンなワードローブのために厳選されたファッションエッセンシャル。高品質な職人技と現代的なスタイルが融合。",
        "index.hero.cta1": "コレクションを見る",
        "index.hero.cta2": "もっと詳しく",

        "index.featured.title": "注目の商品",
        "index.featured.subtitle": "最新コレクションから厳選されたアイテム",
        "index.featured.cta": "すべての商品を見る",

        "index.categories.title": "カテゴリー別に探す",
        "index.categories.subtitle": "コレクションを探索",
        "index.categories.outerwear": "アウター",
        "index.categories.dresses": "ドレス",
        "index.categories.tops": "トップス",
        "index.categories.accessories": "アクセサリー",

        "index.about.title": "私たちのストーリー",
        "index.about.text1": "タイムレスなスタイルと高品質な職人技の原則に基づいて設立されたKARUは、時代を超えて愛される厳選されたファッションエッセンシャルをお届けします。",
        "index.about.text2": "コレクションの各アイテムは慎重に選ばれ、最高級の素材と完璧なデザインをお約束します。",
        "index.about.cta": "コレクションを探索",

        "footer.description": "モダンな個人のためのタイムレスなファッションをキュレーション。",
        "footer.quickLinks": "クイックリンク",

        // Common
        "common.loading": "読み込み中...",
        "common.error": "エラー",

        // Footer
        "footer.shop": "ショップ",
        "footer.about": "アバウト",
        "footer.contact": "お問い合わせ",
        "footer.brand": "KARU",
        "footer.tagline": "時代を超えたエレガンスと洗練されたデザインでスタイルを格上げ。",
        "footer.shop.heading": "ショップ",
        "footer.shop.clothing": "衣類",
        "footer.shop.jewelry": "ジュエリー",
        "footer.shop.collections": "コレクション",
        "footer.shop.newArrivals": "新着アイテム",
        "footer.customerCare.heading": "カスタマーケア",
        "footer.customerCare.contactUs": "お問い合わせ",
        "footer.customerCare.faq": "よくある質問",
        "footer.connect.heading": "つながる",
        "footer.connect.tagline": "スタイルのインスピレーションと限定オファーをフォロー",
        "footer.copyright": "© 2025 KARU. All rights reserved.",
        "footer.privacy": "プライバシーポリシー",
        "footer.terms": "利用規約",

        // FAQ
        "faq.title": "よくある質問",
        "faq.q1": "返品ポリシーは何ですか？",
        "faq.a1": "未着用で元のタグが付いている商品は30日間の返品ポリシーを提供しています。¥15,000以上のご注文は返品送料無料です。",
        "faq.q2": "配送にはどのくらいかかりますか？",
        "faq.a2": "通常配送は3〜5営業日かかります。1〜2日配送の速達配送もご利用いただけます。",
        "faq.q3": "海外発送はできますか？",
        "faq.a3": "はい、世界50カ国以上に発送しています。国際配送には7〜14営業日かかります。",
        "faq.q4": "どの支払い方法を受け付けていますか？",
        "faq.a4": "主要なクレジットカード、PayPal、Apple Pay、Google Payを便利にご利用いただけます。",
        "faq.q5": "注文の追跡はどうすればいいですか？",
        "faq.a5": "ご注文が発送されると、追跡番号がメールで送信されます。リアルタイムで荷物を追跡できます。",
        "faq.q6": "商品は本物ですか？",
        "faq.a6": "もちろんです。公式ブランドおよび正規販売店から直接調達した100%本物の商品を保証します。",

        // Cart
        "cart.title": "ショッピングカート",
        "cart.empty.title": "カートが空です",
        "cart.empty.subtitle": "商品を追加して始めましょう！",
        "cart.empty.cta": "商品を見る",
        "cart.size": "サイズ",
        "cart.quantity": "数量",
        "cart.summary.title": "注文概要",
        "cart.subtotal": "小計",
        "cart.shipping": "配送料",
        "cart.shipping.free": "無料",
        "cart.total": "合計",
        "cart.checkout": "レジに進む",
        "cart.continue": "買い物を続ける",
        "cart.freeShipping": "¥15,000以上のご注文で送料無料",

        // Checkout
        "checkout.empty.title": "カートが空です",
        "checkout.empty.cta": "買い物を続ける",
        "checkout.back": "カートに戻る",
        "checkout.title": "お支払い",
        "checkout.shipping.title": "配送先情報",
        "checkout.payment.title": "お支払い情報",
        "checkout.firstName": "名",
        "checkout.lastName": "姓",
        "checkout.email": "メールアドレス",
        "checkout.address": "住所",
        "checkout.city": "市区町村",
        "checkout.zipCode": "郵便番号",
        "checkout.cardName": "カード名義人",
        "checkout.cardNumber": "カード番号",
        "checkout.expiryDate": "有効期限",
        "checkout.cvv": "セキュリティコード",
        "checkout.required": "*",
        "checkout.submit": "お支払いを完了",
        "checkout.success.title": "ご注文ありがとうございます！",
        "checkout.success.description": "ご注文が正常に完了しました。確認メールをお送りしました。",
        "checkout.success.orderNumber": "注文番号",
        "checkout.success.download": "領収書をダウンロード",
        "checkout.success.home": "ホームに戻る",
        "checkout.error.title": "情報不足",
        "checkout.error.description": "すべての必須項目を入力してください",
        "checkout.summary.title": "注文概要",
        "checkout.summary.size": "サイズ",
        "checkout.summary.subtotal": "小計",
        "checkout.summary.shipping": "配送料",
        "checkout.summary.total": "合計",

        // About Page
        "about.hero.title": "KARU について",
        "about.hero.subtitle": "私たちは、最高品質のファッションアイテムを通じて、お客様の日常に洗練されたスタイルをお届けします。",
        "about.story.title": "私たちのストーリー",
        "about.story.p1": "KARUは、時代を超えた美しさと現代的な洗練を融合させたプレミアムファッションブランドです。",
        "about.story.p2": "厳選された素材と職人技により、一つ一つのアイテムがお客様の個性を引き立て、自信を与えます。",
        "about.story.p3": "私たちは、ファッションを通じて人々の生活を豊かにし、特別な瞬間を彩ることを使命としています。",
        "about.contact.title": "お問い合わせ",
        "about.contact.email": "メール",
        "about.contact.phone": "電話",
        "about.contact.address": "住所",
        "about.contact.hours": "営業時間",
        "about.contact.hours.weekday": "月曜日 - 金曜日: 10:00 - 19:00",
        "about.contact.hours.weekend": "土曜日 - 日曜日: 11:00 - 18:00",
    },
};

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    const [language, setLanguage] = useState<Language>(() => {
        // Try to get saved language from localStorage, default to Japanese
        const saved = localStorage.getItem("language") as Language;
        return saved && (saved === "en" || saved === "ja") ? saved : "ja";
    });

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

