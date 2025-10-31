import Navbar from "@/components/Navbar";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            LUXE について
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            私たちは、最高品質のファッションアイテムを通じて、
            お客様の日常に洗練されたスタイルをお届けします。
          </p>
        </div>

        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            私たちのストーリー
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              LUXEは、時代を超えた美しさと現代的な洗練を融合させた
              プレミアムファッションブランドです。
            </p>
            <p>
              厳選された素材と職人技により、一つ一つのアイテムが
              お客様の個性を引き立て、自信を与えます。
            </p>
            <p>
              私たちは、ファッションを通じて人々の生活を豊かにし、
              特別な瞬間を彩ることを使命としています。
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            お問い合わせ
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">メール</h3>
                  <a href="mailto:contact@luxe-fashion.jp" className="text-muted-foreground hover:text-primary transition-colors">
                    contact@luxe-fashion.jp
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">電話</h3>
                  <a href="tel:+81-3-1234-5678" className="text-muted-foreground hover:text-primary transition-colors">
                    03-1234-5678
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">住所</h3>
                  <p className="text-muted-foreground">
                    〒150-0001<br />
                    東京都渋谷区神宮前1-2-3<br />
                    LUXEビル 5F
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">営業時間</h3>
                  <p className="text-muted-foreground">
                    月曜日 - 金曜日: 10:00 - 19:00<br />
                    土曜日 - 日曜日: 11:00 - 18:00
                  </p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg overflow-hidden h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25931.294630535704!2d139.67197361139372!3d35.66686028853374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188cb2eb3108d1%3A0xf11cd9b2395b6677!2sShibuya%2C%20Tokyo!5e0!3m2!1sen!2sjp!4v1761879209570!5m2!1sen!2sjp" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="LUXE Location Map"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center text-muted-foreground">
            <p>&copy; 2024 LUXE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
