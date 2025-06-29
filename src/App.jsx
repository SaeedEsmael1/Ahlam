import React, { useEffect, Suspense, lazy } from "react"; // <--- أضف Suspense و lazy
import { TranslationProvider } from "./contexts/TranslationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

// استورد المكونات التي تحتاجها في الـ bundle الرئيسي بشكل طبيعي
import {
  Layout,
  Home,
  ProductsPage,
  FAQSPage,
  ContactUs,
  SupplierPage,
  PrivacyPage,
  BestSellerDetails,
} from "./pages";

// قم بعمل Lazy Load لمكون NotFound فقط
// تأكد من المسار الصحيح لملف NotFound في مجلد 'pages'
const LazyNotFound = lazy(() => import("./pages/NotFound")); // <--- هذا هو التعديل الأساسي

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const route = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "faqs",
        element: <FAQSPage />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "privacy",
        element: <PrivacyPage />,
      },
      {
        path: "supplier",
        element: <SupplierPage />,
      },
      {
        path: "products/:id",
        element: <BestSellerDetails />,
      },
      {
        path: "*",
        // استخدم Suspense لـ LazyNotFound
        element: (
          <Suspense>
            <LazyNotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      // offset: 100,
    });
  }, []);

  return (
    <TranslationProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route} />
      </QueryClientProvider>
    </TranslationProvider>
  );
};

export default App;
