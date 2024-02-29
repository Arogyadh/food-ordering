import SectionHeaders from "./SectionHeaders";
export default function Contact() {
  return (
    <section id="contact" className="text-center my-16">
      <SectionHeaders subHeader={"Don't Hesitate"} mainHeader={"Contact Us"} />
      <div className="my-8 text-gray-500">
        Indulge in the flavors of Nepal at our restaurant in Bhaktapur. Our menu
        features authentic dishes made with fresh, local ingredients, and our
        warm ambiance invites you to experience the rich culinary heritage of
        this beautiful city.
      </div>
      <div className="mt-16 items-center text-center grid grid-cols-2">
        <div>
          <SectionHeaders subHeader={"The Culinary Culture"} />
          <div className="text-sm text-gray-500">Bhaktapur, Nepal</div>
        </div>
        <div>
          <SectionHeaders subHeader={"+01-123-456"} />
          <div className="text-sm text-gray-500">bhaktapurtcc@gmail.com</div>
        </div>
      </div>
    </section>
  );
}
