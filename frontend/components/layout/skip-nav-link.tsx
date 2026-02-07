const SkipNavLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-md focus:shadow-md focus:ring-2 focus:ring-primary-500"
    >
      Skip to main content
    </a>
  );
};

export default SkipNavLink;