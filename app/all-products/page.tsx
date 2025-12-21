import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

const page = async () => {
  const products = await getProducts();

  return (
    <div className="bg-white w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        {/* PAGE TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold mb-8">
          All Products
        </h1>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <Card
              key={product._id}
              className="relative hover:shadow-lg transition-shadow duration-300"
            >
              <Link href={`/products/${product._id}`} className="block">
                <CardContent className="p-0 relative">
                  <img
                    src={product.images?.[0] || "/image/placeholder.jpg"}
                    alt={product.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />

                  <div className="p-2">
                    <h3 className="text-lg font-semibold">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      TK {product.price}
                    </p>
                  </div>
                </CardContent>
              </Link>

              <CardFooter className="p-2" />
            </Card>
          ))}
        </div>

        {/* OPTIONAL LOAD MORE (UI only) */}
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="px-10 py-6 text-base">
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
