import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Collection from "@/models/Collection";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ProductType {
  _id: string;
  title: string;
  price: number;
  images: string[];
}

async function getWinterProducts(): Promise<ProductType[]> {
  await connectDB();

  // 1️⃣ Find Winter collection
  const winterCollection = await Collection.findOne({ name: "Winter" }).lean();

  if (!winterCollection) {
    return [];
  }

  // 2️⃣ Find products that contain this collection ID
  const products = await Product.find(
    { collections: winterCollection._id },
    { title: 1, images: 1, price: 1 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return products;
}

const WinterPage = async () => {
  const products = await getWinterProducts();

  return (
    <div className="bg-white mt-20 w-full py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Winter Collection
          </h1>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Stay warm and stylish with our premium winter essentials ❄️
          </p>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No winter products found.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
              <Card
                key={product._id}
                className="hover:shadow-lg transition"
              >
                <Link href={`/products/${product._id}`}>
                  <CardContent className="p-0">
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
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WinterPage;
