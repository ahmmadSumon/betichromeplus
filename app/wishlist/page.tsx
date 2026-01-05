export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <div className="text-6xl mb-4">💝</div>
          <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500">Start adding products to your wishlist!</p>
        </div>
      </div>
    </div>
  );
}