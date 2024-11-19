import { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
  const [formData, setFormData] = useState({
    cardHolderName: "",
    cardNumber: "",
    cvv: "",
    expirationDate: "",
    paymentMethod: "card",
    postalCode: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitCheckoutData = async () => {
    try {
      const res = await fetch("http://localhost:8080/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Payment successfully done!", { autoClose: 2000 });
        setTimeout(() => navigate("/"), 2000); // Navigate after 2 seconds
      } else {
        toast.error("Payment failed! Please try again.");
      }
    } catch (error) {
      console.error("Error storing data:", error);
      toast.error("Something went wrong! Please try again later.");
    }
  };

  return (
    <>
      <div className="font-[sans-serif] lg:flex lg:items-center lg:justify-center lg:h-screen max-lg:py-4">
        <div className="bg-purple-100 p-8 w-full max-w-5xl max-lg:max-w-xl mx-auto rounded-md">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            Checkout
          </h2>
          <div className="grid lg:grid-cols-3 gap-6 max-lg:gap-8 mt-16">
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold text-gray-800">
                Choose your payment method
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 mt-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 cursor-pointer"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    defaultChecked
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="card"
                    className="ml-4 flex gap-2 cursor-pointer"
                  >
                    <img
                      src="https://readymadeui.com/images/visa.webp"
                      className="w-12"
                      alt="card1"
                    />
                    <img
                      src="https://readymadeui.com/images/american-express.webp"
                      className="w-12"
                      alt="card2"
                    />
                    <img
                      src="https://readymadeui.com/images/master.webp"
                      className="w-12"
                      alt="card3"
                    />
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 cursor-pointer"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    onChange={handleInputChange}
                  />
                  <label
                    htmlFor="paypal"
                    className="ml-4 flex gap-2 cursor-pointer"
                  >
                    <img
                      src="https://readymadeui.com/images/paypal.webp"
                      className="w-20"
                      alt="paypalCard"
                    />
                  </label>
                </div>
              </div>
              <form className="mt-8">
                <div className="grid sm:col-span-2 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="cardHolderName"
                      placeholder="Name of card holder"
                      maxLength={50}
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="postalCode"
                      maxLength={6}
                      placeholder="Postal code"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="cardNumber"
                      placeholder="Card number"
                      className="col-span-full px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="expirationDate"
                      placeholder="EXP."
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="cvv"
                      placeholder="CVV"
                      className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border rounded-md focus:border-[#007bff] outline-none"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <button
                    type="button"
                    className="px-7 py-3.5 text-sm tracking-wide bg-white hover:bg-gray-50 text-gray-800 rounded-md"
                  >
                    Pay later
                  </button>
                  <button
                    type="button"
                    className="px-7 py-3.5 text-sm tracking-wide bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={submitCheckoutData}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="bg-white p-6 rounded-md max-lg:-order-1">
              <h3 className="text-lg font-bold text-gray-800">Summary</h3>
              <ul className="text-gray-800 mt-6 space-y-3">
                <li className="flex flex-wrap gap-4 text-sm">
                  Sub total <span className="ml-auto font-bold">$48.00</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Discount (20%) <span className="ml-auto font-bold">$4.00</span>
                </li>
                <li className="flex flex-wrap gap-4 text-sm">
                  Tax <span className="ml-auto font-bold">$4.00</span>
                </li>
                <hr />
                <li className="flex flex-wrap gap-4 text-base font-bold">
                  Total <span className="ml-auto">$52.00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Checkout;
