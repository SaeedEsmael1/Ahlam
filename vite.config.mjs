// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// متغير لحفظ اسم ملف CSS الرئيسي بالهاش
let mainCssFileName = "";

export default defineConfig({
  plugins: [
    react(),
    // ده الجزء اللي هيحقن سطور الـ preload في الـ <head> بتاع الـ HTML
    createHtmlPlugin({
      minify: true, // عشان يصغر الـ HTML النهائي
      inject: {
        tags: [
          {
            // preload لأول صورة ذكرتها (خلفية السلايدر في الهوم)
            injectTo: "head-prepend", // مهم: بيضمن إنها تتحقن في أول الـ <head>
            tag: "link",
            attrs: {
              rel: "preload",
              as: "image",
              // هنا هنحط المسار اللي الصورة هتبقى عليه بعد ما Vite يبنيها
              // لازم يكون مطابق للمسار اللي هيطلع بيه ملف الصورة بعد الـ build
              href: "/assets/img1.webp", // تأكد أن هذا هو المسار الفعلي
            },
          },
          // VVVVVV هنا سنضيف الـ link tag الخاص بالـ CSS الرئيسي بعد أن نلتقط اسمه VVVVVV
          // سيتم إضافة هذا الـ tag لاحقًا باستخدام Rollup hook
          // لا نضيفه هنا مباشرةً لأننا لا نعرف الهاش مسبقًا
        ],
      },
    }),
  ],
  build: {
    cssCodeSplit: true, // يفضل إنها تبقى true عشان مفيش مشاكل css blocking تانية
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // هنا بنتحكم في أسماء ملفات الأصول بعد عملية الـ build

          // لو الملف هو "img1.webp" (اسم الصورة الأصلي)
          // السطرين دول هيمنعوا إضافة الهاش لـ img1.webp
          if (assetInfo.name === "img1.webp") {
            return "assets/img1.webp"; // خليه يطلع بنفس الاسم "assets/img1.webp" بدون هاش
          }

          // VVVVVV التقاط اسم ملف CSS الرئيسي بالهاش VVVVVV
          // نفترض أن ملف CSS الرئيسي سيكون في مجلد assets وينتهي بـ .css
          // وأن اسمه الأصلي (قبل الهاش) يحتوي على "index" مثلاً
          // ستحتاج للتأكد من نمط تسمية ملفات CSS التي ينتجها Vite لمشروعك
          if (
            assetInfo.type === "asset" &&
            assetInfo.name.endsWith(".css") &&
            assetInfo.name.includes("index")
          ) {
            mainCssFileName = `/${assetInfo.name}`; // تخزين المسار الكامل لملف CSS
            // تأكد من أن المسار في output هو نفسه الذي سيتم حقنه
            return `assets/${assetInfo.name}`;
          }

          // لكل الملفات التانية (JS, صور تانية)، اديها هاش عادي في مجلد assets
          return "assets/[name]-[hash][extname]";
        },
      },
      // VVVVVV هنا سنستخدم Rollup hook لحقن الـ CSS الرئيسي كـ non-blocking بعد أن نعرف اسمه VVVVVV
      plugins: [
        {
          name: "inject-non-blocking-css-after-build", // اسم فريد للبلجن
          generateBundle(options, bundle) {
            // هذا الـ hook يعمل بعد أن يتم تجميع جميع الملفات
            if (mainCssFileName) {
              // قم بحقن الـ link tag في الـ index.html
              const indexHtmlAsset = bundle["index.html"]; // الوصول إلى asset الخاص بـ index.html

              if (indexHtmlAsset && indexHtmlAsset.source) {
                // الـ link tag لملف CSS غير الحظر (مع الهاش الذي التقطناه)
                const cssLinkTag = `
                <link rel="stylesheet" href="${mainCssFileName}" media="print" onload="this.media='all'">
                <noscript><link rel="stylesheet" href="${mainCssFileName}"></noscript>
              `;

                // مكان الحقن: ابحث عن </head> وأضف قبله (ليكون في الـ head)
                indexHtmlAsset.source = indexHtmlAsset.source.replace(
                  "</head>",
                  `${cssLinkTag}\n</head>`,
                );
              }
            }
          },
        },
      ],
    },
  },
});
