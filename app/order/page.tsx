export default function OrderPage() {
  return (
    <div className="bg-white w-full mt-10 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        {/* PAGE TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Order & Shipping Information
        </h1>

        {/* ORDERING PROCESS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🛒 Ordering Process</h2>
          <ul className="list-decimal list-inside text-gray-700 space-y-2">
            <li>Select your desired product and size.</li>
            <li>Add the product to your cart.</li>
            <li>Proceed to checkout and fill in your details.</li>
            <li>Confirm your order.</li>
            <li>Our team will contact you for order confirmation.</li>
          </ul>
        </section>

        {/* SHIPPING INFO */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🚚 Shipping Information</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Delivery available all over Bangladesh.</li>
            <li>Standard delivery time: 2–5 working days.</li>
            <li>Shipping cost may vary based on location.</li>
            <li>Cash on Delivery (COD) available.</li>
          </ul>
        </section>

        {/* RETURNS & REFUNDS */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">🔁 Returns & Refunds</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Returns accepted within 3 days of delivery.</li>
            <li>Product must be unused and in original condition.</li>
            <li>Refunds will be processed after inspection.</li>
            <li>Shipping cost is non-refundable.</li>
          </ul>
        </section>

        {/* NOTE */}
        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-600">
          If you have any questions regarding orders or delivery, please contact
          our support team.
        </div>
      </div>
    </div>
  );
}
