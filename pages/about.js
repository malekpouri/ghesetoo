import SocialIcon from '/components/social-icons'
import {PageSEO} from '/components/SEO'
import avatar from 'public/static/images/avatar.png'
import Image from "next/image";
import siteMetadata from "@/data/siteMetadata";

export default function about() {
    const name = siteMetadata.author
    const occupation = siteMetadata.occupation
    const email = siteMetadata.email
    const twitter = siteMetadata.twitter
    const linkedin = siteMetadata.linkedin
    const github = siteMetadata.github
    return (
        <>
            <PageSEO title={`درباره - ${name}`} description={`در باره من - ${name}`}/>
            <div className="divide-y">
                <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        درباره
                    </h1>
                </div>
                <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
                    <div className="flex flex-col items-center pt-8">
                        <Image
                            src={avatar}
                            alt="avatar"
                            width="192px"
                            height="192px"
                            className="h-48 w-48 rounded-full"
                        />
                        <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
                        <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
                        <div className="flex space-x-3 pt-6">
                            <SocialIcon kind="mail" href={`mailto:${email}`}/>
                            <SocialIcon kind="github" href={github}/>
                            <SocialIcon kind="linkedin" href={linkedin}/>
                            <SocialIcon kind="twitter" href={twitter}/>
                        </div>
                    </div>
                    <div className="prose max-w-none pt-8 pb-8 dark:prose-dark xl:col-span-2">

                        <p>
                            <strong>سلام ، <u>درباره سایت</u> رو بصورت مجموعه ای چندین سوال و جواب در خصوص خودم ، تکنیک
                                های فنی
                                سایت و ابزارهایی که برای تولید این سایت استفاده شده قرار دادم که امیدوارم مفید
                                باشه.</strong>
                        </p>
                        <hr/>
                        <h4>چه کسی این سایت رو اداره میکنه؟</h4>
                        <p>من محمد هستم( <a href={'https://utux.ir/'}>utux.ir</a> ) یک توسعه دهنده نرم افزار در ایران و به صورت آزاد این سایت رو اداره میکنم
                        </p>
                        <h4>چرا این سایت رو راه اندازی کردی؟</h4>
                        <p>هدف من از راه اندازی این سایت این بوده که ، فعالین حوزه های مختلف با بابیان
                            قصه زندگی کاری خودشون مثل روند استخدام ،محیط کاری ، ابزارهای مورد استفاده و اینکه دوست دارن محیط کاریشون چه شکلی باشه به
                            دیگران ، بتوانند به تصمیم گیری و یا ادامه مسیر زندگی شغلی بقیه کمک کنند</p>
                        <h4>از چه ابزارهایی برای تولید این سایت استفاده کردی؟ و آیا میتونم سورس اون رو داشته
                            باشم؟</h4>
                        <p>من برای فرانت اند از نکست جی اس و برای بک اند از جاوا و اسپرینگ استفاده کردم و چرا که
                            نه من سورس کامل این سایت رو توی گیت هاب گذاشتم و شما میتونید با استفاده از اون یک سایت
                            شبیه این برای خودوت راه اندازی کنید کما اینکه الگوی من برای راه اندازی این سایت ،
                            <a href={'https://usesthis.com/'}>usesthis.com</a> بوده.
                        و قالب این سایت از <a href={'https://github.com/timlrx/tailwind-nextjs-starter-blog'}>قالب های نکست جی اس و tailwind</a> گرفته شده.</p>
                        <h4>چطور می تونم لینک داستانم رو به اشتراک بگذارم ؟</h4>
                        <p>بعد از اینکه داستان خودتون رو نوشتید و به صفحه داستانتون رفتید ، می تونید با ارسال url یا لینک به بقیه اون صفحه رو به اشتراک بگذارید</p>
                        <h4>از چه راه هایی میتونم باهات در ارتباط باشم؟</h4>
                        <p>با ایمیل <a target="_blank" rel="noopener noreferrer"
                                       href="mailto:admin@utux.ir">admin@utux.ir</a></p>
                        <h4>چطور میتونم داستانم رو حذف کنم ؟</h4>
                        <p>با ورود به صفحه داشبورد می تونی داستانت رو حذف کنی</p>

                    </div>
                </div>
            </div>
        </>
    )
}
