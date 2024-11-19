const BrandLogosCloud = () => {
  return (
    <>
      <h2 className="text-lg font-semibold text-center text-gray-900">Trusted by the world’s most innovative teams</h2>
      <div className="grid items-center max-w-lg grid-cols-4 mx-auto mt-10 gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <img
          alt="Transistor"
          src="https://tailwindui.com/plus/img/logos/158x48/transistor-logo-gray-900.svg"
          width={158}
          height={48}
          className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
        />
        <img
          alt="Reform"
          src="https://tailwindui.com/plus/img/logos/158x48/reform-logo-gray-900.svg"
          width={158}
          height={48}
          className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
        />
        <img
          alt="Tuple"
          src="https://tailwindui.com/plus/img/logos/158x48/tuple-logo-gray-900.svg"
          width={158}
          height={48}
          className="object-contain w-full col-span-2 max-h-12 lg:col-span-1"
        />
        <img
          alt="SavvyCal"
          src="https://tailwindui.com/plus/img/logos/158x48/savvycal-logo-gray-900.svg"
          width={158}
          height={48}
          className="object-contain w-full col-span-2 max-h-12 sm:col-start-2 lg:col-span-1"
        />
        <img
          alt="Statamic"
          src="https://tailwindui.com/plus/img/logos/158x48/statamic-logo-gray-900.svg"
          width={158}
          height={48}
          className="object-contain w-full col-span-2 col-start-2 max-h-12 sm:col-start-auto lg:col-span-1"
        />
      </div>
    </>
  );
};

export default BrandLogosCloud;
