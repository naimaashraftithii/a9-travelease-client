import React from "react";

const services = [
  {
    id: 1,
    title: "Business Rental",
    desc: "Compare car suppliers and package your flight, hotel, and car to save.",
    img: "https://i.ibb.co.com/S4xyrLsz/us6.jpg",
  },
  {
    id: 2,
    title: "Airport Transfer",
    desc: "Penalty-free cancellation on many/select car rentals",
    img: "https://i.ibb.co.com/DDQTHKN2/us5.jpg",
  },
  {
    id: 3,
    title: "Travel Rental",
    desc: "One Key members save 10% or more on over 1 million car rentals",
    img: "https://i.ibb.co.com/Fk15WqXh/us2.jpg",
  },
  {
    id: 4,
    title: "Luxury Rental",
    desc: "Compare car suppliers and package your flight, hotel, and car to save",
    img: "https://i.ibb.co.com/vvvfKN86/us4.jpg",
  },
];

export default function OurServices() {
  return (
    <section className="py-16 bg-[#fefefb] text-center">
      {/* Heading */}
      <div className="mb-12">
        <p className="text-orange-500 font-medium">Our Services</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
          Flexible Rentals for Every Journey
        </h2>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
         Get up to 20% off with Member Prices on hotels. 
         Our app deals help you to save on trips so you can travel more and manage it all on the go
        Compare car suppliers and package your flight, hotel, and car to save.
        </p>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        {services.map((item) => (
          <div
            key={item.id}
            className="relative rounded-2xl overflow-hidden group shadow-lg"
          >
            {/* Background image */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-500" />

            {/* Text box */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm p-5 rounded-xl w-[85%] text-left flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </div>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md font-medium text-sm transition">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
