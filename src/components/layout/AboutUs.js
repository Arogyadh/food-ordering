import SectionHeaders from "./SectionHeaders";

export default function AboutUs() {
  return (
    <section id="about" className="text-center my-16">
      <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
      <div className="max-w-xl mx-auto mt-4 text-gray-500 flex flex-col gap-4">
        <p>
          Welcome to
          <span className="font-bold">
            TC<sup>2</sup>
          </span>
          . We&apos;re here to make ordering food a breeze. Choose from a wide
          range of local and global cuisines, and let us handle the rest.
        </p>
        <p className="max-w-2xl mx-auto mt-4 text-gray-500">
          Whether it&apos;s a quick bite or a special treat, we&apos;ve got you
          covered. Ordering is easy, fast, and reliable. So, sit back, relax,
          and enjoy your meal!
        </p>
      </div>
    </section>
  );
}
