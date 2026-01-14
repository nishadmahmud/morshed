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
    <section className="bg-gray-900 text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div key={index} className="text-center">
                <IconComponent className="w-8 h-8 mx-auto mb-4 text-teal-400" />
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm">
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
