import { FaUndoAlt, FaTruck, FaHeadset, FaTag } from "react-icons/fa";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: FaUndoAlt,
      title: "03-Day Returns",
      description: "Risk-free shopping with easy returns"
    },
    {
      icon: FaTruck,
      title: "Free Shipping",
      description: "No extra costs, just the price you see"
    },
    {
      icon: FaHeadset,
      title: "24/7 Support",
      description: "Always here to help you"
    },
    {
      icon: FaTag,
      title: "Member Discounts",
      description: "Special prices for loyal customers"
    }
  ];

  return (
    <section className="bg-white border-t border-gray-100 py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#0f766e]/10 flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-[#0f766e]" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-gray-500 text-sm">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
