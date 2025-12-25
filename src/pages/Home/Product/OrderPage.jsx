import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const OrderPage = () => {
  const { productId } = useParams();
  const { user, userData } = useAuth(); // userData = role, status
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // 🔹 Fetch product
  useEffect(() => {
    axios.get(`http://localhost:3000/products/${productId}`).then(res => {
      setProduct(res.data);
      console.log(res.data);
      
      setQuantity(res.data.minimumOrder || 1);
    });
  }, [productId]);

  if (!product) {
    return <div className="text-center py-20">Loading...</div>;
  }

  const totalPrice = quantity * product.price;

  // 🔒 Buyer-only safety (extra protection)
  const isDisabled =
    !user ||
    userData?.role !== "buyer" ||
    userData?.status !== "active";

  // 🔹 Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quantity validation
    if (quantity < product.minimumOrder) {
      return toast.error(
        `Minimum order quantity is ${product.minimumOrder}`
      );
    }

    if (quantity > product.availableQuantity) {
      return toast.error("Quantity exceeds available stock");
    }

    const orderData = {
      userId: user.uid,
      userEmail: user.email,
      productId: product._id,
      productName: product.productName,
      price: product.price,
      quantity,
      totalPrice,
      address,
      phone,
      notes,
      paymentMethod: product.paymentOption || "COD",
    };

    
    try {
      // 💳 PayFirst
      if (product.paymentOption === "PayFirst") {
        navigate("/payment", { state: orderData });
      } 
      // 💵 Cash on Delivery
      else {
        await axios.post("http://localhost:3000/orders", orderData);
        toast.success("Order placed successfully");
        navigate("/dashboard/my-orders");
      }
    } catch (error) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Order Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <input
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Product Title */}
        <input
          value={product.productName}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Price */}
        <input
          value={`৳ ${product.price}`}
          readOnly
          className="input input-bordered w-full"
        />

        {/* Quantity */}
        <input
          type="number"
          value={quantity}
          min={product.minimumOrder}
          max={product.availableQuantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="input input-bordered w-full"
          required
        />

        {/* Total Price */}
        <input
          value={`Total: ৳ ${totalPrice}`}
          readOnly
          className="input input-bordered w-full font-semibold"
        />

        {/* Address */}
        <textarea
          placeholder="Delivery Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="textarea textarea-bordered w-full"
          required
        />

        {/* Phone */}
        <input
          placeholder="Contact Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input input-bordered w-full"
          required
        />

        {/* Notes */}
        <textarea
          placeholder="Additional Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="textarea textarea-bordered w-full"
        />

        {/* Submit */}
        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-semibold transition
           }`}
        >
          Place Order
        </button>

        {isDisabled && (
          <p className="text-red-500 text-sm text-center mt-2">
            Only approved buyers can place orders
          </p>
        )}
      </form>
    </div>
  );
};

export default OrderPage;
