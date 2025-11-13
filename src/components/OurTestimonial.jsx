import React from "react";

const testimonials = [
  {
    id: 1,
    text: `“From the moment we booked online to picking up our car, everything was seamless. The vehicle was spotless and in perfect condition, making our road trip enjoyable and stress-free. The customer service team was incredibly helpful and responsive. We’ll definitely be using Xarent again!”`,
    name: "John Smith",
    role: "Customer",
    img: "https://i.ibb.co.com/C3KRFGZk/f26337907cce687a3fbfed7f13651975.jpg",
    bg: "bg-[#111]",
    textColor: "text-white",
  },
  {
    id: 2,
    text: `“I frequently travel for work and have used many car rental services, but Xarent stands out for their exceptional service and affordable rates. The booking process is straightforward, and the cars are always clean and reliable. Their 24/7 support is a lifesaver!”`,
    name: "Mike Thompson",
    role: "Customer",
    img: "https://i.ibb.co.com/FLFDYVrz/istockphoto-155415624-612x612.jpg",
    bg: "bg-white",
    textColor: "text-gray-800",
  },
  {
    id: 3,
    text: `“Renting with Xarent was the best decision for our family vacation. We needed a spacious SUV, and they had the perfect option at a great price. The pickup and drop-off were quick and easy, and the staff was friendly and efficient. Xarent made our trip smooth and enjoyable!”`,
    name: "Sarah Leanor",
    role: "Customer",
    img: "https://i.ibb.co.com/k2Q4STh2/us6.jpg",
    bg: "bg-orange-500",
    textColor: "text-white",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-[#fefefb] text-center">
      {/* Header */}
      <div className="mb-12">
        <p className="text-orange-500 font-medium">Our Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
          What Client’s Says
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          porttitor quam nisi, ac sodales lorem placerat venenatis. Proin et
          urna mi.
        </p>
      </div>

      {/* Testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className={`${item.bg} ${item.textColor} rounded-2xl shadow-lg p-8 flex flex-col justify-between`}
          >
            <p className="italic leading-relaxed text-sm sm:text-base">
              {item.text}
            </p>

            <div className="mt-6 flex flex-col items-center gap-2">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded-full border-2 border-white object-cover"
              />
              <div className="text-sm font-semibold">{item.name}</div>
              <div className="text-xs opacity-80">{item.role}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Call To Action */}
      <div className="max-w-6xl mx-auto mt-16 px-6">
        <div className="rounded-2xl overflow-hidden flex flex-col md:flex-row items-center bg-[#111] text-white">
          <div className="md:w-1/2 p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Book Your Perfect Ride <br /> with Xarent Today!
            </h3>
            <p className="text-gray-400 mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              porttitor quam nisi, ac sodales lorem placerat venenatis.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md font-medium transition">
              Book a Car
            </button>
          </div>

          <div className="md:w-1/2 bg-black flex justify-center items-center p-6">
            <img
              src="https://i.ibb.co.com/gZ7Kjz8w/0adf18149221b8b4eaa2927814889838.jpg"
              alt="Car"
              className="w-120 object-fill"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
